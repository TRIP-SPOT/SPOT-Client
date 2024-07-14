const { tailwindConfig } = require('tailwind-config');

module.exports = {
  ...tailwindConfig,
  content: [
    ...tailwindConfig.content,
    '../design-system/src/**/*.{js,jsx,ts,tsx}',
  ],
};
