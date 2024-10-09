import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';
import useLocation from '@/hooks/useLocation';
import { ServerResponse } from '@/types/response';
import { MySpotResponse } from '../mypage/useMySpotsQuery';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import { MILLISECONDS } from '@/constants/MILLISECONDS';

export default function useNeearbySpotQuery() {
  const authAxios = useAuthAxios();
  const location = useLocation();

  const getNearbySpot = async () => {
    const res = await location;
    if (!res || !res.latitude || !res.longitude) return [];

    const response = await authAxios.get<ServerResponse<MySpotResponse[]>>(
      `/api/spot/nearby?latitude=${res.latitude}&longitude=${res.longitude}`,
    );

    return response.data.result;
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.NEARBY_SPOT, location],
    queryFn: getNearbySpot,
    staleTime: 10 * MILLISECONDS.ONE_MINUTE,
  });
}
