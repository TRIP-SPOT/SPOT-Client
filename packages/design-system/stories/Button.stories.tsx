import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/Button';
import { Font } from '../src/Font';

const meta = {
  title: 'Spots/Button',
  component: ({ ...props }) => (
    <div
      style={{
        width: '300px',
      }}
    >
      <Button {...props} />
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    disabled: {
      options: [true, false],
      control: 'radio',
    },
    children: {
      table: { disable: true },
    },
  },
  args: {
    children: (
      <Font type="body1" color="white">
        완료
      </Font>
    ),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const defaultStory: Story = {
  args: {
    disabled: false,
    onPress: () => {},
  },
};
