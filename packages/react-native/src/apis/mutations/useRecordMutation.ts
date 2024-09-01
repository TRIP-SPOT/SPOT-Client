import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';

interface PostRecordRequest {
  record: {
    name: string;
    description: string;
    region: string;
  };
  images: string[];
}

interface PatchRecordRequest {
  name?: string;
  description?: string;
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

export default function useRecordMutation() {
  const ref = useRef({} as UseRecordMutationReturn);

  const { mutateAsync: postMutate, isPending: isPostPending } = useMutation({
    mutationFn: async (requestParams: PostRecordRequest) => {
      return requestParams;
    },
  });

  const { mutateAsync: patchMutate, isPending: isPatchPending } = useMutation({
    mutationFn: async (requestParams: PatchRecordRequest) => {
      return requestParams;
    },
  });

  const { mutateAsync: deleteMutate, isPending: isDeletePending } = useMutation(
    {
      mutationFn: async (requestParams: DeleteRecordRequest) => {
        return requestParams;
      },
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
