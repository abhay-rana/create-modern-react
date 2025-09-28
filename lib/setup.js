const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { runCommand } = require('./install');

async function setupProject(config) {
  const { projectPath, projectName } = config;

  console.log(chalk.blue('\n🏗️  Setting up project structure...'));

  // Create project directory
  await fs.ensureDir(projectPath);

  // Copy base template
  const templatePath = path.join(__dirname, '../templates/base');
  await fs.copy(templatePath, projectPath);

  // Update package.json with project name and selected dependencies
  await updatePackageJson(config);

  // Configure selected libraries
  await configureLibraries(config);

  // Initialize git if requested
  if (config.git && !config.skipGit) {
    await initializeGit(config);
  }

  console.log(chalk.green('✅ Project structure created successfully!'));
}

async function updatePackageJson(config) {
  const packageJsonPath = path.join(config.projectPath, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);

  // Update name
  packageJson.name = config.projectName;

  // Add dependencies based on configuration
  const dependencies = { ...packageJson.dependencies };
  const devDependencies = { ...packageJson.devDependencies };

  // UI Library dependencies
  if (config.uiLibrary === 'antd') {
    dependencies['antd'] = '^5.0.0';
  } else if (config.uiLibrary === 'mui') {
    dependencies['@mui/material'] = '^5.0.0';
    dependencies['@emotion/react'] = '^11.0.0';
    dependencies['@emotion/styled'] = '^11.0.0';
  } else if (config.uiLibrary === 'chakra') {
    dependencies['@chakra-ui/react'] = '^2.0.0';
    dependencies['@emotion/react'] = '^11.0.0';
    dependencies['@emotion/styled'] = '^11.0.0';
    dependencies['framer-motion'] = '^6.0.0';
  }

  // CSS Framework dependencies
  if (config.cssFramework === 'tailwind') {
    devDependencies['tailwindcss'] = '^3.0.0';
    devDependencies['postcss'] = '^8.0.0';
    devDependencies['autoprefixer'] = '^10.0.0';
  } else if (config.cssFramework === 'styled-components') {
    dependencies['styled-components'] = '^6.0.0';
    devDependencies['@types/styled-components'] = '^5.1.0';
  }

  // State Management dependencies
  if (config.stateManagement === 'redux-toolkit') {
    dependencies['@reduxjs/toolkit'] = '^2.0.0';
    dependencies['react-redux'] = '^9.0.0';
    dependencies['redux-persist'] = '^6.0.0';
  } else if (config.stateManagement === 'zustand') {
    dependencies['zustand'] = '^4.0.0';
  } else if (config.stateManagement === 'jotai') {
    dependencies['jotai'] = '^2.0.0';
  }

  // Data Fetching dependencies
  if (config.dataFetching === 'react-query') {
    dependencies['@tanstack/react-query'] = '^5.0.0';
    dependencies['@tanstack/react-query-devtools'] = '^5.0.0';
  } else if (config.dataFetching === 'swr') {
    dependencies['swr'] = '^2.0.0';
  } else if (config.dataFetching === 'apollo') {
    dependencies['@apollo/client'] = '^3.0.0';
    dependencies['graphql'] = '^16.0.0';
  }

  // Routing dependencies
  if (config.routing === 'react-router') {
    dependencies['react-router-dom'] = '^6.0.0';
  } else if (config.routing === 'wouter') {
    dependencies['wouter'] = '^3.0.0';
  }

  // Icon dependencies
  if (config.icons === 'lucide') {
    dependencies['lucide-react'] = '^0.400.0';
  } else if (config.icons === 'react-icons') {
    dependencies['react-icons'] = '^5.0.0';
  } else if (config.icons === 'heroicons') {
    dependencies['@heroicons/react'] = '^2.0.0';
  }

  // Development Tools dependencies
  if (config.devTools.includes('storybook')) {
    devDependencies['@storybook/react-vite'] = '^8.0.0';
    devDependencies['@storybook/addon-essentials'] = '^8.0.0';
    devDependencies['storybook'] = '^8.0.0';
  }

  if (config.devTools.includes('testing')) {
    devDependencies['jest'] = '^29.0.0';
    devDependencies['@testing-library/react'] = '^14.0.0';
    devDependencies['@testing-library/jest-dom'] = '^6.0.0';
    devDependencies['@testing-library/user-event'] = '^14.0.0';
  }

  if (config.devTools.includes('husky')) {
    devDependencies['husky'] = '^9.0.0';
    devDependencies['lint-staged'] = '^15.0.0';
  }

  // PWA dependencies
  if (config.pwa) {
    devDependencies['vite-plugin-pwa'] = '^0.20.0';
  }

  packageJson.dependencies = dependencies;
  packageJson.devDependencies = devDependencies;

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}

async function configureLibraries(config) {
  const { projectPath } = config;

  // Configure Tailwind if selected
  if (config.cssFramework === 'tailwind') {
    await configureTailwind(projectPath);
  }

  // Configure Vite plugins based on selections
  await configureVite(config);

  // Add configuration files for selected libraries
  await addConfigFiles(config);
}

async function configureTailwind(projectPath) {
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

  const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

  await fs.writeFile(path.join(projectPath, 'tailwind.config.js'), tailwindConfig);
  await fs.writeFile(path.join(projectPath, 'postcss.config.js'), postcssConfig);

  // Add Tailwind directives to CSS
  const cssPath = path.join(projectPath, 'src/index.css');
  const tailwindDirectives = `@tailwind base;
@tailwind components;
@tailwind utilities;

`;

  if (await fs.pathExists(cssPath)) {
    const existingCss = await fs.readFile(cssPath, 'utf8');
    await fs.writeFile(cssPath, tailwindDirectives + existingCss);
  } else {
    await fs.writeFile(cssPath, tailwindDirectives);
  }
}

async function configureVite(config) {
  // This would configure vite.config.ts based on selected options
  // For now, we'll use the existing base template configuration
}

async function addConfigFiles(config) {
  // Add configuration files for selected tools
  // This would add ESLint, Prettier, Jest configs, etc.
}

async function initializeGit(config) {
  const { projectPath } = config;

  try {
    console.log(chalk.blue('🔧 Initializing Git repository...'));

    await runCommand('git', ['init'], projectPath);
    await runCommand('git', ['add', '.'], projectPath);
    await runCommand('git', ['commit', '-m', 'Initial commit from create-modern-react'], projectPath);

    console.log(chalk.green('✅ Git repository initialized!'));
  } catch (error) {
    console.warn(chalk.yellow('⚠️  Could not initialize Git repository:'), error.message);
  }
}

module.exports = { setupProject };