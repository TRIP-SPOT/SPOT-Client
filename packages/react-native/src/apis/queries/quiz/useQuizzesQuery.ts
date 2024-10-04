import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';
import { City, Region } from '@/constants/CITY';
import { ServerResponse } from '@/types/response';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import { Location } from '@/hooks/useLocation';

export interface QuizzesResponse {
  quizId: number;
  workName: string;
  spotName: string;
  region: Region;
  city: City;
  imageUrl: string;
  filterImage: string;
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
    queryKey: [QUERY_KEYS.QUIZZES, location],
    queryFn: () => {
      if (!location?.latitude || !location.longitude) {
        return null;
      }

      return getQuizzes(location);
    },
  });
}
