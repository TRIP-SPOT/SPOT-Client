import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';

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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['nickname'] }),
  });

  const { mutateAsync: pathMutate, isPending: isPatchLoading } = useMutation({
    mutationFn: async (nickname: string) => {
      await authAxios.patch('api/user/nickname', {
        nickname,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['nickname'] }),
  });

  ref.current.postMutate = postMutate;
  ref.current.isPostLoading = isPostLoading;
  ref.current.patchMutate = pathMutate;
  ref.current.isPatchLoading = isPatchLoading;

  return ref.current;
}