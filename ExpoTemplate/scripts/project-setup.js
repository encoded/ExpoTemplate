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

// Install base-template
const installBaseTemplate = () => {
  console.log('Copying base template...');
  const foldersToCopy = ['config', 'screens', 'base'];

  foldersToCopy.forEach(folder => {
    const source = path.join(setupDir, 'base-template', folder);
    const dest = path.join(process.cwd(), 'src', folder);

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    copyDirectory(source, dest);
  });

  console.log('Base template copied successfully.');
};

const installBaseTemplateDependencies = () => {
  console.log('Installing base template dependencies...');
  try {
    execSync(
      'npx expo install react-native-safe-area-context',
      { stdio: 'inherit' }
    );
    console.log('Base template dependencies installed successfully.');
  } catch (error) {
    console.error('❌ Failed to install base template dependencies. Please install manually.');
  }
};

// Game template
const installGameTemplate = () => {
  console.log('Copying game template...');
  const foldersToCopy = ['config', 'navigation', 'screens'];

  foldersToCopy.forEach(folder => {
    const source = path.join(setupDir, 'game-template', folder);
    const dest = path.join(process.cwd(), 'src', folder);

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    copyDirectory(source, dest);
  });

  const sourceAppJs = path.join(setupDir, 'game-template', 'App.js');
  const destAppJs = path.join(process.cwd(), 'App.js');
  copyFile(sourceAppJs, destAppJs);

  console.log('Game template copied successfully.');
};

const installGameTemplateDependencies = () => {
  console.log('Installing game template dependencies...');
  try {
    execSync(
      'npx expo install @react-navigation/native @react-navigation/stack',
      { stdio: 'inherit' }
    );
    console.log('Game template dependencies installed successfully.');
  } catch (error) {
    console.error('❌ Failed to install game template dependencies. Please install manually.');
  }
};

// App template
const installAppTemplate = () => {
  console.log('Copying app template...');
  const foldersToCopy = ['navigation', 'screens', 'config'];

  foldersToCopy.forEach(folder => {
    const source = path.join(setupDir, 'app-template', folder);
    const dest = path.join(process.cwd(), 'src', folder);

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    copyDirectory(source, dest);
  });

  const sourceAppJs = path.join(setupDir, 'app-template', 'App.js');
  const destAppJs = path.join(process.cwd(), 'App.js');
  copyFile(sourceAppJs, destAppJs);

  console.log('App template copied successfully.');
};

const installAppTemplateDependencies = () => {
  console.log('Installing app template dependencies...');
  try {
    execSync(
      'npx expo install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs',
      { stdio: 'inherit' }
    );
    console.log('App template dependencies installed successfully.');
  } catch (error) {
    console.error('❌ Failed to install app template dependencies. Please install manually.');
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
      type: 'list',
      name: 'templateChoice',
      message: 'Which template would you like to use?',
      choices: ['game', 'app', 'none'],
      default: 'none',
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

  if (answers.templateChoice !== 'none') {
    installBaseTemplate();
    installBaseTemplateDependencies();

    if (answers.templateChoice === 'game') {
      installGameTemplate();
      installGameTemplateDependencies();
    } else if (answers.templateChoice === 'app') {
      installAppTemplate();
      installAppTemplateDependencies();
    }
  } else {
    console.log('No template selected.');
  }

  console.log('✅ Setup complete!');
}

promptSetup().catch(console.error);
