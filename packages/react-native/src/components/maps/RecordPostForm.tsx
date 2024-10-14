import { useState } from 'react';
import { Asset } from 'react-native-image-picker';
import { Alert, View } from 'react-native';
import { Button, Font } from 'design-system';
import { useRoute } from '@react-navigation/native';
import RecordFormTitle from './RecordFormTitle';
import RecordFormDatePicker from './RecordFormDatePickers';
import CalendarIcon from '@/assets/CalendarIcon';
import { StackRouteProps } from '@/types/navigation';
import useRecordFormState from '@/hooks/useRecordFormState';
import useGallery from '@/hooks/useGallery';
import useRecordMutation from '@/apis/mutations/useRecordMutation';
import RecordFormDescription from './RecordFormDescription';
import RecordFormCitySelect from './RecordFormCitySelect';
import { Region, REGION_MAPPER } from '@/constants/CITY';
import ImageSelect from '../common/ImageSelect';
import MutationLoadingModal from '../common/MutationLoadingModal';

interface RecordPostFormProps {
  setRecordModalInfo: React.Dispatch<React.SetStateAction<Region | undefined>>;
}

export default function RecordPostForm({
  setRecordModalInfo,
}: RecordPostFormProps) {
  const {
    description,
    title,
    validate,
    resetImages,
    selectedCity,
    date,
    images,
    removeImages,
  } = useRecordFormState();

  const { params } = useRoute<StackRouteProps<'Maps/PostRecord'>>();
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

  const { postMutate, isPostPending } = useRecordMutation({
    location: params.location,
  });

  const handlePress = async () => {
    if (!validate() || !imageAssets) {
      return;
    }

    if (!date.start) {
      Alert.alert('시작 날짜를 선택해주세요.');
      return;
    }

    if (!date.end) {
      Alert.alert('끝 날짜를 선택해주세요.');
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

    setRecordModalInfo(REGION_MAPPER[params.location]);
  };
  return (
    <>
      <View className="gap-4 flex flex-col flex-1 px-4">
        <MutationLoadingModal isSubmiting={isPostPending} />
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
          <ImageSelect
            image={images}
            handlePressAddPhoto={handlePressAddPhoto}
            onDelete={(image: string) => {
              removeImages(image);
              setImageAssets((prev) =>
                prev?.filter((asset) => asset.uri !== image),
              );
            }}
          />
        </View>
        <View>
          <RecordFormDescription />
        </View>
      </View>
      <View className="mt-6 px-4">
        <Button disabled={!validate()} onPress={handlePress}>
          <Font type="body2" color="white">
            완료
          </Font>
        </Button>
      </View>
    </>
  );
}
