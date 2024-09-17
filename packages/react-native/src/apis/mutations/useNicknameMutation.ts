import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface UseNickNameMutationReturn {
  postMutate: (nickname: string) => Promise<void>;
  isPostLoading: boolean;
  patchMutate: (nickname: string) => Promise<void>;
  isPatchLoading: boolean;
}

export default function useNicknameMutation() {
  const ref = useRef({} as UseNickNameMutationReturn);
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();

  const { mutateAsync: postMutate, isPending: isPostLoading } = useMutation({
    mutationFn: async (nickname: string) => {
      await authAxios.post('api/user/nickname', {
        nickname,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] }),
  });

  const { mutateAsync: patchMutate, isPending: isPatchLoading } = useMutation({
    mutationFn: async (nickname: string) => {
      await authAxios.patch('api/user/nickname', {
        nickname,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] }),
  });

  ref.current.postMutate = postMutate;
  ref.current.isPostLoading = isPostLoading;
  ref.current.patchMutate = patchMutate;
  ref.current.isPatchLoading = isPatchLoading;

  return ref.current;
}
