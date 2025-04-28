const path = require('path');  // Import 'path' module
const {getDefaultConfig} = require('@expo/metro-config');

module.exports = (async () => {
    const config = await getDefaultConfig(__dirname);

    const {transformer, resolver} = config;

    config.transformer = {
        ...transformer,
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    };
    config.resolver = {
        ...resolver,
        assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...resolver.sourceExts, 'svg'],
        resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
    };
    
    // Add the parent directory to watchFolders to monitor changes outside the app directory
    config.watchFolders = [
      ...(config.watchFolders || []),  // Retain existing watch folders
      path.resolve(__dirname, "../"),  // Add parent folder to watch
  ];

    return config;
})();