import { View } from 'react-native';
import { Button, Font } from 'design-system';
import RegionSelect from './RegionSelect';
import useTripPlanFormState from '@/hooks/useTripPlanFormState';
import CitySelect from '../common/CitySelect';
import DateSelect from '../common/DateSelect';
import CalendarIcon from '@/assets/CalendarIcon';
import ImageSelect from '../common/ImageSelect';
import useGallery from '@/hooks/useGallery';
import useAddTripPlan from '@/apis/mutations/useAddTripPlan';
import { getDateString } from '@/utils/date';

export default function TripPlanPostForm() {
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
  const { mutate } = useAddTripPlan();

  const { getPhoto } = useGallery();

  const handleChangeImage = async () => {
    const photo = await getPhoto({ fullObject: true });
    if (!photo) return;

    changeImage(photo);
  };

  const navigateTripPlan = () => {
    if (!region || !selectedCity || !date.start || !date.end || !image) return;

    const planInfo = {
      region: region.value,
      city: selectedCity.value,
      startDate: getDateString(date.start),
      endDate: getDateString(date.end),
    };

    mutate({ planInfo, image });
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
          <ImageSelect
            image={image?.uri}
            handlePressAddPhoto={handleChangeImage}
          />
        </View>
      </View>
      <View>
        <Button disabled={!validate()} onPress={navigateTripPlan}>
          <Font.Bold color="white" type="title1">
            여행 만들기
          </Font.Bold>
        </Button>
      </View>
    </View>
  );
}
