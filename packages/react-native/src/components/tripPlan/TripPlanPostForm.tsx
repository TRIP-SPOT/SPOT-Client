import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Font } from 'design-system';
import RegionSelect from './RegionSelect';
import useTripPlanFormState from '@/hooks/useTripPlanFormState';
import CitySelect from '../common/CitySelect';
import DateSelect from '../common/DateSelect';
import CalendarIcon from '@/assets/CalendarIcon';
import ImageSelect from '../common/ImageSelect';
import useGallery from '@/hooks/useGallery';
import { StackNavigation } from '@/types/navigation';

export default function TripPlanPostForm() {
  const navigate = useNavigation<StackNavigation<'TripPlanner/Post'>>();
  const {
    image,
    changeImage,
    region,
    selectedCity,
    handleSelectCityChange,
    date,
    setDate,
    validate,
  } = useTripPlanFormState();

  const { getPhoto } = useGallery();

  const handleChangeImage = async () => {
    const photo = (await getPhoto()) as string;
    changeImage(photo);
  };

  const navigateTripPlan = () => {
    if (validate()) {
      navigate.navigate('TripPlanner/Main');
    }
  };

  return (
    <View className="flex flex-col flex-1 p-4 justify-between">
      <View className="flex flex-col gap-4">
        <View>
          <RegionSelect />
        </View>
        {region && (
          <View>
            <CitySelect
              region={region.label}
              selectedValue={selectedCity}
              handleSelectedChange={handleSelectCityChange}
            />
          </View>
        )}
        <View>
          <Font type="body2" color="white">
            여행 기간
          </Font>
          <View className="bg-Button-gray rounded-md flex flex-row justify-start px-4 py-3.5 items-center mt-2">
            <View className="mr-3">
              <CalendarIcon color="#FF1919" />
            </View>
            <DateSelect date={date} setDate={setDate} />
          </View>
        </View>
        <View>
          <ImageSelect image={image} handlePressAddPhoto={handleChangeImage} />
        </View>
      </View>
      <View className="px-4">
        <Button disabled={!validate()} onPress={navigateTripPlan}>
          <Font.Bold color="white" type="title1">
            여행 만들기
          </Font.Bold>
        </Button>
      </View>
    </View>
  );
}
