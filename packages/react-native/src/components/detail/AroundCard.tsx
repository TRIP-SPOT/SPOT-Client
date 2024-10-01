import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Font, CheckBox } from 'design-system';
import { SpotResponse } from '@/apis/queries/spot/useSpotDetailQuery';
import DotMenuIcon from '@/assets/DotMenuIcon';

interface AroundCardProps {
  data: SpotResponse;
  withMenuIcon?: boolean;
  onCardClick: (spot: SpotResponse) => void;
  onMenuClick?: () => void;
  selectedSpots?: SpotResponse[];
  selectionMode?: boolean;
}

export default function AroundCard({
  data,
  withMenuIcon,
  selectedSpots,
  selectionMode,
  onCardClick,
  onMenuClick,
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
        activeOpacity={0.8}
      >
        {selectionMode && (
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
        {withMenuIcon && (
          <TouchableOpacity
            className="absolute top-0 right-0 p-2"
            onPress={onMenuClick}
          >
            <DotMenuIcon />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </ImageBackground>
  );
}
