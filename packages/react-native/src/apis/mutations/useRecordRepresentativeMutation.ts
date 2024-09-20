import { Alert, Platform } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Asset } from 'react-native-image-picker';
import { REGION_MAPPER } from '@/constants/CITY';
import { KoreaLocationName } from '@/types/map';
import { AppStorage } from '@/utils/storage';
import useAuthAxios from '../useAuthAxios';
import { getDateString, normalizeDate } from '@/utils/date';

interface MutationRequestParams {
  region: KoreaLocationName;
  image: Asset;
}

export default function useRecordRepresentativeMutation() {
  const queryClient = useQueryClient();
  const authAxios = useAuthAxios();

  const postRepresentativeImage = async ({
    region,
    image,
  }: MutationRequestParams) => {
    const form = new FormData();
    form.append('region', REGION_MAPPER[region]);
    form.append('image', {
      name: `${getDateString(normalizeDate())}.${image.fileName}`,
      type: image.type,
      uri:
        Platform.OS === 'ios' ? image.uri?.replace('file://', '') : image.uri,
    });

    await authAxios.post('/api/record/representative', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return useMutation({
    mutationFn: async ({ region, image }: MutationRequestParams) => {
      const prevImages = await AppStorage.getData('representImage');
      await AppStorage.saveData({
        key: 'representImage',
        value: {
          ...prevImages,
          [region]: image.uri,
        },
      });
      const enumRegion = REGION_MAPPER[region];
      await postRepresentativeImage({ region, image });
      return {
        region: enumRegion,
        image,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Representative'] });
    },
    onError: () => {
      Alert.alert('대표사진 저장에 실패했어요.', '잠시후에 다시 시도해주세요.');
    },
  });
}
