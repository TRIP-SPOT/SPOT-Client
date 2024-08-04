const { babelConfig } = require('tailwind-config');

module.exports = {
  ...babelConfig,
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ...babelConfig.plugins,
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          '@pages': './src/pages',
          '@routes': './src/routes',
          '@components': './src/components',
          '@layouts': './src/layouts',
          '@assets': './src/assets',
          '@constants': './src/constants',
          '@utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
