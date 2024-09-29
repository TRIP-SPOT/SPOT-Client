import { CheckBox, Font } from 'design-system';
import { TouchableOpacity, View } from 'react-native';
import MenuIcon from '@/assets/MenuIcon';

interface ScheduleBlockProps {
  title: string;
  order: number;
  description: string;
  editMode?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  drag: () => void;
}

export default function ScheduleBlock({
  title,
  description,
  order,
  editMode,
  selected,
  onSelect,
  drag,
}: ScheduleBlockProps) {
  return (
    <View className="flex-row justify-between items-center">
      {editMode ? (
        <View className="mr-2.5">
          <CheckBox size={30} onPress={onSelect} selected={selected} />
        </View>
      ) : (
        <View className="rounded-sm w-6 h-6 items-center justify-center bg-[#4c4c4c] mr-4">
          <Font.Bold type="body2" color="white">
            {order + 1}
          </Font.Bold>
        </View>
      )}
      <View className="bg-SPOT-white/40 p-2.5 px-3 rounded-md flex-1 flex-row justify-between items-center">
        <View>
          <Font.Bold type="title1" color="white">
            {title}
          </Font.Bold>
          <Font type="body1" color="white">
            {description}
          </Font>
        </View>
        {editMode && (
          <TouchableOpacity
            className="p-4"
            onLongPress={editMode ? drag : undefined}
            delayLongPress={200}
          >
            <MenuIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
