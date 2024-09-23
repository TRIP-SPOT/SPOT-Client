import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface LikeParams {
  id: number;
}

interface UseSpotLikeMutationReturn {
  like: ({ id }: LikeParams) => Promise<void>;
  isLikePending: boolean;
  cancelLike: ({ id }: LikeParams) => Promise<void>;
  isCancelLikePending: boolean;
}

interface UseSpotLikeMutationParams {
  contentId: number;
}

export default function useSpotLikeMutation({
  contentId,
}: UseSpotLikeMutationParams) {
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();
  const ref = useRef({} as UseSpotLikeMutationReturn);

  const likePost = async ({ id }: LikeParams) => {
    await authAxios.post(`/api/spot/${id}/likes`);
  };

  const likeDelete = async ({ id }: LikeParams) => {
    await authAxios.delete(`/api/spot/${id}/likes`);
  };

  const invalidation = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.DETAIL, contentId],
    });
  };

  const { mutateAsync: like, isPending: isLikePending } = useMutation({
    mutationFn: likePost,
    onSuccess: invalidation,
  });

  const { mutateAsync: cancelLike, isPending: isCancelLikePending } =
    useMutation({
      mutationFn: likeDelete,
      onSuccess: invalidation,
    });

  ref.current.like = like;
  ref.current.isLikePending = isLikePending;
  ref.current.cancelLike = cancelLike;
  ref.current.isCancelLikePending = isCancelLikePending;

  return ref.current;
}
