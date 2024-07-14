import type { StorybookConfig } from '@storybook/react-webpack5';

import { join, dirname, resolve } from 'path';
import type { Configuration as WebpackConfiguration } from 'webpack';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
    {
      name: getAbsolutePath('@storybook/addon-react-native-web'),
      options: {
        modulesToTranspile: ['nativewind'],
        babelPlugins: ['nativewind/babel'],
      },
    },
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },

  webpackFinal: async (config: WebpackConfiguration) => {
    config?.module?.rules?.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('tailwindcss'), require('autoprefixer')],
            },
          },
        },
      ],
      include: resolve(__dirname, '../'),
    });

    return {
      ...config,
    };
  },
};
export default config;
