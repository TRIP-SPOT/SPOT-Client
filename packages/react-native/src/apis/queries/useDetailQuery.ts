import { useSuspenseQuery } from '@tanstack/react-query';
import { SpotAroundData } from '@/types/spot';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

const mockData: SpotAroundData = {
  id: 1,
  name: '주문진 방파제',
  location: '강원 강릉',
  title: '관광지 정보',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
  address: '강원 강릉시 주문진읍 해안로 1609',
};

export default function useDetailQuery(id: number) {
  const getSpotAroundInfo = async () => {
    // TODO: 실제 데이터 요청 추가

    return mockData;
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.DETAIL, id],
    queryFn: getSpotAroundInfo,
  });
}
