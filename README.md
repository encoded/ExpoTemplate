# **ExpoTemplate** - A Blank Expo Project Template

This repository provides a starter template for **Expo projects**, with additional configurations and folder structures to streamline development. The template is **minimalistic**, including only the essential folders and a basic setup. Once you initialize the project, you will be prompted to apply additional configuration options to tailor the setup to your needs.

## **Folder Structure**

The template comes with a simple and clear folder structure:

- `/src`  # Main source code (components, screens, hooks, etc.)
- `/data`  # For static data files or local storage models
- `/assets/icons`  # Place your app's icons or static assets here

## **jsconfig.json**

The `jsconfig.json` file is included in the template, allowing for **absolute imports** in your JavaScript or TypeScript files. It defines paths for the main folders in the project such as:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@src/*": ["src/*"],
      "@data/*": ["data/*"],
      "@assets/*": ["assets/*"]
    }
  }
}

This means you can import files using these paths, for example:

```js
import MyComponent from '@src/components/MyComponent';
import data from '@data/sample.json';
import Icon from '@assets/icons/icon.svg';
```

## **Dependencies**

The template comes with the following **default dependencies** to get you started:

1. **`react-native-web`** (v~0.19.13)  
   This allows you to run and test your app on the web. It's configured to ensure that your app runs smoothly in a web environment.

2. **`inquirer`** (v^8.2.6)  
   Used for the setup script. This module helps automate additional configurations when you first initialize the template. It provides interactive prompts to customize your project further.

## **Setup Script**

After you initialize the project with this template, the setup script will run automatically. During this process, you will be prompted to customize your project configuration. Here’s what you can expect:

### **SVG Support**

You’ll be prompted with the option to add **SVG support** to your project.

If you opt in, the script will:

- Install the necessary packages:
  - `react-native-svg`
  - `react-native-svg-transformer`
- Copy the `metro.config.js` configuration into your project to enable SVG support.

This will allow you to import SVG files directly into your React Native components as React components.

## **Installation**

To use this template, simply run the following command to initialize a new project:

```bash
npx create-expo-app YourAppName --template https://github.com/encoded/ExpoTemplate/tree/main/ExpoTemplate
```

After running the command, you will be prompted with interactive options to further customize your project setup.

### Available Options:
- **SVG Support**: This option will modify your `metro.config.js` and install the relevant dependencies (`react-native-svg` and `react-native-svg-transformer`) to enable SVG support in your project.

## **Contributing**
Feel free to fork this template and adapt it to your needs. Pull requests for improvements or fixes are always welcome!

## **License**
This template is open-source and available under the MIT License.


