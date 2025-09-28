const { spawn } = require('child_process');
const chalk = require('chalk');

function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function installDependencies(config) {
  const { projectPath, packageManager } = config;

  console.log(chalk.blue('\n📦 Installing dependencies...'));

  try {
    const installCommand = packageManager === 'yarn' ? 'yarn' : packageManager === 'pnpm' ? 'pnpm' : 'npm';
    const installArgs = packageManager === 'npm' ? ['install'] : packageManager === 'pnpm' ? ['install'] : [];

    await runCommand(installCommand, installArgs, projectPath);

    console.log(chalk.green('✅ Dependencies installed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Failed to install dependencies:'), error.message);
    console.log(chalk.yellow('You can install them manually by running:'));
    console.log(chalk.gray(`  cd ${config.projectName}`));
    console.log(chalk.gray(`  ${packageManager} install`));
  }
}

module.exports = { installDependencies, runCommand };