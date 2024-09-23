import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface PeriodPatchParams {
  id: number;
  startDate: string;
  endDate: string;
}

export default function useSchedulePeriodMutation() {
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();

  const changePeriod = async ({
    id,
    startDate,
    endDate,
  }: PeriodPatchParams) => {
    await authAxios.patch(`/api/schedule/date/${id}`, {
      startDate,
      endDate,
    });
  };

  return useMutation({
    mutationFn: changePeriod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRIP_PLANS] });
    },
  });
}
