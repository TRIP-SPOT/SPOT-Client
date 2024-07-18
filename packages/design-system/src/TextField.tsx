import { useState } from 'react';
import { TextInput } from 'react-native';

interface TextField {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder: string;
  validate: () => boolean;
}

export function TextField({
  value,
  onChange,
  placeholder,
  onSubmit,
  validate,
}: TextField) {
  const defaultClassName =
    'text-SPOT-black text-body2 rounded-md p-4 bg-SPOT-white/60 border-[2px] border-bg-SPOT-white/60';
  const incorrectClassName = 'border-SPOT-red border-[2px]';
  const correctClassName = 'border-Permission-green border-[2px]';

  const getBorderClassName = () => {
    if (typeof validate === 'function' && value !== '') {
      return validate() ? correctClassName : incorrectClassName;
    }

    return 'border-none';
  };

  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor="#ffffff"
      className={`${defaultClassName} ${getBorderClassName()}`}
      onSubmitEditing={onSubmit}
    />
  );
}
