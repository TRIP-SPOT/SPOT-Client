import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';
import { City, Region } from '@/constants/CITY';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import { ServerResponse } from '@/types/response';

export interface MySpotResponse {
  id: number;
  contentId: number;
  name: string;
  region: Region;
  city: City;
  workId: number;
  workName: string;
  posterUrl: string;
  isLiked: boolean;
  likeCount: number;
}

export default function useMySpotsQuery() {
  const authAxios = useAuthAxios();
  const getMySpots = async () => {
    const result =
      await authAxios.get<ServerResponse<MySpotResponse[]>>('/api/user/likes');
    return result.data.result;
  };

  return useSuspenseQuery({
    queryFn: getMySpots,
    queryKey: [QUERY_KEYS.MY_SPOTS],
  });
}
