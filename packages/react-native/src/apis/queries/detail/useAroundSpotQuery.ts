import { useSuspenseQuery } from '@tanstack/react-query';
import { City, Region } from '@/constants/CITY';

interface UseAroundSpotQueryParams {
  id: number;
}

export interface AroundSpot {
  id: number;
  spotName: string;
  location: Region;
  image: string;
  city: City;
}

const mockData: AroundSpot[] = [
  {
    id: 1,
    spotName: '어쩌고',
    location: Region.BUSAN,
    city: City.BUSAN,
    image: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
  },
  {
    id: 2,
    spotName: '어쩌고',
    location: Region.BUSAN,
    city: City.BUSAN,
    image: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
  },
  {
    id: 3,
    spotName: '어쩌고',
    location: Region.BUSAN,
    city: City.BUSAN,
    image: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
  },
  {
    id: 4,
    spotName: '어쩌고',
    location: Region.BUSAN,
    city: City.BUSAN,
    image: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
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
