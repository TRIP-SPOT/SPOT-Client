import { useSuspenseQuery } from '@tanstack/react-query';
import { City, Region } from '@/constants/CITY';

const mockData = {
  region: Region.GANGWON,
  city: City.GANGNEUNG,
  startDate: '2024-09-08T12:30:00',
  endDate: '2024-09-11T12:30:00',
  schedules: [
    {
      id: 1,
      day: 1,
      order: 1,
      name: '주문진 방파제',
      description: '도깨비 촬영지',
    },
    {
      id: 2,
      day: 1,
      order: 2,
      name: '주문진 스타벅스',
      description: '도깨비 촬영지 도보 10분 카페',
    },
    {
      id: 3,
      day: 2,
      order: 1,
      name: '주문진 스타벅스',
      description: '도깨비 촬영지 도보 10분 카페',
    },
    {
      id: 4,
      day: 4,
      order: 1,
      name: '주문진 스타벅스',
      description: '도깨비 촬영지 도보 10분 카페',
    },
  ],
};

export default function useTripPlanEditDetailQuery(id: number) {
  const getPlanInfo = () => {
    // TODO: 실제 API 연결
    return mockData;
  };

  return useSuspenseQuery({
    queryKey: ['editPlan', id],
    queryFn: getPlanInfo,
  });
}
