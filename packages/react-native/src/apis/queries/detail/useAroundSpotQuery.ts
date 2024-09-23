import { useSuspenseQuery } from '@tanstack/react-query';
import { City, Region } from '@/constants/CITY';
import useAuthAxios from '@/apis/useAuthAxios';
import { ServerResponse } from '@/types/response';
import { SpotResponse } from '../spot/useSpotDetailQuery';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface UseAroundSpotQueryParams {
  id: number;
}

interface AroundSpotResponse {
  attraction: SpotResponse[];
  restaurant: SpotResponse[];
  accomodation: SpotResponse[];
}

export default function useAroundSpotQuery({ id }: UseAroundSpotQueryParams) {
  const authAxios = useAuthAxios();

  const getAroundSpot = async () => {
    const result = await authAxios.get<ServerResponse<AroundSpotResponse>>(
      `/api/spot/${id}/arounds`,
    );
    return result.data.result;
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS, id],
    queryFn: getAroundSpot,
  });
}
