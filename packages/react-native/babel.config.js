const { babelConfig } = require('tailwind-config');

module.exports = {
  ...babelConfig,
  presets: ['module:@react-native/babel-preset'],
};
