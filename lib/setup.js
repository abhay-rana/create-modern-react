const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');
const { runCommand } = require('./install');

/**
 * Main setup function - orchestrates the entire project generation
 */
async function setupProject(config) {
  const { projectPath, projectName } = config;

  console.log(chalk.blue('\n🏗️  Setting up project structure...\n'));

  // Step 1: Create project directory
  await fs.ensureDir(projectPath);

  // Step 2: Copy base template
  console.log(chalk.gray('  Copying base template...'));
  const templatePath = path.join(__dirname, '../templates/base');
  await fs.copy(templatePath, projectPath);

  // Step 2.5: Extract Claude Code AI skills from archive
  console.log(chalk.gray('  Including Claude Code AI skills (.claude/skills)...'));
  await extractSkillsArchive(projectPath);

  // Step 3: Handle Antd vs Shadcn/ui
  if (config.useAntd) {
    console.log(chalk.gray('  Configuring Ant Design (removing Shadcn/ui)...'));
    await removeDirectory(path.join(projectPath, 'src/components/ui'));
    await fs.remove(path.join(projectPath, 'components.json'));
    await copyOptionalTemplate('antd', projectPath);
    await updateProvidersForAntd(projectPath);
  }

  // Step 4: Copy optional feature templates
  if (config.useRedux) {
    console.log(chalk.gray('  Adding Redux Toolkit + Redux Persist...'));
    await copyOptionalTemplate('redux', projectPath);
    await updateProvidersForRedux(projectPath, config.useAntd);
  }

  if (config.useForms) {
    console.log(chalk.gray('  Adding React Hook Form + Zod...'));
    await copyOptionalTemplate('forms', projectPath);
  }

  if (config.useHusky) {
    console.log(chalk.gray('  Adding Husky + lint-staged...'));
    await copyOptionalTemplate('husky', projectPath);
  }

  // Step 5: Update package.json
  console.log(chalk.gray('  Configuring package.json...'));
  await updatePackageJson(config);

  // Step 6: Initialize git if requested
  if (config.initGit) {
    await initializeGit(config);
  }

  // Step 7: Setup Husky if selected
  if (config.useHusky && config.initGit) {
    await setupHusky(projectPath);
  }

  console.log(chalk.green('\n✅ Project structure created successfully!\n'));
}

/**
 * Update package.json with project name and selected dependencies
 */
async function updatePackageJson(config) {
  const packageJsonPath = path.join(config.projectPath, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);

  // Update name
  packageJson.name = config.projectName;

  // Add optional dependencies
  const dependencies = { ...packageJson.dependencies };
  const devDependencies = { ...packageJson.devDependencies };

  // Redux dependencies
  if (config.useRedux) {
    dependencies['@reduxjs/toolkit'] = '^2.2.0';
    dependencies['react-redux'] = '^9.1.0';
    dependencies['redux-persist'] = '^6.0.0';
  }

  // React Hook Form + Zod dependencies
  if (config.useForms) {
    dependencies['react-hook-form'] = '^7.54.0';
    dependencies['zod'] = '^3.24.0';
    dependencies['@hookform/resolvers'] = '^3.9.0';
  }

  // Ant Design dependencies (replaces Shadcn)
  if (config.useAntd) {
    dependencies['antd'] = '^5.20.0';
    dependencies['@ant-design/icons'] = '^5.4.0';
    // Remove Radix dependency when using Antd
    delete dependencies['@radix-ui/react-slot'];
  }

  // Husky dependencies
  if (config.useHusky) {
    devDependencies['husky'] = '^9.1.0';
    devDependencies['lint-staged'] = '^15.2.0';

    // Add prepare script for husky
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.prepare = 'husky';
  }

  packageJson.dependencies = sortObjectKeys(dependencies);
  packageJson.devDependencies = sortObjectKeys(devDependencies);

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}

/**
 * Copy an optional template to the project
 */
async function copyOptionalTemplate(templateName, projectPath) {
  const optionalTemplatePath = path.join(
    __dirname,
    '../templates/optional',
    templateName
  );

  if (await fs.pathExists(optionalTemplatePath)) {
    // For redux, antd, and forms, copy to src directory
    if (templateName === 'redux') {
      await fs.copy(optionalTemplatePath, path.join(projectPath, 'src/redux'));
    } else if (templateName === 'forms') {
      await fs.copy(optionalTemplatePath, path.join(projectPath, 'src/forms'));
    } else if (templateName === 'antd') {
      await fs.copy(optionalTemplatePath, path.join(projectPath, 'src/antd'));
      // Also copy the styles file to src/styles
      const stylesFile = path.join(optionalTemplatePath, 'styles/antd-overrides.css');
      if (await fs.pathExists(stylesFile)) {
        await fs.ensureDir(path.join(projectPath, 'src/styles'));
        await fs.copy(
          stylesFile,
          path.join(projectPath, 'src/styles/antd-overrides.css')
        );
      }
    } else if (templateName === 'husky') {
      // Copy husky files to root
      await fs.copy(
        path.join(optionalTemplatePath, '.husky'),
        path.join(projectPath, '.husky')
      );
      await fs.copy(
        path.join(optionalTemplatePath, '.lintstagedrc.json'),
        path.join(projectPath, '.lintstagedrc.json')
      );
    }
  }
}

/**
 * Update providers/index.tsx to include Antd ConfigProvider
 */
async function updateProvidersForAntd(projectPath) {
  const providersContent = `import { type ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { RootLayout } from '~/components/layout';
import { ErrorBoundary } from '~/components/layout';
import { AntdConfigProvider } from '~/antd';
import '~/styles/antd-overrides.css';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Application providers composition
 * Wraps the app with all necessary context providers
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" storageKey="app-theme">
        <AntdConfigProvider>
          <RootLayout>{children}</RootLayout>
        </AntdConfigProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export { ThemeProvider, useTheme } from './theme-provider';
`;

  await fs.writeFile(
    path.join(projectPath, 'src/providers/index.tsx'),
    providersContent
  );

  // Create styles directory if it doesn't exist
  await fs.ensureDir(path.join(projectPath, 'src/styles'));
}

/**
 * Update providers/index.tsx to include Redux Provider
 */
async function updateProvidersForRedux(projectPath, hasAntd) {
  let providersContent;

  if (hasAntd) {
    providersContent = `import { type ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { RootLayout } from '~/components/layout';
import { ErrorBoundary } from '~/components/layout';
import { AntdConfigProvider } from '~/antd';
import { ReduxProvider } from '~/redux';
import '~/styles/antd-overrides.css';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Application providers composition
 * Wraps the app with all necessary context providers
 *
 * Order: ErrorBoundary > Redux > Theme > Antd > Layout
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <ReduxProvider>
        <ThemeProvider defaultTheme="system" storageKey="app-theme">
          <AntdConfigProvider>
            <RootLayout>{children}</RootLayout>
          </AntdConfigProvider>
        </ThemeProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
}

export { ThemeProvider, useTheme } from './theme-provider';
`;
  } else {
    providersContent = `import { type ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { RootLayout } from '~/components/layout';
import { ErrorBoundary } from '~/components/layout';
import { ReduxProvider } from '~/redux';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Application providers composition
 * Wraps the app with all necessary context providers
 *
 * Order: ErrorBoundary > Redux > Theme > Layout
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <ReduxProvider>
        <ThemeProvider defaultTheme="system" storageKey="app-theme">
          <RootLayout>{children}</RootLayout>
        </ThemeProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
}

export { ThemeProvider, useTheme } from './theme-provider';
`;
  }

  await fs.writeFile(
    path.join(projectPath, 'src/providers/index.tsx'),
    providersContent
  );
}

/**
 * Remove a directory and all its contents
 */
async function removeDirectory(dirPath) {
  if (await fs.pathExists(dirPath)) {
    await fs.remove(dirPath);
  }
}

/**
 * Initialize git repository
 */
async function initializeGit(config) {
  const { projectPath } = config;

  try {
    console.log(chalk.gray('  Initializing Git repository...'));

    await runCommand('git', ['init'], projectPath);
    await runCommand('git', ['add', '.'], projectPath);
    await runCommand(
      'git',
      ['commit', '-m', 'Initial commit from create-modern-react'],
      projectPath
    );

    console.log(chalk.green('  ✅ Git repository initialized!'));
  } catch (error) {
    console.warn(
      chalk.yellow('  ⚠️  Could not initialize Git repository:'),
      error.message
    );
  }
}

/**
 * Setup Husky hooks after git init
 */
async function setupHusky(projectPath) {
  try {
    console.log(chalk.gray('  Setting up Husky git hooks...'));

    // Make pre-commit hook executable
    const preCommitPath = path.join(projectPath, '.husky/pre-commit');
    if (await fs.pathExists(preCommitPath)) {
      await fs.chmod(preCommitPath, '755');
    }

    console.log(chalk.green('  ✅ Husky configured!'));
  } catch (error) {
    console.warn(
      chalk.yellow('  ⚠️  Could not setup Husky:'),
      error.message
    );
  }
}

/**
 * Extract skills.tar.gz archive in the new project
 */
async function extractSkillsArchive(projectPath) {
  const claudeDir = path.join(projectPath, '.claude');
  const archivePath = path.join(claudeDir, 'skills.tar.gz');

  if (await fs.pathExists(archivePath)) {
    try {
      execSync('tar -xzf skills.tar.gz', { cwd: claudeDir, stdio: 'ignore' });
      // Remove the archive after extraction
      await fs.remove(archivePath);
    } catch (error) {
      console.warn(
        chalk.yellow('  ⚠️  Could not extract skills archive:'),
        error.message
      );
    }
  }
}

/**
 * Sort object keys alphabetically
 */
function sortObjectKeys(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((sorted, key) => {
      sorted[key] = obj[key];
      return sorted;
    }, {});
}

module.exports = { setupProject };
