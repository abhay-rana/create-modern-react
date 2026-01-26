const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const { installDependencies } = require('./install');
const { setupProject } = require('./setup');

/**
 * Core stack (always included):
 * - React 18.3 + TypeScript 5.5 + Vite 5.4 (SWC)
 * - Tailwind CSS 3.4 + tailwind-merge + clsx + CVA
 * - Shadcn/ui components (Button, Input, Card, Skeleton, Separator)
 * - Lucide React icons
 * - Wouter routing (lightweight, 2KB)
 * - Axios with interceptors
 * - ESLint + Prettier (pre-configured)
 * - Path aliases (~/*)
 */

async function createProject(projectName, options) {
  console.log(chalk.cyan.bold('\n🚀 create-modern-react\n'));
  console.log(chalk.gray('Production-ready React + TypeScript + Tailwind in seconds\n'));

  // ─────────────────────────────────────────────────────────────
  // Prompt 1: Project Name
  // ─────────────────────────────────────────────────────────────
  if (!projectName) {
    const nameAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        validate: (input) => {
          if (!input.trim()) return 'Project name is required';
          if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
            return 'Project name can only contain letters, numbers, hyphens, and underscores';
          }
          return true;
        }
      }
    ]);
    projectName = nameAnswer.projectName;
  }

  const projectPath = path.resolve(process.cwd(), projectName);

  // Check if directory exists
  if (fs.existsSync(projectPath)) {
    const overwriteAnswer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `Directory "${projectName}" already exists. Overwrite?`,
        default: false
      }
    ]);

    if (!overwriteAnswer.overwrite) {
      console.log(chalk.yellow('\nOperation cancelled.'));
      return;
    }

    await fs.remove(projectPath);
  }

  // ─────────────────────────────────────────────────────────────
  // Prompt 2: Package Manager
  // ─────────────────────────────────────────────────────────────
  const { packageManager } = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageManager',
      message: 'Package manager:',
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' },
        { name: 'pnpm', value: 'pnpm' }
      ]
    }
  ]);

  // ─────────────────────────────────────────────────────────────
  // Prompt 3: Optional Features (checkbox - multi-select)
  // ─────────────────────────────────────────────────────────────
  console.log(chalk.gray('  (Press <space> to select, <enter> to confirm)\n'));
  const { optionalFeatures } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'optionalFeatures',
      message: 'Select optional features:',
      choices: [
        {
          name: 'Redux Toolkit + Redux Persist (state management)',
          value: 'redux',
          checked: false
        },
        {
          name: 'Ant Design v5 (replaces Shadcn/ui)',
          value: 'antd',
          checked: false
        },
        {
          name: 'Husky + lint-staged (git hooks)',
          value: 'husky',
          checked: false
        }
      ]
    }
  ]);

  // ─────────────────────────────────────────────────────────────
  // Prompt 4: Initialize Git
  // ─────────────────────────────────────────────────────────────
  let initGit = true;
  if (!options.skipGit) {
    const gitAnswer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'git',
        message: 'Initialize Git repository?',
        default: true
      }
    ]);
    initGit = gitAnswer.git;
  } else {
    initGit = false;
  }

  // ─────────────────────────────────────────────────────────────
  // Prompt 5: Install Dependencies
  // ─────────────────────────────────────────────────────────────
  let installDeps = true;
  if (!options.skipInstall) {
    const installAnswer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'install',
        message: 'Install dependencies?',
        default: true
      }
    ]);
    installDeps = installAnswer.install;
  } else {
    installDeps = false;
  }

  // ─────────────────────────────────────────────────────────────
  // Build Configuration Object
  // ─────────────────────────────────────────────────────────────
  const config = {
    projectName,
    projectPath,
    packageManager,
    // Optional features
    useRedux: optionalFeatures.includes('redux'),
    useAntd: optionalFeatures.includes('antd'),
    useHusky: optionalFeatures.includes('husky'),
    // Flags
    initGit,
    installDeps
  };

  // ─────────────────────────────────────────────────────────────
  // Display Configuration Summary
  // ─────────────────────────────────────────────────────────────
  console.log(chalk.cyan('\n┌─────────────────────────────────────────────┐'));
  console.log(chalk.cyan('│') + chalk.white.bold('         Configuration Summary              ') + chalk.cyan('│'));
  console.log(chalk.cyan('├─────────────────────────────────────────────┤'));
  console.log(chalk.cyan('│') + chalk.white(' Core Stack (always included):              ') + chalk.cyan('│'));
  console.log(chalk.cyan('│') + chalk.gray('   React 18 + TypeScript + Vite (SWC)       ') + chalk.cyan('│'));
  console.log(chalk.cyan('│') + chalk.gray('   Tailwind CSS + clsx + CVA                ') + chalk.cyan('│'));
  console.log(chalk.cyan('│') + chalk.gray(`   ${config.useAntd ? 'Ant Design v5' : 'Shadcn/ui components'}                      `) + chalk.cyan('│'));
  console.log(chalk.cyan('│') + chalk.gray('   Wouter routing + Axios                   ') + chalk.cyan('│'));
  console.log(chalk.cyan('│') + chalk.gray('   Lucide icons + ESLint + Prettier         ') + chalk.cyan('│'));
  console.log(chalk.cyan('│') + chalk.magenta('   🤖 Claude Code AI Skills                 ') + chalk.cyan('│'));
  console.log(chalk.cyan('├─────────────────────────────────────────────┤'));
  console.log(chalk.cyan('│') + chalk.white(' Optional Features:                         ') + chalk.cyan('│'));
  console.log(chalk.cyan('│') + `   Redux Toolkit:  ${config.useRedux ? chalk.green('✓') : chalk.gray('✗')}                        ` + chalk.cyan('│'));
  console.log(chalk.cyan('│') + `   Ant Design v5:  ${config.useAntd ? chalk.green('✓') : chalk.gray('✗')}                        ` + chalk.cyan('│'));
  console.log(chalk.cyan('│') + `   Husky hooks:    ${config.useHusky ? chalk.green('✓') : chalk.gray('✗')}                        ` + chalk.cyan('│'));
  console.log(chalk.cyan('└─────────────────────────────────────────────┘\n'));

  // ─────────────────────────────────────────────────────────────
  // Execute Setup
  // ─────────────────────────────────────────────────────────────
  await setupProject(config);

  // Install dependencies
  if (installDeps) {
    await installDependencies(config);
  }

  // ─────────────────────────────────────────────────────────────
  // Success Message
  // ─────────────────────────────────────────────────────────────
  const pm = config.actualPackageManager || packageManager;
  const runCmd = pm === 'npm' ? 'npm run' : pm;

  console.log(chalk.green.bold(`\n✅ Project "${projectName}" created successfully!\n`));
  console.log(chalk.white('Next steps:\n'));
  console.log(chalk.gray(`  cd ${projectName}`));
  if (!installDeps) {
    console.log(chalk.gray(`  ${pm} install`));
  }
  console.log(chalk.gray(`  ${runCmd} dev\n`));
  console.log(chalk.cyan('Happy coding! 🎉\n'));
}

module.exports = { createProject };
