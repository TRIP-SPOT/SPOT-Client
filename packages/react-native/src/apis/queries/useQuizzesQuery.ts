import { useQuery } from '@tanstack/react-query';

export interface Location {
  latitude?: number;
  longitude?: number;
}

export interface QuizzesResponse {
  title: string;
  location: string;
  region: string;
  image: string;
}

interface UseQuizzesQueryParams {
  location?: Location;
}

const mockQuizzes = [
  {
    title: '도깨비',
    location: '주문진 방파제',
    region: '강원도 강릉',
    image:
      'https://t1.daumcdn.net/news/202406/27/poctan/20240627172416746baii.jpg',
  },
  {
    title: '도깨비2',
    location: '주문한 방파제',
    region: '강원도 강릉',
    image:
      'https://t1.daumcdn.net/news/202406/27/poctan/20240627172416746baii.jpg',
  },
] as QuizzesResponse[];

export default function useQuizzesQuery({ location }: UseQuizzesQueryParams) {
  return useQuery({
    queryKey: ['Quizzes', location],
    queryFn: async () => {
      return mockQuizzes;
    },
    enabled: Boolean(location),
  });
}
