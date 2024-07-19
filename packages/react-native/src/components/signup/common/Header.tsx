import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Back from '@/assets/BackIcon';
import Cancel from '@/assets/CancelIcon';

interface HeaderProps {
  onBack: () => void;
  onCancel: () => void;
}

export default function Header({ onBack, onCancel }: HeaderProps) {
  return (
    <View className="w-full flex-row justify-between">
      <TouchableOpacity onPress={onBack}>
        <Back />
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancel}>
        <Cancel />
      </TouchableOpacity>
    </View>
  );
}
