import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import CheckIcon from './assets/CheckIcon';
import CheckSelectedIcon from './assets/CheckSelectedIcon';

interface CheckBoxProps {
  onPress?: (event: GestureResponderEvent) => void;
  size?: number;
  selected?: boolean;
  iconSize?: number;
}

export function CheckBox({ size, onPress, selected, iconSize }: CheckBoxProps) {
  return (
    <TouchableOpacity
      style={{
        width: size || 25,
        height: size || 25,
      }}
      onPress={onPress}
      className="rounded-full items-center justify-center"
      activeOpacity={1}
    >
      {selected ? (
        <CheckSelectedIcon />
      ) : (
        <View className="bg-SPOT-white/50 p-[3.5px] rounded-full">
          <CheckIcon width={iconSize || 20} height={iconSize || 20} />
        </View>
      )}
    </TouchableOpacity>
  );
}
