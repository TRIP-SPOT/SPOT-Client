import type { Meta, StoryObj } from '@storybook/react';
import { FloatingPlusButton } from '../src/FloatingPlusButton';

const meta = {
  title: 'Spots/FloatingButton',
  component: (props) => (
    <div
      style={{
        position: 'relative',
        height: 50,
      }}
    >
      <FloatingPlusButton {...props} />
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof FloatingPlusButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {
  args: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    onPress: () => {},
  },
};
