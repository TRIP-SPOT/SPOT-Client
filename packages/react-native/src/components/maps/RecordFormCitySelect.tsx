import { useRoute } from '@react-navigation/native';
import useRecordFormState from '@/hooks/useRecordFormState';
import { StackRouteProps } from '@/types/navigation';
import CitySelect from '../common/CitySelect';

export default function RecordFormCitySelect() {
  const { params } =
    useRoute<StackRouteProps<'Maps/PostRecord' | 'Maps/ModifyRecord'>>();
  const { selectedCity, handleSelectChange } = useRecordFormState();

  return (
    <CitySelect
      region={params.location}
      selectedValue={selectedCity}
      handleSelectedChange={handleSelectChange}
    />
  );
}
