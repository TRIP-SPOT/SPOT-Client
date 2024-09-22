import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

export default function useDeleteTripPlan() {
  const queryClient = useQueryClient();
  const authAxios = useAuthAxios();

  const deleteTripPlan = async (id: number) => {
    const response = await authAxios.delete(`/api/schedule/${id}`);

    return response.data;
  };

  return useMutation({
    mutationFn: deleteTripPlan,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRIP_PLANS] }),
  });
}
