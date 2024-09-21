import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface UseSpotDetailQueryParams {
  id?: number;
}

export interface SpotResponse {
  id: number;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  content: string;
}

const getSpotDetail = async (id?: number) => {
  if (!id) {
    return null;
  }

  const mockData: SpotResponse = {
    id,
    title: '중앙대학교',
    address: '강원 강릉시 주문진읍 해안로 1609',
    latitude: 37.504613225099895,
    longitude: 126.95701199115157,
    content: '중대임',
  };
  return mockData;
};

export default function useSpotDetailQuery({ id }: UseSpotDetailQueryParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.SPOT_DETAIL, id],
    queryFn: () => getSpotDetail(id),
    enabled: Boolean(id),
  });
}
