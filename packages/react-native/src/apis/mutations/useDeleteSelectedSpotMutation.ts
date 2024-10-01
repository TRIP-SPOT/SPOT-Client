import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

export default function useDeleteSelectedSpotMutation(
  tripId: number,
  options?: { onSuccess?: () => void },
) {
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();

  const deleteSelectedSpots = async (id: number) => {
    await authAxios.delete(`/api/schedule/selected-spot/${id}`);
  };

  return useMutation({
    mutationFn: deleteSelectedSpots,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TRIP_PLAN_DETAIL, tripId],
      });
      if (options?.onSuccess) options.onSuccess();
    },
  });
}
