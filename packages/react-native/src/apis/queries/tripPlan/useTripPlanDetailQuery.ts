import { useSuspenseQuery } from '@tanstack/react-query';
import { TripPlanResponse } from './useTripPlansQuery';
import { City, Region } from '@/constants/CITY';
import { AroundSpot } from '../detail/useAroundSpotQuery';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface UseTripPlanDetailQueryProps {
  id: number;
}

interface TripDetailResponse extends TripPlanResponse {
  mySpots: AroundSpot[];
  restaurants: AroundSpot[];
  hotels: AroundSpot[];
  attractions: AroundSpot[];
}

const getTrip = async () => {
  return {
    id: 3,
    location: Region.BUSAN,
    city: City.BUSAN,
    startDate: '2024-09-12',
    endDate: '2024-09-13',
    backgroundImage:
      'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202406/20/starfashion/20240620094035441whlh.jpg',
    mySpots: [
      {
        id: 1,
        spotName: '주문진 방파제',
        image:
          'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202406/20/starfashion/20240620094035441whlh.jpg',
        location: Region.BUSAN,
        city: City.BUSAN,
      },
    ],
    restaurants: [
      {
        id: 2,
        spotName: '주문진 레스토랑',
        image:
          'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202406/20/starfashion/20240620094035441whlh.jpg',
        location: Region.BUSAN,
        city: City.BUSAN,
      },
      {
        id: 3,
        spotName: '주문진 레스토랑',
        image:
          'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202406/20/starfashion/20240620094035441whlh.jpg',
        location: Region.BUSAN,
        city: City.BUSAN,
      },
    ],
    hotels: [
      {
        id: 12,
        spotName: '주문진 숙소',
        image:
          'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202406/20/starfashion/20240620094035441whlh.jpg',
        location: Region.BUSAN,
        city: City.BUSAN,
      },
    ],
    attractions: [
      {
        id: 13,
        spotName: '주문진 명소',
        image:
          'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202406/20/starfashion/20240620094035441whlh.jpg',
        location: Region.BUSAN,
        city: City.BUSAN,
      },
    ],
  } as TripDetailResponse;
};

export default function useTripPlanDetailQuery({
  id,
}: UseTripPlanDetailQueryProps) {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.TRIP_PLAN_DETAIL, id],
    queryFn: async () => {
      const result = await getTrip();
      return result;
    },
  });
}
