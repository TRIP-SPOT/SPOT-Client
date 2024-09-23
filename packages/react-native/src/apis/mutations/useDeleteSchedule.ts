import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';

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
      await queryClient.refetchQueries({ queryKey: ['editPlan', id] });
      if (options?.onSuccess) options.onSuccess();
    },
  });
}
