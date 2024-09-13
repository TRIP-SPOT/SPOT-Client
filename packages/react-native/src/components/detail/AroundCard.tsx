import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Font, CheckBox } from 'design-system';
import { AroundSpot } from '@/apis/queries/detail/useAroundSpotQuery';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';

interface AroundCardProps {
  data: AroundSpot;
  onCardClick: (id: number) => void;
  selectedSpots?: number[];
  isLongPressMode?: boolean;
  startLongPress?: (id: number) => void;
}

export default function AroundCard({
  data,
  selectedSpots,
  isLongPressMode,
  onCardClick,
  startLongPress,
}: AroundCardProps) {
  const { image, id, spotName, location, city } = data;

  return (
    <ImageBackground
      source={{ uri: image }}
      className="w-[120px] h-[160px] rounded-lg overflow-hidden"
    >
      <TouchableOpacity
        className="flex-1 justify-end bg-black/30"
        onPress={() => onCardClick(id)}
        onLongPress={() => startLongPress && startLongPress(id)}
        activeOpacity={0.8}
      >
        {isLongPressMode && (
          <View className="absolute top-2 left-2">
            <CheckBox
              onPress={() => onCardClick(id)}
              selected={selectedSpots && selectedSpots.includes(id)}
            />
          </View>
        )}
        <View className="p-2 bg-[#191919]">
          <Font.Bold type="body1" color="white">
            {spotName}
          </Font.Bold>
          <Font type="body3" color="white">
            {getDisplayRegion({
              locationEnum: location,
              cityEnum: city,
            })}
          </Font>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}
