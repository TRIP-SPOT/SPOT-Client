import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../src/TextField';
import { useState } from 'react';

const meta = {
  title: 'Spots/TextField',
  component: ({ placeholder, onSubmit, isCorrect }) => {
    const [inputValue, setInputValue] = useState('');
    return (
      <TextField
        value={inputValue}
        onChange={(text) => setInputValue(text)}
        placeholder={placeholder}
        onSubmit={onSubmit}
        isCorrect={isCorrect}
      />
    );
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    isCorrect: {
      options: [true, false],
      control: 'radio',
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultStory: Story = {
  args: {
    value: '',
    onChange: () => {},
    placeholder: 'SPOT-Placeholder',
    onSubmit: () => {},
    isCorrect: true,
  },
};
