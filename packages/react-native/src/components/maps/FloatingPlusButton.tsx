import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlusButtonIcon from '@/assets/PlusButtonIcon';

interface FloatingPlusButtonProps {
  onPress: () => void;
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
}

export default function FloatingPlusButton({
  onPress,
  top,
  bottom,
  right,
  left,
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
        <PlusButtonIcon />
      </TouchableOpacity>
    </View>
  );
}
