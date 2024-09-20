import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';
import { Region } from '@/constants/CITY';
import { ServerResponse } from '@/types/response';

interface UseQuizQueryParams {
  id: number;
}

interface WithoutChoice {
  id: number;
  region: Region;
  question: string;
}
interface ServerRawQuizResponse extends WithoutChoice {
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
}

export interface QuizResponse extends WithoutChoice {
  choices: string[];
}

export default function useQuizQuery({ id }: UseQuizQueryParams) {
  const authAxios = useAuthAxios();
  const getQuiz = async () => {
    const rawResponse = await authAxios.get<
      ServerResponse<ServerRawQuizResponse>
    >(`/api/quiz/${id}`);
    const rawResult = rawResponse.data.result;

    const result = {
      id: rawResult.id,
      question: rawResult.question,
      region: rawResult.region,
      choices: [
        rawResult.choice1,
        rawResult.choice2,
        rawResult.choice3,
        rawResult.choice4,
      ],
    } as QuizResponse;

    return result;
  };

  return useSuspenseQuery({
    queryKey: ['Quiz', id],
    queryFn: getQuiz,
  });
}
