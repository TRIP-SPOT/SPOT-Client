const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const { withSentryConfig } = require('@sentry/react-native/metro');

const config = {
  watchFolders: [path.resolve(__dirname, '../../')],
};
module.exports = withSentryConfig(
  mergeConfig(getDefaultConfig(__dirname), config),
);
