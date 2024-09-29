import { useSuspenseQuery } from '@tanstack/react-query';
import { City, Region } from '@/constants/CITY';
import useAuthAxios from '@/apis/useAuthAxios';
import { ServerResponse } from '@/types/response';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

export interface Schedule {
  id: number;
  day: number;
  seq: number;
  name: string;
  description: string;
}

interface ScheduleDetail {
  region: Region;
  city: City;
  startDate: string;
  endDate: string;
  locations: Schedule[];
}

export default function useTripPlanEditDetailQuery(id: number) {
  const authAxios = useAuthAxios();

  const getPlanInfo = async () => {
    const response = await authAxios.get<ServerResponse<ScheduleDetail>>(
      `/api/schedule/${id}`,
    );

    return response.data.result;
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.SCHEDULES, id],
    queryFn: getPlanInfo,
  });
}
