import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export type ButtonProps = {
  onPress: () => void;
  text: string;
};

export const Button = ({ text, onPress }: ButtonProps) => (
  <View className="justify-start flex-1">
    <TouchableOpacity
      className="px-4 py-2 flex justify-start bg-purple-700 rounded-md"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text className="text-white text-base font-bold">{text}</Text>
    </TouchableOpacity>
  </View>
);
