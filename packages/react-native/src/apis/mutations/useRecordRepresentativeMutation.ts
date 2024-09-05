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
  });
}
