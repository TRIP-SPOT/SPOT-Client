import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export type ButtonProps = {
  onPress: () => void;
  disabled: boolean;
  children: ReactNode;
};

export const Button = ({ onPress, disabled, children }: ButtonProps) => {
  return (
    <TouchableOpacity
      className={`py-[11px] w-full rounded-[24px] justify-center items-center ${
        disabled ? 'bg-Button-gray opacity-40' : 'bg-Button-red'
      }`}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
};
