import { View } from 'react-native';
import { Font } from 'design-system';
import { Dropdown } from 'react-native-element-dropdown';
import { Region, REGION_MAPPER } from '@/constants/CITY';
import useTripPlanFormState from '@/hooks/useTripPlanFormState';
import { KoreaLocationName } from '@/types/map';

export type RegionSelectType = {
  label: KoreaLocationName;
  value: Region;
};

export default function RegionSelect() {
  const { region, setRegion } = useTripPlanFormState();
  return (
    <View>
      <Font type="body2" color="white">
        도/특별시/광역시
      </Font>
      <Dropdown
        containerStyle={{
          borderRadius: 6,
        }}
        style={{
          backgroundColor: '#4C4C4C',
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
        itemTextStyle={{
          color: 'black',
        }}
        data={Object.entries(REGION_MAPPER).map(([label, value]) => ({
          label: label as KoreaLocationName,
          value,
        }))}
        valueField="value"
        labelField="label"
        onChange={setRegion}
        value={region}
      />
    </View>
  );
}
