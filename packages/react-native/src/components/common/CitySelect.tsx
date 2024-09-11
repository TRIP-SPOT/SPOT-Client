import { View } from 'react-native';
import { Font } from 'design-system';
import { Dropdown } from 'react-native-element-dropdown';
import { City, REGION } from '@/constants/CITY';
import { KoreaLocationName } from '@/types/map';

export interface CitySelectValue {
  label: string;
  value: City;
}

interface CitySelectProps {
  region: KoreaLocationName;
  selectedValue?: CitySelectValue;
  handleSelectedChange: (item: CitySelectValue) => void;
}

export default function CitySelect({
  region,
  selectedValue,
  handleSelectedChange,
}: CitySelectProps) {
  const cities = REGION[region];

  return (
    <View>
      <Font type="body2" color="white">
        지역 선택
      </Font>
      <Dropdown
        containerStyle={{
          borderRadius: 6,
        }}
        style={{
          backgroundColor: 'rgba(255,255,255,0.6)',
          borderRadius: 6,
          paddingVertical: 16,
          paddingHorizontal: 14,
          marginTop: 8,
        }}
        placeholder="지역을 선택해주세요"
        placeholderStyle={{
          color: 'white',
        }}
        selectedTextStyle={{
          color: 'white',
        }}
        data={Object.entries(cities).map(([label, value]) => ({
          label,
          value,
        }))}
        valueField="value"
        labelField="label"
        onChange={handleSelectedChange}
        value={selectedValue}
      />
    </View>
  );
}
