const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get the path to the setup directory, which is one level up from the current script
const setupDir = path.join(__dirname, 'setup-data');

// Helper function to copy files
const copyFile = (source, destination) => {
  fs.copyFileSync(source, destination);
  console.log(`Copied ${source} to ${destination}`);
};

// Prompt user for SVG support setup
async function promptSetup() {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'installSvgSupport',
      message: 'Would you like to add SVG support?',
      default: true,
    },
  ]);

  // Handle SVG support installation if selected
  if (answers.installSvgSupport) {
    console.log('Adding SVG support...');
    execSync('npm install react-native-svg react-native-svg-transformer --save');
    execSync('npm install @expo/metro-config --save-dev');

    // Copy the metro.config.js file for SVG support
    const sourceMetroConfig = path.join(setupDir, 'svg-support/metro.config.js');
    const destMetroConfig = path.join(process.cwd(), 'metro.config.js');
    copyFile(sourceMetroConfig, destMetroConfig);

    console.log('SVG support added successfully.');
  } else {
    console.log('SVG support skipped.');
  }

  console.log('Setup complete!');
}

// Run the setup after initialization
promptSetup().catch(console.error);
