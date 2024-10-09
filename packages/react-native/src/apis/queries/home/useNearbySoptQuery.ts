import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';
import { Location } from '@/hooks/useLocation';
import { ServerResponse } from '@/types/response';
import { MySpotResponse } from '../mypage/useMySpotsQuery';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import { MILLISECONDS } from '@/constants/MILLISECONDS';

export default function useNeearbySpotQuery(location: Location | undefined) {
  const authAxios = useAuthAxios();

  const getNearbySpot = async () => {
    if (!location || !location.latitude || !location.longitude) return [];

    const response = await authAxios.get<ServerResponse<MySpotResponse[]>>(
      `/api/spot/nearby?latitude=${location.latitude}&longitude=${location.longitude}`,
    );

    return response.data.result;
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.NEARBY_SPOT, location],
    queryFn: getNearbySpot,
    staleTime: 10 * MILLISECONDS.ONE_MINUTE,
  });
}
