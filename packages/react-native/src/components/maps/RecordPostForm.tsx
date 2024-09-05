import { Button, Font } from 'design-system';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RecordFormTitle from './RecordFormTitle';
import RecordFormDatePicker from './RecordFormDatePickers';
import Calendar from '@/assets/Calendar';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import useRecordFormState from '@/hooks/useRecordFormState';
import useGallery from '@/hooks/useGallery';
import useRecordMutation from '@/apis/mutations/useRecordMutation';
import RecordFormDescription from './RecordFormDescription';
import RecordFormImages from './RecordFormImages';
import RecordFormCitySelect from './RecordFormCitySelect';

export default function RecordPostForm() {
  const { description, title, validate, images, resetImages } =
    useRecordFormState();
  const { params } = useRoute<StackRouteProps<'Maps/PostRecord'>>();
  const navigate = useNavigation<StackNavigation<'Maps/Record'>>();

  const { getPhoto } = useGallery();

  const handlePressAddPhoto = async () => {
    const photos = await getPhoto(10);
    if (photos && Array.isArray(photos)) resetImages(photos);
  };

  const { postMutate } = useRecordMutation();

  const handlePress = async () => {
    if (!validate()) {
      return;
    }

    await postMutate({
      record: {
        name: title,
        description,
        region: params.location,
      },
      images,
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
          <View className="bg-SPOT-white/60 rounded-md flex flex-row justify-start px-4 py-3.5 items-center mt-2">
            <View className="mr-3">
              <Calendar color="white" />
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
