import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import CheckIcon from '@/assets/CheckIcon';

interface CheckBoxProps {
  onPress?: (event: GestureResponderEvent) => void;
  size?: number;
  selected?: boolean;
}

export default function CheckBox({ size, onPress, selected }: CheckBoxProps) {
  return (
    <TouchableOpacity
      style={{
        width: size || 25,
        height: size || 25,
        backgroundColor: selected
          ? 'rgba(255,255,255,0.5)' // TODO: 실제 선택된 색상으로 변경 필요
          : 'rgba(255,255,255,0.5)',
      }}
      onPress={onPress}
      className="rounded-full items-center justify-center p-1.5"
      activeOpacity={1}
    >
      <CheckIcon color={selected ? '#ff1919' : undefined} />
    </TouchableOpacity>
  );
}
