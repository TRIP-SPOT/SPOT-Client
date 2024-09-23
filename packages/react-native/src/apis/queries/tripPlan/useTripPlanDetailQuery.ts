import { useSuspenseQuery } from '@tanstack/react-query';
import { City, Region } from '@/constants/CITY';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import useAuthAxios from '@/apis/useAuthAxios';
import { SpotResponse } from '../spot/useSpotDetailQuery';
import { ServerResponse } from '@/types/response';

export interface AroundSpot {
  id: number;
  spotName: string;
  location: Region;
  image: string;
  city: City;
}

interface AroundSpotResponse {
  attraction: SpotResponse[];
  restaurant: SpotResponse[];
  accommodation: SpotResponse[];
}

interface UseTripPlanDetailQueryProps {
  id: number;
}

export default function useTripPlanDetailQuery({
  id,
}: UseTripPlanDetailQueryProps) {
  const authAxios = useAuthAxios();

  const getTripPlanDetail = async () => {
    const response = await authAxios.get<ServerResponse<AroundSpotResponse>>(
      `/api/schedule/selected-spot/${id}`,
    );

    return response.data.result;
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.TRIP_PLAN_DETAIL, id],
    queryFn: getTripPlanDetail,
    staleTime: 0,
  });
}
