import type { Meta, StoryObj } from '@storybook/react';
import { LoginButton } from '../src/SocialLogin';
import { View } from 'react-native';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Spots/SocialLogin',
  component: ({ type, onPress }) => (
    <View
      style={{
        width: 300,
      }}
    >
      <LoginButton type={type} onPress={onPress} />
    </View>
  ),
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['apple', 'kakao'],
      control: 'radio',
    },
  },
  args: { onPress: () => {} },
} satisfies Meta<typeof LoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const defaultStory: Story = {
  args: {
    type: 'kakao',
  },
};
