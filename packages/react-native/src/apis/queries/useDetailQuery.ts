import { useSuspenseQuery } from '@tanstack/react-query';
import { SpotAroundData } from '@/types/spot';

const mockData: SpotAroundData = {
  id: 1,
  name: '주문진 방파제',
  location: '강원 강릉',
  title: '관광지 정보',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  backgroundImage:
    'https://i.namu.wiki/i/rPbIK73UvaZkqrOVZ2XUs2bqFr8krBAeJRDZIu9dy_2lNEVv2A8ukPsMT2WCQg0mcAIKmVqw7YhdXMek2BUPLUu7pBrT9RRwvnfMRzwLxUL3k7Amfo44GQWagFtAIRfbVPWuGDAHTBDOWN5asD7o7A.webp',
  address: '강원 강릉시 주문진읍 해안로 1609',
};

export default function useDetailQuery(id: number) {
  const getSpotAroundInfo = async () => {
    // TODO: 실제 데이터 요청 추가

    return mockData;
  };

  return useSuspenseQuery({
    queryKey: ['detail', id],
    queryFn: getSpotAroundInfo,
  });
}
