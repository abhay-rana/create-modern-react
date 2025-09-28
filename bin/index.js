#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const { createProject } = require('../lib/prompts');

program
  .name('create-modern-react')
  .description('Create a modern React application with Vite, TypeScript, and your choice of modern libraries')
  .version('1.0.0')
  .argument('[project-name]', 'name of the project')
  .option('-t, --template <template>', 'use a specific template')
  .option('--skip-install', 'skip dependency installation')
  .option('--skip-git', 'skip git initialization')
  .action(async (projectName, options) => {
    console.log(chalk.blue.bold('\n🚀 Welcome to create-modern-react!\n'));

    try {
      await createProject(projectName, options);
    } catch (error) {
      console.error(chalk.red('❌ Error creating project:'), error.message);
      process.exit(1);
    }
  });

program.parse();