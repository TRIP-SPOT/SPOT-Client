import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';
import { ServerResponse } from '@/types/response';
import { SpotResponse } from '../spot/useSpotDetailQuery';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface UseAroundSpotQueryParams {
  id: number;
  workId: number;
}

interface AroundSpotResponse {
  attraction: SpotResponse[];
  restaurant: SpotResponse[];
  accommodation: SpotResponse[];
}

export default function useAroundSpotQuery({
  id,
  workId,
}: UseAroundSpotQueryParams) {
  const authAxios = useAuthAxios();

  const getAroundSpot = async () => {
    const result = await authAxios.get<ServerResponse<AroundSpotResponse>>(
      `/api/spot/${id}/arounds?workId=${workId}`,
    );
    return result.data.result;
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS, id],
    queryFn: getAroundSpot,
  });
}
