import type { Meta, StoryObj } from '@storybook/react';
import { Font } from '../src/Font';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Spots/Font',
  component: Font,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  args: {},
} satisfies Meta<typeof Font>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const defaultStory: Story = {
  args: {
    type: 'body1',
    children: 'SPOT!',
    color: 'red',
  },
};
