import { useState } from 'react';
import { Asset } from 'react-native-image-picker';
import { View } from 'react-native';
import { Button, Font } from 'design-system';
import { useNavigation, useRoute } from '@react-navigation/native';
import RecordFormTitle from './RecordFormTitle';
import RecordFormDatePicker from './RecordFormDatePickers';
import CalendarIcon from '@/assets/CalendarIcon';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import useRecordFormState from '@/hooks/useRecordFormState';
import useGallery from '@/hooks/useGallery';
import useRecordMutation from '@/apis/mutations/useRecordMutation';
import RecordFormDescription from './RecordFormDescription';
import RecordFormImages from './RecordFormImages';
import RecordFormCitySelect from './RecordFormCitySelect';
import { REGION_MAPPER } from '@/constants/CITY';

export default function RecordPostForm() {
  const { description, title, validate, resetImages, selectedCity, date } =
    useRecordFormState();

  const { params } = useRoute<StackRouteProps<'Maps/PostRecord'>>();
  const navigate = useNavigation<StackNavigation<'Maps/Record'>>();
  const [imageAssets, setImageAssets] = useState<Asset[]>();

  const { getPhoto } = useGallery();

  const handlePressAddPhoto = async () => {
    const photos = await getPhoto({
      selectionLimit: 10,
      fullObject: true,
    });

    if (photos && Array.isArray(photos)) {
      const uris = photos
        .filter((photo) => {
          if (typeof photo.uri === 'undefined') return false;
          return true;
        })
        .map((photo) => photo.uri) as string[];

      resetImages(uris);
      setImageAssets(photos);
    }
  };

  const { postMutate } = useRecordMutation({
    location: params.location,
  });

  const handlePress = async () => {
    if (!validate() || !imageAssets) {
      return;
    }

    await postMutate({
      record: {
        title,
        description,
        region: REGION_MAPPER[params.location],
        city: selectedCity?.value,
        startDate: date.start.toISOString().replace('.000Z', ''),
        endDate: date.end.toISOString().replace('.000Z', ''),
      },
      images: imageAssets,
    });

    navigate.navigate('Maps/Record', {
      location: params.location,
    });
  };
  return (
    <>
      <View className="gap-4 flex flex-col flex-1 px-4">
        <View>
          <RecordFormCitySelect />
        </View>

        <View>
          <RecordFormTitle />
        </View>

        <View>
          <Font type="body2" color="white">
            여행 기간
          </Font>
          <View className="bg-Button-gray rounded-md flex flex-row justify-start px-4 py-3.5 items-center mt-2">
            <View className="mr-3">
              <CalendarIcon color="#FF1919" />
            </View>
            <RecordFormDatePicker />
          </View>
        </View>

        <View>
          <RecordFormImages handlePressAddPhoto={handlePressAddPhoto} />
        </View>
        <View>
          <RecordFormDescription />
        </View>
      </View>
      <View className="mt-6">
        <Button disabled={!validate()} onPress={handlePress}>
          <Font type="body2" color="white">
            완료
          </Font>
        </Button>
      </View>
    </>
  );
}
