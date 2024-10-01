import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface UseDeleteTripPlanOptions {
  onSuccess?: () => void;
}

export default function useDeleteTripPlan(options?: UseDeleteTripPlanOptions) {
  const queryClient = useQueryClient();
  const authAxios = useAuthAxios();

  const deleteTripPlan = async (id: number) => {
    await authAxios.delete(`/api/schedule/${id}`);
  };

  return useMutation({
    mutationFn: deleteTripPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRIP_PLANS] });
      if (options?.onSuccess) options.onSuccess();
    },
  });
}
