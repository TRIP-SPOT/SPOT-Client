import { useSuspenseQuery } from '@tanstack/react-query';
import { City, Region } from '@/constants/CITY';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import useAuthAxios from '@/apis/useAuthAxios';
import { ServerResponse } from '@/types/response';

export interface TripPlanResponse {
  id: number;
  region: Region;
  city: City;
  startDate: string;
  endDate: string;
  image: string;
}

export default function useTripPlansQuery() {
  const authAxios = useAuthAxios();

  const getTripPlan = async () => {
    const response =
      await authAxios.get<ServerResponse<TripPlanResponse[]>>('/api/schedule');

    return response.data.result;
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.TRIP_PLANS],
    queryFn: getTripPlan,
    staleTime: 0,
  });
}
