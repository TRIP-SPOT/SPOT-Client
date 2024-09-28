import { useSuspenseQuery } from '@tanstack/react-query';
import { City, Region } from '@/constants/CITY';
import useAuthAxios from '../../useAuthAxios';
import { ServerResponse } from '@/types/response';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface UseSearchQueryParams {
  keyword: string;
}

interface SearchResponse {
  id: number;
  contentId: number;
  name: string;
  region: Region;
  city: City;
  workId: number;
  workName: string;
  posterUrl: string;
  quote: string;
  isLiked: boolean;
  likeCount: number;
}

export default function useSearchQuery({ keyword }: UseSearchQueryParams) {
  const authAxios = useAuthAxios();
  const search = async () => {
    const result = await authAxios.get<ServerResponse<SearchResponse[]>>(
      `/api/spot/search?keyword=${keyword}`,
    );

    return result.data.result;
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.SEARCH, keyword],
    queryFn: search,
  });
}
