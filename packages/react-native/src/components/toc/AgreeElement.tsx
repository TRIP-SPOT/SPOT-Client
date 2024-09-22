import { CheckBox, Font } from 'design-system';
import { TouchableOpacity, View } from 'react-native';

export interface AgreeElementProps {
  title: string;
  selected: boolean;
  onCheck: () => void;
  onPress: () => void;
}

export default function AgreeElement({
  title,
  selected,
  onCheck,
  onPress,
}: AgreeElementProps) {
  return (
    <View className="flex gap-3 justify-start flex-row items-center p-2">
      <View>
        <CheckBox selected={selected} onPress={onCheck} iconSize={20} />
      </View>
      <TouchableOpacity onPress={onPress}>
        <Font type="body2" color="white" underline>
          {title}
        </Font>
      </TouchableOpacity>
    </View>
  );
}
