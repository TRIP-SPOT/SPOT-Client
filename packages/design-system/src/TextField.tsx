import { useState } from 'react';
import { Platform, TextInput } from 'react-native';

interface TextField {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder: string;
  multiline?: boolean;
  isCorrect?: boolean;
  numberOfLines?: number;
}

export function TextField({
  value,
  onChange,
  placeholder,
  onSubmit,
  isCorrect,
  multiline,
  numberOfLines,
}: TextField) {
  const defaultClassName =
    'text-SPOT-black text-body2 rounded-md p-4 bg-SPOT-white/60 border-[2px] border-bg-SPOT-white/60';
  const incorrectClassName = 'border-SPOT-red border-[2px]';
  const correctClassName = 'border-Permission-green border-[2px]';

  const getBorderClassName = () => {
    if (typeof isCorrect === 'boolean' && value !== '') {
      return isCorrect ? correctClassName : incorrectClassName;
    }

    return 'border-none';
  };
  console.log(numberOfLines, Platform.OS);
  return (
    <TextInput
      multiline={multiline}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor="#ffffff"
      className={`${defaultClassName} ${getBorderClassName()}`}
      onSubmitEditing={onSubmit}
      numberOfLines={Platform.OS === 'ios' ? undefined : numberOfLines}
      style={{
        minHeight:
          Platform.OS === 'ios' && numberOfLines && numberOfLines
            ? 30 * numberOfLines
            : undefined,
      }}
    />
  );
}
