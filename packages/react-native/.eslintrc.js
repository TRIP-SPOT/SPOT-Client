module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    requireConfigFile: false,
  },
  plugins: ['jest'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': 'off',
    'import/no-unresolved': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/require-default-props': 'off',
    'no-console': 'error',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/no-array-index-key': 'off',
  },
  ignorePatterns: [
    'index.js',
    'metro.config.js',
    'babel.config.js',
    'tailwind.config.js',
  ],
};
