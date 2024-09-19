import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';

export interface Location {
  latitude?: number;
  longitude?: number;
}

export interface QuizzesResponse {
  id: number;
  title: string;
  location: string;
  region: string;
  image: string;
}

interface ServerQuizzesResponse {
  result: QuizzesResponse[];
}

interface UseQuizzesQueryParams {
  location?: Location;
}

export default function useQuizzesQuery({ location }: UseQuizzesQueryParams) {
  const authAxios = useAuthAxios();

  const getQuizzes = async (locations: Location) => {
    const result = await authAxios.get<ServerQuizzesResponse>(
      `/api/spot?longitude=${locations.longitude}&latitude=${locations.latitude}`,
    );
    return result.data.result;
  };
  return useSuspenseQuery({
    queryKey: ['Quizzes', location],
    queryFn: () => {
      if (!location?.latitude || !location.longitude) {
        return null;
      }

      return getQuizzes(location);
    },
  });
}
