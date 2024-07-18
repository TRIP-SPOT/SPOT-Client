import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../src/TextField';
import { useState } from 'react';

const correct = () => true;
const incorrect = () => false;

const meta = {
  title: 'Spots/TextField',
  component: ({ placeholder, onSubmit, validate }) => {
    const [inputValue, setInputValue] = useState('');
    return (
      <TextField
        value={inputValue}
        onChange={(text) => setInputValue(text)}
        placeholder={placeholder}
        onSubmit={onSubmit}
        validate={validate}
      />
    );
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    validate: {
      options: [correct, incorrect],
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
    validate: () => true,
  },
};
