import { View } from 'react-native';
import { Button, Font } from 'design-system';
import { useNavigation, useRoute } from '@react-navigation/native';
import RecordFormDescription from '@/components/maps/RecordFormDescription';
import RecordFormTitle from '@/components/maps/RecordFormTitle';
import useRecordFormState from '@/hooks/useRecordFormState';
import useRecordMutation from '@/apis/mutations/useRecordMutation';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import RecordFormImages from './RecordFormImages';
import useGallery from '@/hooks/useGallery';

export default function RecordModifyForm() {
  const { validate, title, description, images, resetImages } =
    useRecordFormState();
  const { getPhoto } = useGallery();
  const { patchMutate } = useRecordMutation();
  const { params } = useRoute<StackRouteProps<'Maps/ModifyRecord'>>();
  const navigate = useNavigation<StackNavigation<'Maps/ModifyRecord'>>();

  const handlePressAddPhoto = async () => {
    const photos = await getPhoto(10);
    if (photos && Array.isArray(photos)) resetImages(photos);
  };

  const handlePress = async () => {
    if (!validate()) {
      return;
    }

    await patchMutate({
      name: title,
      description,
      image: images,
    });

    navigate.navigate('Maps/Record', {
      location: params.location,
    });
  };

  return (
    <>
      <View className="gap-4 flex flex-col flex-1 px-4">
        <View>
          <RecordFormTitle />
        </View>
        <View>
          <RecordFormDescription />
        </View>
        <View>
          <RecordFormImages handlePressAddPhoto={handlePressAddPhoto} />
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
