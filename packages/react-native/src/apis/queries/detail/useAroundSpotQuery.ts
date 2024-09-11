import { useSuspenseQuery } from '@tanstack/react-query';

interface UseAroundSpotQueryParams {
  id: number;
}

export interface AroundSpot {
  id: number;
  title: string;
  backgroundImage: string;
}

const mockData: AroundSpot[] = [
  {
    id: 1,
    title: '관광지 정보1',
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
  },
  {
    id: 2,
    title: '관광지 정보2',
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
  },
  {
    id: 3,
    title: '관광지 정보3',
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
  },
  {
    id: 4,
    title: '관광지 정보4',
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
  },
];

const getAroundSpot = async () => {
  return {
    attractions: mockData,
    restaurants: mockData.map((data) => ({ ...data, id: data.id + 4 })),
  };
};

export default function useAroundSpotQuery({ id }: UseAroundSpotQueryParams) {
  return useSuspenseQuery({
    queryKey: ['aroundSpot', id],
    queryFn: getAroundSpot,
  });
}
