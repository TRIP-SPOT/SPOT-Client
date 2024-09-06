import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Font } from 'design-system';
import { Dropdown } from 'react-native-element-dropdown';
import { REGION } from '@/constants/CITY';
import useRecordFormState from '@/hooks/useRecordFormState';
import { StackRouteProps } from '@/types/navigation';

export default function RecordFormCitySelect() {
  const { params } =
    useRoute<StackRouteProps<'Maps/PostRecord' | 'Maps/ModifyRecord'>>();
  const cities = REGION[params.location];
  const { selectedCity, handleSelectChange } = useRecordFormState();

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
        onChange={handleSelectChange}
        value={selectedCity}
      />
    </View>
  );
}
