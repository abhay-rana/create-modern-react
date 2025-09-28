const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const { installDependencies } = require('./install');
const { setupProject } = require('./setup');

async function createProject(projectName, options) {
  // Get project name if not provided
  if (!projectName) {
    const nameAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?',
        validate: (input) => {
          if (!input.trim()) return 'Project name is required';
          if (!/^[a-zA-Z0-9-_]+$/.test(input)) return 'Project name can only contain letters, numbers, hyphens, and underscores';
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
        message: `Directory ${projectName} already exists. Do you want to overwrite it?`,
        default: false
      }
    ]);

    if (!overwriteAnswer.overwrite) {
      console.log(chalk.yellow('Operation cancelled.'));
      return;
    }

    await fs.remove(projectPath);
  }

  // Package Manager Selection
  const packageManagerAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageManager',
      message: 'Which package manager would you like to use?',
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' },
        { name: 'pnpm', value: 'pnpm' }
      ]
    }
  ]);

  // UI Library Selection
  const uiLibraryAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'uiLibrary',
      message: 'Do you want to include a UI component library?',
      choices: [
        { name: 'Ant Design v5 (with theme customization)', value: 'antd' },
        { name: 'Material-UI (MUI)', value: 'mui' },
        { name: 'Chakra UI', value: 'chakra' },
        { name: 'None (custom components only)', value: 'none' }
      ]
    }
  ]);

  // CSS Framework Selection
  const cssFrameworkAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'cssFramework',
      message: 'Which CSS framework would you like to use?',
      choices: [
        { name: 'Tailwind CSS (with custom config)', value: 'tailwind' },
        { name: 'CSS Modules', value: 'css-modules' },
        { name: 'Styled Components', value: 'styled-components' },
        { name: 'Plain CSS only', value: 'plain' }
      ]
    }
  ]);

  // State Management Selection
  const stateManagementAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'stateManagement',
      message: 'Do you need state management?',
      choices: [
        { name: 'Redux Toolkit (with Redux Persist)', value: 'redux-toolkit' },
        { name: 'Zustand', value: 'zustand' },
        { name: 'Jotai', value: 'jotai' },
        { name: 'React state only', value: 'none' }
      ]
    }
  ]);

  // Data Fetching Selection
  const dataFetchingAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'dataFetching',
      message: 'Do you want to include data fetching libraries?',
      choices: [
        { name: 'React Query (TanStack Query)', value: 'react-query' },
        { name: 'SWR', value: 'swr' },
        { name: 'Apollo Client (for GraphQL)', value: 'apollo' },
        { name: 'Fetch API only', value: 'none' }
      ]
    }
  ]);

  // Routing Selection
  const routingAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'routing',
      message: 'Do you need client-side routing?',
      choices: [
        { name: 'React Router v6', value: 'react-router' },
        { name: 'Wouter (lightweight)', value: 'wouter' },
        { name: 'No routing', value: 'none' }
      ]
    }
  ]);

  // Development Tools Selection
  const devToolsAnswer = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'devTools',
      message: 'Which development tools would you like?',
      choices: [
        { name: 'Storybook (component development)', value: 'storybook' },
        { name: 'ESLint + Prettier (code quality)', value: 'eslint-prettier', checked: true },
        { name: 'Husky + lint-staged (git hooks)', value: 'husky', checked: true },
        { name: 'Jest + Testing Library (testing)', value: 'testing' }
      ]
    }
  ]);

  // Icons Selection
  const iconsAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'icons',
      message: 'Do you want icon libraries?',
      choices: [
        { name: 'Lucide React', value: 'lucide' },
        { name: 'React Icons', value: 'react-icons' },
        { name: 'Heroicons', value: 'heroicons' },
        { name: 'No icon library', value: 'none' }
      ]
    }
  ]);

  // PWA Selection
  const pwaAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'pwa',
      message: 'Make it a PWA?',
      default: false
    }
  ]);

  // Git Selection
  const gitAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'git',
      message: 'Initialize Git repository?',
      default: true
    }
  ]);

  const config = {
    projectName,
    projectPath,
    packageManager: packageManagerAnswer.packageManager,
    uiLibrary: uiLibraryAnswer.uiLibrary,
    cssFramework: cssFrameworkAnswer.cssFramework,
    stateManagement: stateManagementAnswer.stateManagement,
    dataFetching: dataFetchingAnswer.dataFetching,
    routing: routingAnswer.routing,
    devTools: devToolsAnswer.devTools,
    icons: iconsAnswer.icons,
    pwa: pwaAnswer.pwa,
    git: gitAnswer.git,
    skipInstall: options.skipInstall,
    skipGit: options.skipGit
  };

  console.log(chalk.blue('\n📦 Creating project with the following configuration:'));
  console.log(chalk.gray(JSON.stringify(config, null, 2)));

  // Create project
  await setupProject(config);

  // Install dependencies
  if (!options.skipInstall) {
    await installDependencies(config);
  }

  console.log(chalk.green.bold(`\n🎉 Project ${projectName} created successfully!`));
  console.log(chalk.blue('\nNext steps:'));
  console.log(chalk.gray(`  cd ${projectName}`));
  if (options.skipInstall) {
    console.log(chalk.gray(`  ${config.packageManager} install`));
  }
  console.log(chalk.gray(`  ${config.packageManager} dev`));
}

module.exports = { createProject };