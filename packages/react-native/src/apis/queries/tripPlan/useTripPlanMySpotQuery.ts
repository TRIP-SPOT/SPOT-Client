import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import { ServerResponse } from '@/types/response';
import { SpotResponse } from '../spot/useSpotDetailQuery';

interface AroundSpotResponse {
  attraction: SpotResponse[];
  restaurant: SpotResponse[];
  accommodation: SpotResponse[];
}

interface UseTripPlanDetailQueryProps {
  id: number;
}

export default function useTripPlanMySpotQuery({
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
