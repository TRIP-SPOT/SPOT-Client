import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React, { ReactElement } from 'react';
import { Font } from 'design-system';
import Back from '@/assets/BackIcon';

interface HeaderProps {
  title?: string;
  RightActionButton?: ReactElement;
  onBack: () => void;
}

export default function Header({
  title,
  onBack,
  RightActionButton,
}: HeaderProps) {
  return (
    <View className="w-full flex-row justify-between">
      <TouchableOpacity onPress={onBack}>
        <Back />
      </TouchableOpacity>
      {title && (
        <View>
          <Font.Bold color="white" type="body1">
            {title}
          </Font.Bold>
        </View>
      )}
      {RightActionButton || <View />}
    </View>
  );
}
