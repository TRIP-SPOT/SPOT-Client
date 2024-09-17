import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface UseNicknameColorMutationReturn {
  postMutate: (color: string) => Promise<void>;
  postLoading: boolean;
  patchMutate: (color: string) => Promise<void>;
  patchLoading: boolean;
}

export default function useNicknameColorMutation() {
  const ref = useRef({} as UseNicknameColorMutationReturn);
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();

  const { mutateAsync: patchMutate, isPending: patchLoading } = useMutation({
    mutationFn: async (color: string) => {
      await authAxios.patch('/api/user/color', {
        colorCode: color,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
    },
  });

  const { mutateAsync: postMutate, isPending: postLoading } = useMutation({
    mutationFn: async (color: string) => {
      await authAxios.post('/api/user/color', {
        colorCode: color,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
    },
  });

  ref.current.postMutate = postMutate;
  ref.current.postLoading = postLoading;

  ref.current.patchMutate = patchMutate;
  ref.current.patchLoading = patchLoading;

  return ref.current;
}
