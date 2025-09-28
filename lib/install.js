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

// Check if a command is available
function isCommandAvailable(command) {
  return new Promise((resolve) => {
    const child = spawn(command, ['--version'], {
      stdio: 'ignore',
      shell: true
    });

    child.on('close', (code) => {
      resolve(code === 0);
    });

    child.on('error', () => {
      resolve(false);
    });
  });
}

// Get the best available package manager with fallback
async function getAvailablePackageManager(preferredManager) {
  console.log(chalk.blue(`🔍 Checking for ${preferredManager}...`));

  // Check if preferred package manager is available
  if (await isCommandAvailable(preferredManager)) {
    console.log(chalk.green(`✅ ${preferredManager} is available`));
    return preferredManager;
  }

  // Fallback logic
  console.log(chalk.yellow(`⚠️  ${preferredManager} is not installed`));

  if (preferredManager !== 'npm') {
    console.log(chalk.blue('🔄 Falling back to npm...'));

    if (await isCommandAvailable('npm')) {
      console.log(chalk.green('✅ npm is available, using npm instead'));
      return 'npm';
    } else {
      throw new Error('Neither ' + preferredManager + ' nor npm is available');
    }
  } else {
    throw new Error('npm is not available');
  }
}

// Get install command and args for package manager
function getInstallCommand(packageManager) {
  switch (packageManager) {
    case 'yarn':
      return { command: 'yarn', args: ['install'] };
    case 'pnpm':
      return { command: 'pnpm', args: ['install'] };
    case 'npm':
    default:
      return { command: 'npm', args: ['install'] };
  }
}

async function installDependencies(config) {
  const { projectPath, packageManager: preferredManager, projectName } = config;

  console.log(chalk.blue('\n📦 Installing dependencies...'));

  try {
    // Get the best available package manager
    const availableManager = await getAvailablePackageManager(preferredManager);
    const { command, args } = getInstallCommand(availableManager);

    // Update config with actual package manager used
    config.actualPackageManager = availableManager;

    console.log(chalk.blue(`📥 Running: ${command} ${args.join(' ')}`));
    await runCommand(command, args, projectPath);

    console.log(chalk.green('✅ Dependencies installed successfully!'));

    // Show different message if fallback was used
    if (availableManager !== preferredManager) {
      console.log(chalk.yellow(`ℹ️  Note: Used ${availableManager} instead of ${preferredManager}`));
    }

  } catch (error) {
    console.error(chalk.red('❌ Failed to install dependencies:'), error.message);
    console.log(chalk.yellow('\n🔧 You can install them manually by running:'));
    console.log(chalk.gray(`  cd ${projectName}`));

    // Show command for the originally preferred package manager
    if (preferredManager === 'yarn') {
      console.log(chalk.gray(`  yarn install`));
    } else if (preferredManager === 'pnpm') {
      console.log(chalk.gray(`  pnpm install`));
    } else {
      console.log(chalk.gray(`  npm install`));
    }

    console.log(chalk.yellow('\n💡 Make sure you have the package manager installed:'));
    if (preferredManager === 'yarn') {
      console.log(chalk.gray(`  npm install -g yarn`));
    } else if (preferredManager === 'pnpm') {
      console.log(chalk.gray(`  npm install -g pnpm`));
    }
  }
}

module.exports = { installDependencies, runCommand };