import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import useAuthAxios from '@/apis/useAuthAxios';
import { ServerResponse } from '@/types/response';
import removeHTMLTag from '@/utils/removeHTMLTag';

interface UseSpotDetailQueryParams {
  id?: number;
}

export interface SpotResponse {
  contentId: number;
  title: string;
  image: string;
  addr1: string;
  addr2: string;
  latitude: number;
  longitude: number;
  overview: string;
  contentTypeId: string;
  dist: string;
}

export default function useSpotDetailQuery({ id }: UseSpotDetailQueryParams) {
  const authAxios = useAuthAxios();

  const getSpotDetail = async (spotId?: number) => {
    if (!spotId) {
      return null;
    }

    const result = await authAxios.get<ServerResponse<SpotResponse>>(
      `/api/around/${spotId}`,
    );
    const originOverview = result.data.result.overview;
    result.data.result.overview = removeHTMLTag(originOverview);

    return result.data.result;
  };

  return useQuery({
    queryKey: [QUERY_KEYS.SPOT_DETAIL, id],
    queryFn: () => getSpotDetail(id),
    enabled: Boolean(id),
  });
}
