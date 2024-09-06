import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REGION_MAPPER } from '@/constants/CITY';
import { KoreaLocationName } from '@/types/map';
import { AppStorage } from '@/utils/storage';

interface MutationRequestParams {
  region: KoreaLocationName;
  imageUri: string;
}

export default function useRecordRepresentativeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ region, imageUri }: MutationRequestParams) => {
      await AppStorage.saveData({
        key: 'representImage',
        value: {
          [region]: imageUri,
        },
      });

      const enumRegion = REGION_MAPPER[region];
      return {
        region: enumRegion,
        imageUri,
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
