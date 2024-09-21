import { CheckBox, Font } from 'design-system';
import { View } from 'react-native';

interface ScheduleBlockProps {
  title: string;
  order: number;
  description: string;
  editMode?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

export default function ScheduleBlock({
  title,
  description,
  order,
  editMode,
  selected,
  onSelect,
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
            {order}
          </Font.Bold>
        </View>
      )}
      <View className="bg-SPOT-white/40 p-2.5 px-3 rounded-md flex-1">
        <Font.Bold type="title1" color="white">
          {title}
        </Font.Bold>
        <Font type="body1" color="white">
          {description}
        </Font>
      </View>
    </View>
  );
}
