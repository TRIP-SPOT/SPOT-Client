import type { Meta, StoryObj } from '@storybook/react';
import { CheckBox } from '../src/CheckBox';

const meta = {
  title: 'Spots/Checkbox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const check: Story = {
  args: {
    selected: true,
  },
};

export const uncheck: Story = {
  args: {
    selected: false,
  },
};
