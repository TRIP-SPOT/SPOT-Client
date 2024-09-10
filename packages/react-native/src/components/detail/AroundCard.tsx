import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Font, CheckBox } from 'design-system';
import { AroundSpot } from '@/apis/queries/detail/useAroundSpotQuery';

interface AroundCardProps {
  data: AroundSpot;
  selectedSpots: number[];
  isLongPressMode: boolean;
  onCardClick: (id: number) => void;
  startLongPress: (id: number) => void;
}

export default function AroundCard({
  data,
  selectedSpots,
  isLongPressMode,
  onCardClick,
  startLongPress,
}: AroundCardProps) {
  const { backgroundImage, id, title } = data;

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      className="w-[120px] h-[160px] rounded-lg overflow-hidden"
    >
      <TouchableOpacity
        className="flex-1 justify-end bg-black/40"
        onPress={() => onCardClick(id)}
        onLongPress={() => startLongPress(id)}
        activeOpacity={0.8}
      >
        {isLongPressMode && (
          <View className="absolute top-2 left-2">
            <CheckBox
              onPress={() => onCardClick(id)}
              selected={selectedSpots.includes(id)}
            />
          </View>
        )}
        <View className="p-2">
          <Font.Bold type="body1" color="white">
            {title}
          </Font.Bold>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}
