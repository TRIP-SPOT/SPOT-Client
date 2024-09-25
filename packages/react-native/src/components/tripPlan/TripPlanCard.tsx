import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import { CheckBox, Font } from 'design-system';
import { TripPlanResponse } from '@/apis/queries/tripPlan/useTripPlansQuery';
import DotMenuIcon from '@/assets/DotMenuIcon';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';

const { width } = Dimensions.get('window');
export const PADDING_X = 16;
export const CARD_GAP = 8;

interface TripPlanCardProps {
  cardData: TripPlanResponse;
  onOptionClick?: (tripPlan: TripPlanResponse) => void;
  onCardClick: () => void;
  isSelectionMode?: boolean;
  isSelect?: boolean;
}

export default function TripPlanCard({
  cardData,
  onOptionClick,
  onCardClick,
  isSelectionMode,
  isSelect,
}: TripPlanCardProps) {
  const { region, city, image: backgroundImage, startDate, endDate } = cardData;

  return (
    <TouchableOpacity onPress={onCardClick}>
      <ImageBackground
        source={{ uri: backgroundImage }}
        className="h-[240px] rounded-lg overflow-hidden"
        style={{
          width: (width - 2 * PADDING_X - CARD_GAP) / 2,
          height: 240,
        }}
      >
        <View className="flex-1 bg-black/20">
          {isSelectionMode ? (
            <View className="p-3">
              <CheckBox selected={isSelect} onPress={onCardClick} />
            </View>
          ) : (
            <View className="flex-row justify-end">
              <TouchableOpacity
                className="p-3"
                onPress={() => onOptionClick && onOptionClick(cardData)}
              >
                <DotMenuIcon />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View className="p-2.5 gap-2 bg-SPOT-black">
          <Font.Bold type="body1" color="white">
            {getDisplayRegion({ locationEnum: region, cityEnum: city })}
          </Font.Bold>
          <Font type="ui-text" color="white">
            {startDate} ~ {endDate}
          </Font>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
