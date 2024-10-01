import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { City, Region } from '@/constants/CITY';
import useAuthAxios from '../useAuthAxios';
import { ServerResponse } from '@/types/response';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface QuizSubmitRequestParams {
  id: number;
  answer: number;
}

export interface QuizSubmitResponse {
  correct: boolean;
  region: Region;
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
  const queryClient = useQueryClient();

  const submitAnswer = async ({ answer, id }: QuizSubmitRequestParams) => {
    const result = await authAxios.post<ServerResponse<QuizSubmitResponse>>(
      `/api/quiz/answer?id=${id}&answer=${answer}`,
    );
    return result.data.result;
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: submitAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_BADGES] });
    },
  });

  ref.current.submitQuiz = mutateAsync;
  ref.current.isSubmitQuizPending = isPending;

  return ref.current;
}
