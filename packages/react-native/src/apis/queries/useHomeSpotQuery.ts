import { useQuery } from '@tanstack/react-query';
import { ServerResponse } from '@/types/response';
import useAuthAxios from '../useAuthAxios';
import { SpotCardData } from '@/types/spot';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

export default function useHomeSpotQuery() {
  const authAxios = useAuthAxios();

  const getHomeSpot = async () => {
    const result =
      await authAxios.get<ServerResponse<SpotCardData[]>>('/api/spot/home');

    return result.data.result;
  };

  return useQuery({
    queryKey: [QUERY_KEYS.HOME],
    queryFn: getHomeSpot,
  });
}
