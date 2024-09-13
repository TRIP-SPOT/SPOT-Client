import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';

interface UseNicknameColorMutationReturn {
  postMutate: (color: string) => Promise<void>;
  patchMutate: (color: string) => Promise<void>;
}

export default function useNicknameColorMutation() {
  const ref = useRef({} as UseNicknameColorMutationReturn);
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();

  const { mutateAsync: patchMutate } = useMutation({
    mutationFn: async (color: string) => {
      await authAxios.patch('/api/user/color', {
        colorCode: color,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nickname'] });
    },
  });

  const { mutateAsync: postMutate } = useMutation({
    mutationFn: async (color: string) => {
      await authAxios.post('/api/user/color', {
        colorCode: color,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nickname'] });
    },
  });

  ref.current.postMutate = postMutate;
  ref.current.patchMutate = patchMutate;

  return ref.current;
}
