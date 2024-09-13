import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import { Font } from 'design-system';
import { useNavigation } from '@react-navigation/native';
import DotMenuIcon from '@/assets/DotMenuIcon';
import { StackNavigation } from '@/types/navigation';
import { RecordResponse } from '@/apis/queries/records/useRecordsQuery';
import { REVERSE_REGION_MAPPER } from '@/constants/CITY';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';

interface CardProps {
  data: RecordResponse;
  handleClickCard: () => void;
}

const { width } = Dimensions.get('window');
export const LOG_PADDING_X = 16;
export const CARD_GAP = 8;

export default function RecordCard({ data, handleClickCard }: CardProps) {
  const { id, title, location, city, startDate, endDate, imageUrl } = data;
  const navigation = useNavigation<StackNavigation<'Maps/Record'>>();
  const locationName = REVERSE_REGION_MAPPER[location];

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Maps/RecordDetail', {
          recordId: id,
          location: locationName,
        })
      }
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        className="h-[240px] rounded-lg overflow-hidden"
        style={{
          width: (width - 2 * LOG_PADDING_X - CARD_GAP) / 2,
          height: 240,
        }}
      >
        <View className="flex-1 justify-between px-3 py-1.5 bg-black/20">
          <TouchableOpacity
            className="flex items-end w-full"
            onPress={handleClickCard}
          >
            <DotMenuIcon />
          </TouchableOpacity>
          <View className="p-2.5 gap-2">
            <Font.Bold type="body1" color="white">
              {title}
            </Font.Bold>
            <Font.Light type="body1" color="white">
              {getDisplayRegion({
                locationEnum: location,
                cityEnum: city,
                onlyCity: true,
              })}
            </Font.Light>
            <Font.Light type="body1" color="white">
              {startDate} ~ {endDate}
            </Font.Light>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
