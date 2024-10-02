import { Font } from 'design-system';
import { View, TouchableOpacity } from 'react-native';
import BackIcon from '@/assets/BackIcon';
import { City, Region } from '@/constants/CITY';
import { getDateString } from '@/utils/date';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';

interface EditPlanTitleProps {
  startDate: Date | string;
  endDate: Date | string;
  region: Region;
  city: City;
}

export default function EditPlanTitle({
  startDate,
  endDate,
  region,
  city,
}: EditPlanTitleProps) {
  return (
    <View className="items-center">
      <View
        className="items-center justify-center flex-row"
        style={{ gap: 30 }}
      >
        <View className="items-center">
          <Font.Bold type="title1" color="white">
            {getDisplayRegion({
              locationEnum: region,
              cityEnum: city,
            })}
          </Font.Bold>
          <Font.Light type="body3" color="white">
            {getDateString(startDate, '.')}
            {' - '}
            {getDateString(endDate, '.')}
          </Font.Light>
        </View>
      </View>
    </View>
  );
}
