import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import { Font } from 'design-system';
import { TripPlanResponse } from '@/apis/queries/tripPlan/useTripPlansQuery';
import DotMenuIcon from '@/assets/DotMenuIcon';
import { REGION, REVERSE_REGION_MAPPER } from '@/constants/CITY';

const { width } = Dimensions.get('window');
export const PADDING_X = 16;
export const CARD_GAP = 8;

interface TripPlanCardProps {
  cardData: TripPlanResponse;
  onOptionClick: (id: number) => void;
  onCardClick: () => void;
}

export default function TripPlanCard({
  cardData,
  onOptionClick,
  onCardClick,
}: TripPlanCardProps) {
  const { location, city, backgroundImage, startDate, endDate } = cardData;
  const locationName = REVERSE_REGION_MAPPER[location];
  const cityName = Object.entries(REGION[locationName]).find((entry) => {
    return entry[1] === city;
  })?.[0];

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
        <View className="flex-1 justify-between px-3 py-1.5 bg-black/20">
          <TouchableOpacity
            className="flex items-end w-full"
            onPress={() => onOptionClick(cardData.id)}
          >
            <DotMenuIcon />
          </TouchableOpacity>
          <View className="p-2.5 gap-2">
            <Font.Bold type="body1" color="white">
              {locationName} {cityName}
            </Font.Bold>
            <Font type="ui-text" color="white">
              {startDate} ~ {endDate}
            </Font>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
