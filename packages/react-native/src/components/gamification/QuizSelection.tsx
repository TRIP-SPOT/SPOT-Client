import { Font, CheckBox } from 'design-system';
import { TouchableOpacity, View } from 'react-native';

interface QuizSelectionProps {
  isSelected: boolean;
  content: string;
  onPress: () => void;
}

export default function QuizSelection({
  isSelected,
  content,
  onPress,
}: QuizSelectionProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${isSelected ? 'bg-SPOT-red' : 'bg-Button-gray'} p-4 rounded-xl items-start `}
    >
      <View className="gap-2.5 flex flex-row items-center ">
        <View>
          <CheckBox selected={isSelected} size={20} />
        </View>
        <View>
          {isSelected ? (
            <Font.Bold type="body1" color="white">
              {content}
            </Font.Bold>
          ) : (
            <Font type="body1" color="white">
              {content}
            </Font>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
