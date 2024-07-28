import { TouchableOpacity } from 'react-native';
import EditIcon from '@/assets/EditIcon';

interface EditButtonProps {
  onPress: () => void;
}

export default function EditButton({ onPress }: EditButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-3 bg-Button-gray rounded-full"
    >
      <EditIcon />
    </TouchableOpacity>
  );
}
