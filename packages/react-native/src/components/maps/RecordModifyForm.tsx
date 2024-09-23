import { useState } from 'react';
import { View } from 'react-native';
import { Button, Font } from 'design-system';
import { useNavigation, useRoute } from '@react-navigation/native';
import RecordFormDescription from '@/components/maps/RecordFormDescription';
import RecordFormTitle from '@/components/maps/RecordFormTitle';
import useRecordFormState from '@/hooks/useRecordFormState';
import useRecordMutation from '@/apis/mutations/useRecordMutation';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import useGallery from '@/hooks/useGallery';
import RecordFormCitySelect from './RecordFormCitySelect';
import { REGION_MAPPER } from '@/constants/CITY';
import ImageSelect from '../common/ImageSelect';

export default function RecordModifyForm() {
  const {
    validate,
    title,
    description,
    images,
    resetImages,
    selectedCity,
    removeImages,
  } = useRecordFormState();
  const { getPhoto } = useGallery();
  const { params } = useRoute<StackRouteProps<'Maps/ModifyRecord'>>();
  const navigate = useNavigation<StackNavigation<'Maps/ModifyRecord'>>();
  const { patchMutate } = useRecordMutation({ location: params.location });
  const [deleteImages, setDeleteImage] = useState<string[]>([]);

  const handlePressAddPhoto = async () => {
    const photos = await getPhoto({
      selectionLimit: 10,
    });
    if (photos && Array.isArray(photos)) resetImages(photos);
  };

  const handlePress = async () => {
    if (!validate()) {
      return;
    }

    await patchMutate({
      record: {
        name: title,
        description,
        city: selectedCity,
        region: REGION_MAPPER[params.location],
      },
      images,
      deleteImages,
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
          <ImageSelect
            image={images}
            handlePressAddPhoto={handlePressAddPhoto}
            onDelete={(image: string) => {
              removeImages(image);
              setDeleteImage((prev) => [...prev, image]);
            }}
          />
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
