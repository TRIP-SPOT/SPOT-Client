import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';
import { City, Region } from '@/constants/CITY';
import { ServerResponse } from '@/types/response';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import useLocation from '@/hooks/useLocation';

export interface QuizzesResponse {
  quizId: number;
  workName: string;
  spotName: string;
  region: Region;
  city: City;
  imageUrl: string;
  filterImage: string;
}

export default function useQuizzesQuery() {
  const authAxios = useAuthAxios();
  const location = useLocation();

  const getQuizzes = async () => {
    const res = await location;
    if (!res || !res.latitude || !res.longitude) return [];

    const result = await authAxios.get<ServerResponse<QuizzesResponse[]>>(
      `/api/spot?longitude=${res.longitude}&latitude=${res.latitude}`,
    );

    return result.data.result;
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.QUIZZES, location],
    queryFn: getQuizzes,
  });
}
