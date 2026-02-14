#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const { createProject } = require('../lib/prompts');

program
  .name('create-modern-react')
  .description(
    'Create production-ready React + TypeScript + Tailwind applications in seconds'
  )
  .version('3.0.0')
  .argument('[project-name]', 'name of the project')
  .option('--skip-install', 'skip dependency installation')
  .option('--skip-git', 'skip git initialization')
  .option('--no-scripts', 'skip all lifecycle scripts (skills extraction + npm scripts)')
  .action(async (projectName, options) => {
    try {
      await createProject(projectName, options);
    } catch (error) {
      console.error(chalk.red('\n❌ Error creating project:'), error.message);
      if (process.env.DEBUG) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

program.parse();
