import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Font, CheckBox } from 'design-system';
import { SpotResponse } from '@/apis/queries/spot/useSpotDetailQuery';

interface AroundCardProps {
  data: SpotResponse;
  onCardClick: (spot: SpotResponse) => void;
  selectedSpots?: SpotResponse[];
  isLongPressMode?: boolean;
  startLongPress?: (spot: SpotResponse) => void;
}

export default function AroundCard({
  data,
  selectedSpots,
  isLongPressMode,
  onCardClick,
  startLongPress,
}: AroundCardProps) {
  const { image, title } = data;

  return (
    <ImageBackground
      source={{ uri: image }}
      className="w-[120px] h-[160px] rounded-lg overflow-hidden"
    >
      <TouchableOpacity
        className="flex-1 justify-end bg-black/30"
        onPress={() => onCardClick(data)}
        onLongPress={() => startLongPress && startLongPress(data)}
        activeOpacity={0.8}
      >
        {isLongPressMode && (
          <View className="absolute top-2 left-2">
            <CheckBox
              onPress={() => onCardClick(data)}
              selected={
                selectedSpots &&
                selectedSpots.some((spot) => spot.contentId === data.contentId)
              }
            />
          </View>
        )}
        <View className="p-2 bg-[#191919]">
          <Font.Bold type="body1" color="white" ellipsis>
            {title}
          </Font.Bold>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}
