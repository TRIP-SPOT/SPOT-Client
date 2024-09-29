import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface ChangeScheduleOrderBody {
  scheduleId: number;
  day: number;
  before: number;
  after: number;
}

export default function useChangeScheduleOrder(tripId: number) {
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();

  const changeScheduleOrder = async ({
    scheduleId,
    day,
    before,
    after,
  }: ChangeScheduleOrderBody) => {
    await authAxios.patch(`api/schedule/location/${scheduleId}`, {
      day,
      before,
      after,
    });
  };

  return useMutation({
    mutationFn: changeScheduleOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SCHEDULES, tripId],
      });
    },
  });
}
