import { useSuspenseQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import useAuthAxios from '@/apis/useAuthAxios';
import { City, Region } from '@/constants/CITY';
import { ServerResponse } from '@/types/response';

interface DetailResponse {
  contentId: string;
  title: string;
  image: string;
  addr1: string;
  addr2: string;
  region: Region;
  city: City;
  longitude: number;
  latitude: number;
  overview: string;
  isLiked: boolean;
  likeCount: number;
  posterUrl: string;
  contentTypeId: string;
  dist: string;
}

export default function useDetailQuery({
  id,
  workId,
}: {
  id: number;
  workId: number;
}) {
  const authAxios = useAuthAxios();
  const getSpotAroundInfo = async () => {
    const result = await authAxios.get<ServerResponse<DetailResponse>>(
      `/api/spot/${id}?workId=${workId}`,
    );
    return result.data.result;
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.DETAIL, id],
    queryFn: getSpotAroundInfo,
  });
}
