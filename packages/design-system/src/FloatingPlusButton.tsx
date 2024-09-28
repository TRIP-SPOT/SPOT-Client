import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlusButtonIcon from './assets/PlusButtonIcon';
import { ReactNode } from 'react';

interface FloatingPlusButtonProps {
  onPress: () => void;
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
  CustomButton?: ReactNode;
}

export function FloatingPlusButton({
  onPress,
  top,
  bottom,
  right,
  left,
  CustomButton,
}: FloatingPlusButtonProps) {
  return (
    <View
      style={{
        position: 'absolute',
        top,
        bottom,
        right,
        left,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        {CustomButton ? CustomButton : <PlusButtonIcon />}
      </TouchableOpacity>
    </View>
  );
}
