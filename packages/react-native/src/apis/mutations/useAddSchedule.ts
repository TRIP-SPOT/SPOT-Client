import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import useAuthAxios from '../useAuthAxios';
import { StackNavigation } from '@/types/navigation';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface AddScheduleProps {
  day: number;
  name: string;
  description: string;
}

export default function useAddSchedule(id: number) {
  const queryClient = useQueryClient();
  const authAxios = useAuthAxios();
  const navigation =
    useNavigation<StackNavigation<'TripPlanner/AddSchedule'>>();

  const addSchedule = async ({ day, name, description }: AddScheduleProps) => {
    await authAxios.post('/api/schedule/location', {
      scheduleId: id,
      day,
      name,
      description,
    });
  };

  return useMutation({
    mutationFn: addSchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SCHEDULES, id],
      });
      navigation.goBack();
    },
  });
}
