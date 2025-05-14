const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const setupDir = path.join(__dirname, 'setup-data');

// Helpers
const copyFile = (source, destination) => {
  fs.copyFileSync(source, destination);
  console.log(`Copied ${source} to ${destination}`);
};

const copyDirectory = (sourceDir, destDir) => {
  fs.readdirSync(sourceDir).forEach(file => {
    const sourceFile = path.join(sourceDir, file);
    const destFile = path.join(destDir, file);

    const stat = fs.statSync(sourceFile);
    if (stat.isDirectory()) {
      if (!fs.existsSync(destFile)) {
        fs.mkdirSync(destFile, { recursive: true });
      }
      copyDirectory(sourceFile, destFile);
    } else {
      copyFile(sourceFile, destFile);
    }
  });
};

// Copy base-components
const installBaseComponents = () => {
  console.log('Copying base components...');
  const sourceBaseComponentsDir = path.join(setupDir, 'base-components');
  const destBaseComponentsDir = path.join(process.cwd(), 'src/components/base');

  if (!fs.existsSync(destBaseComponentsDir)) {
    fs.mkdirSync(destBaseComponentsDir, { recursive: true });
  }

  copyDirectory(sourceBaseComponentsDir, destBaseComponentsDir);
  console.log('Base components copied successfully.');
};

// Copy game-template folders
const installGameTemplate = () => {
  console.log('Copying game template...');

  // Copy folders to src/
  const foldersToCopy = ['config', 'navigation', 'screens'];
  foldersToCopy.forEach(folder => {
    const source = path.join(setupDir, 'game-template', folder);
    const dest = path.join(process.cwd(), 'src', folder);

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    copyDirectory(source, dest);
  });

  // Replace root App.js
  const sourceAppJs = path.join(setupDir, 'game-template', 'App.js');
  const destAppJs = path.join(process.cwd(), 'App.js');
  copyFile(sourceAppJs, destAppJs);

  console.log('Game template copied successfully.');
};

// Install navigation dependencies
const installGameTemplateDependencies = () => {
  console.log('Installing game template dependencies...');

  try {
    // Use expo install to match SDK-compatible versions
    execSync(
      'npx expo install ' + // <-- NOTE SPACE AFTER 'install'
      '@react-navigation/native ' +
      '@react-navigation/stack ' +
      'react-native-screens ' +
      'react-native-safe-area-context ' +
      'react-native-gesture-handler ' +
      'react-native-reanimated',
      { stdio: 'inherit' }
    );

    console.log('Game template dependencies installed successfully.');
  } catch (error) {
    console.error('❌ Failed to install game template dependencies. Please install manually.');
  }
};

// Main setup logic
async function promptSetup() {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'installSvgSupport',
      message: 'Would you like to add SVG support?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'useBaseComponents',
      message: 'Would you like to use base components (e.g., TextBase, ButtonBase)?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'useGameTemplate',
      message: 'Would you like to use the game template (requires base components)?',
      default: false,
    },
  ]);

  if (answers.installSvgSupport) {
    console.log('Adding SVG support...');
    execSync('npx expo install react-native-svg react-native-svg-transformer');
    execSync('npm install @expo/metro-config --save-dev');

    const sourceMetroConfig = path.join(setupDir, 'svg-support/metro.config.js');
    const destMetroConfig = path.join(process.cwd(), 'metro.config.js');
    copyFile(sourceMetroConfig, destMetroConfig);
    console.log('SVG support added successfully.');
  } else {
    console.log('SVG support skipped.');
  }

  let baseInstalled = answers.useBaseComponents;

  // Install base-components if selected
  if (baseInstalled) {
    installBaseComponents();
  }

  // Handle game template
  if (answers.useGameTemplate) {
    // If base-components weren't selected, ask to install them now
    if (!baseInstalled) {
      const confirmInstallBase = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'installBaseNow',
          message: 'Game template depends on base components. Install base components now?',
          default: true,
        },
      ]);

      if (confirmInstallBase.installBaseNow) {
        installBaseComponents();
        baseInstalled = true;
      } else {
        console.log('Cannot install game template without base components. Skipping game template.');
        return;
      }
    }

    installGameTemplate();
    installGameTemplateDependencies();
  } else {
    console.log('Game template setup skipped.');
  }

  console.log('Setup complete!');
}

promptSetup().catch(console.error);
