import type { Preview } from '@storybook/react';
import './global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'black',
      values: [
        {
          name: 'gray',
          value: '#F3F5FB',
        },
        {
          name: 'white',
          value: '#FFFFFF',
        },
        {
          name: 'black',
          value: '#000000',
        },
      ],
    },
  },
};

export default preview;
