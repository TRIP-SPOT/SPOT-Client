import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { City, Region } from '@/constants/CITY';
import { CitySelectValue } from '@/components/common/CitySelect';
import useAuthAxios from '../useAuthAxios';
import { KoreaLocationName } from '@/types/map';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface PostRecordRequest {
  record: {
    title: string;
    description: string;
    region: Region;
    city?: City;
    startDate: string;
    endDate: string;
  };
  images: string[];
}

interface PatchRecordRequest {
  name?: string;
  description?: string;
  region: Region;
  city?: CitySelectValue;
  image?: string[];
}

interface DeleteRecordRequest {
  id: number;
}

interface UseRecordMutationReturn {
  postMutate: (requestParams: PostRecordRequest) => Promise<unknown>;
  patchMutate: (requestParams: PatchRecordRequest) => Promise<unknown>;
  deleteMutate: (requestParams: DeleteRecordRequest) => Promise<unknown>;
  isPostPending: boolean;
  isPatchPending: boolean;
  isDeletePending: boolean;
}

interface UseRecordMutationParams {
  location: KoreaLocationName;
}

export default function useRecordMutation({
  location,
}: UseRecordMutationParams) {
  const ref = useRef({} as UseRecordMutationReturn);
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();

  const invalidateRecords = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.RECORDS, location],
    });
  };

  const { mutateAsync: postMutate, isPending: isPostPending } = useMutation({
    mutationFn: async (requestParams: PostRecordRequest) => {
      return requestParams;
    },
    onSuccess: invalidateRecords,
  });

  const { mutateAsync: patchMutate, isPending: isPatchPending } = useMutation({
    mutationFn: async (requestParams: PatchRecordRequest) => {
      return requestParams;
    },
    onSuccess: invalidateRecords,
  });

  const { mutateAsync: deleteMutate, isPending: isDeletePending } = useMutation(
    {
      mutationFn: async (requestParams: DeleteRecordRequest) => {
        await authAxios.delete(`api/record/${requestParams.id}`);
      },
      onSuccess: invalidateRecords,
    },
  );

  ref.current.postMutate = postMutate;
  ref.current.patchMutate = patchMutate;
  ref.current.deleteMutate = deleteMutate;
  ref.current.isPostPending = isPostPending;
  ref.current.isPatchPending = isPatchPending;
  ref.current.isDeletePending = isDeletePending;

  return ref.current;
}
