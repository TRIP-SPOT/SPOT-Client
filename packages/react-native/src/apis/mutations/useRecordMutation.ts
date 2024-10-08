import { useRef } from 'react';
import { Asset } from 'react-native-image-picker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { City, Region } from '@/constants/CITY';
import useAuthAxios from '../useAuthAxios';
import { KoreaLocationName } from '@/types/map';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import CustomForm from '@/utils/CustomForm';

interface PostRecordRequest {
  record: {
    title: string;
    description: string;
    region: Region;
    city?: City;
    startDate: string;
    endDate: string;
  };
  images: Asset[];
}

interface PatchRecordRequest {
  id: number;
  record: {
    name?: string;
    description?: string;
    region: Region;
    city?: City;
  };
  addImages?: Asset[];
  deleteImages?: string[];
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
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.MY_BADGES],
    });
  };

  const { mutateAsync: postMutate, isPending: isPostPending } = useMutation({
    mutationFn: async (requestParams: PostRecordRequest) => {
      const customForm = new CustomForm();

      Object.entries(requestParams.record).forEach(([key, value]) => {
        customForm.append(key, value);
      });

      requestParams.images.forEach((image) => {
        customForm.appendImage('images', image);
      });

      await authAxios.post('/api/record', customForm.getForm(), {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: invalidateRecords,
  });

  const { mutateAsync: patchMutate, isPending: isPatchPending } = useMutation({
    mutationFn: async (requestParams: PatchRecordRequest) => {
      const customForm = new CustomForm();

      customForm.append('title', requestParams.record.name);
      customForm.append('description', requestParams.record.description);
      customForm.append('deleteImages', requestParams.deleteImages);

      requestParams.addImages?.forEach((image) => {
        customForm.appendImage('addImages', image);
      });

      await authAxios.patch(
        `/api/record/${requestParams.id}`,
        customForm.getForm(),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
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
