import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';
import { City, Region } from '@/constants/CITY';
import { ServerResponse } from '@/types/response';

export interface Location {
  latitude?: number;
  longitude?: number;
}

export interface QuizzesResponse {
  quizId: number;
  workName: string;
  spotName: string;
  region: Region;
  city: City;
  image: string;
}

interface UseQuizzesQueryParams {
  location?: Location;
}

export default function useQuizzesQuery({ location }: UseQuizzesQueryParams) {
  const authAxios = useAuthAxios();

  const getQuizzes = async (locations: Location) => {
    const result = await authAxios.get<ServerResponse<QuizzesResponse[]>>(
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
