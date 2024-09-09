import { useQuery } from '@tanstack/react-query';
import { City, Region } from '@/constants/CITY';

export interface TripPlanResponse {
  id: number;
  location: Region;
  city: City;
  startDate: string;
  endDate: string;
  backgroundImage: string;
}

const mockTripPlans: TripPlanResponse[] = [
  {
    id: 1,
    location: Region.GYEONGBUK,
    city: City.GUMI,
    startDate: '2024-09-09',
    endDate: '2024-09-10',
    backgroundImage:
      'https://t1.daumcdn.net/news/202406/27/poctan/20240627172416746baii.jpg',
  },
  {
    id: 2,
    location: Region.GYEONGBUK,
    city: City.GUMI,
    startDate: '2024-09-10',
    endDate: '2024-09-11',
    backgroundImage:
      'https://mblogthumb-phinf.pstatic.net/MjAyNDA3MDNfNDgg/MDAxNzE5OTY2OTA2MDk2.Oiofq3UscAk6yUzdBjRkPgAgZva8_Vnu75R_z7ywvrgg.5X_5G6xYXGxtPJ1jj5dq0myt_o4BwKrTWCWjDiE-JFEg.JPEG/Screenshot%EF%BC%BF20240703%EF%BC%BF092408%EF%BC%BFInstagram.jpg?type=w800',
  },
  {
    id: 3,
    location: Region.GYEONGBUK,
    city: City.GUMI,
    startDate: '2024-09-10',
    endDate: '2024-09-11',
    backgroundImage:
      'https://mblogthumb-phinf.pstatic.net/MjAyNDA3MDNfNDgg/MDAxNzE5OTY2OTA2MDk2.Oiofq3UscAk6yUzdBjRkPgAgZva8_Vnu75R_z7ywvrgg.5X_5G6xYXGxtPJ1jj5dq0myt_o4BwKrTWCWjDiE-JFEg.JPEG/Screenshot%EF%BC%BF20240703%EF%BC%BF092408%EF%BC%BFInstagram.jpg?type=w800',
  },
  {
    id: 4,
    location: Region.GYEONGBUK,
    city: City.GUMI,
    startDate: '2024-09-10',
    endDate: '2024-09-11',
    backgroundImage:
      'https://mblogthumb-phinf.pstatic.net/MjAyNDA3MDNfNDgg/MDAxNzE5OTY2OTA2MDk2.Oiofq3UscAk6yUzdBjRkPgAgZva8_Vnu75R_z7ywvrgg.5X_5G6xYXGxtPJ1jj5dq0myt_o4BwKrTWCWjDiE-JFEg.JPEG/Screenshot%EF%BC%BF20240703%EF%BC%BF092408%EF%BC%BFInstagram.jpg?type=w800',
  },
];

export default function useTripPlansQuery() {
  return useQuery({
    queryKey: ['tripPlans'],
    queryFn: () => {
      return mockTripPlans;
    },
  });
}
