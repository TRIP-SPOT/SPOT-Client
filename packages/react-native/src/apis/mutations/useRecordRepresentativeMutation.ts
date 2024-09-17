import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Asset } from 'react-native-image-picker';
import { REGION_MAPPER } from '@/constants/CITY';
import { KoreaLocationName } from '@/types/map';
import { AppStorage } from '@/utils/storage';
import useAuthAxios from '../useAuthAxios';
import CustomForm from '@/utils/CustomForm';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface MutationRequestParams {
  region: KoreaLocationName;
  image: Asset;
}

export default function useRecordRepresentativeMutation() {
  const queryClient = useQueryClient();
  const authAxios = useAuthAxios();

  const requestRepresentativeImage = async ({
    region,
    image,
  }: MutationRequestParams) => {
    const prevImages = await AppStorage.getData('representImage');
    const isAlreadyExist = prevImages && prevImages[region];

    const requestFunction = isAlreadyExist ? authAxios.patch : authAxios.post;

    const customForm = new CustomForm();
    customForm.append('region', REGION_MAPPER[region]);
    customForm.appendImage('image', image);

    await requestFunction('/api/record/representative', customForm.getForm(), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return useMutation({
    mutationFn: requestRepresentativeImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REPERSENT_IMAGE] });
    },
    onError: () => {
      Alert.alert('대표사진 저장에 실패했어요.', '잠시후에 다시 시도해주세요.');
    },
  });
}
