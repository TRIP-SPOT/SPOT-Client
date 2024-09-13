import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';

interface UseNickNameMutationReturn {
  postMutate: (nickname: string) => Promise<void>;
  patchMutate: (nickname: string) => Promise<void>;
}

export default function useNicknameMutation() {
  const ref = useRef({} as UseNickNameMutationReturn);
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();

  const { mutateAsync: postMutate } = useMutation({
    mutationFn: async (nickname: string) => {
      await authAxios.post('api/user/nickname', {
        nickname,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['nickname'] }),
  });

  const { mutateAsync: pathMutate } = useMutation({
    mutationFn: async (nickname: string) => {
      await authAxios.patch('api/user/nickname', {
        nickname,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['nickname'] }),
  });

  ref.current.postMutate = postMutate;
  ref.current.patchMutate = pathMutate;

  return ref.current;
}
