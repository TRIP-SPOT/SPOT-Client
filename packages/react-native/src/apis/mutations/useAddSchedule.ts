import { useMutation } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';

interface AddScheduleProps {
  scheduleId: number;
  name: string;
  description: string;
}

export default function useAddSchedule() {
  const authAxios = useAuthAxios();

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
  });
}
