import { useSuspenseQuery } from '@tanstack/react-query';
import { City, Region } from '@/constants/CITY';
import useAuthAxios from '@/apis/useAuthAxios';
import { ServerResponse } from '@/types/response';
import { SpotResponse } from '../spot/useSpotDetailQuery';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface UseAroundSpotQueryParams {
  id: number;
}

export interface AroundSpot {
  id: number;
  spotName: string;
  location: Region;
  image: string;
  city: City;
}

export default function useAroundSpotQuery({ id }: UseAroundSpotQueryParams) {
  const authAxios = useAuthAxios();

  const getAroundSpot = async () => {
    const result = await authAxios.get<ServerResponse<SpotResponse>>(
      `/api/spot/${id}/arounds`,
    );
    return result.data.result;
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS, id],
    queryFn: getAroundSpot,
  });
}
