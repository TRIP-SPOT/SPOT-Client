import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import useAuthAxios from '../useAuthAxios';
import { StackNavigation } from '@/types/navigation';

interface AddScheduleProps {
  scheduleId: number;
  name: string;
  description: string;
}

export default function useAddSchedule() {
  const authAxios = useAuthAxios();
  const navigation =
    useNavigation<StackNavigation<'TripPlanner/AddSchedule'>>();

  const addSchedule = async ({
    scheduleId,
    name,
    description,
  }: AddScheduleProps) => {
    const response = await authAxios.post('/api/schedule/location', {
      scheduleId,
      name,
      description,
    });

    return response.data;
  };

  return useMutation({
    mutationFn: addSchedule,
    onSuccess: () => navigation.goBack(),
  });
}
