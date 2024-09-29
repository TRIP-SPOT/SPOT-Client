import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface UseDeleteScheduleOptions {
  onSuccess?: () => void;
}

export default function useDeleteSchedule(
  id: number,
  options?: UseDeleteScheduleOptions,
) {
  const authAxios = useAuthAxios();
  const queryClient = useQueryClient();

  const deleteSchedule = async (scheduleIds: number[]) => {
    await authAxios.delete(`/api/schedule/location/${scheduleIds.join(',')}`);
  };

  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SCHEDULES, id],
      });
      if (options?.onSuccess) options.onSuccess();
    },
  });
}
