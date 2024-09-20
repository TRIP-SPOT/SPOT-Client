import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { City, Region } from '@/constants/CITY';
import useAuthAxios from '../useAuthAxios';
import { ServerResponse } from '@/types/response';

interface QuizSubmitRequestParams {
  id: number;
  answer: number;
}

export interface QuizSubmitResponse {
  isCorrect: boolean;
  location: Region;
  city: City;
}

interface UseQuizSubmitMutationReturns {
  submitQuiz: ({
    id,
    answer,
  }: QuizSubmitRequestParams) => Promise<QuizSubmitResponse>;
  isSubmitQuizPending: boolean;
}

export default function useQuizSubmitMutation() {
  const ref = useRef({} as UseQuizSubmitMutationReturns);
  const authAxios = useAuthAxios();

  const submitAnswer = async ({ answer, id }: QuizSubmitRequestParams) => {
    const result = await authAxios.post<ServerResponse<QuizSubmitResponse>>(
      `/api/quiz/answer?id=${id}&answer=${answer}`,
    );
    return result.data.result;
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: submitAnswer,
  });

  ref.current.submitQuiz = mutateAsync;
  ref.current.isSubmitQuizPending = isPending;

  return ref.current;
}
