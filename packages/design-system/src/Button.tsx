import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';

export type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onPress?: () => void;
};

export const Button = ({
  onPress,
  children,
  disabled = false,
}: ButtonProps) => {
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
