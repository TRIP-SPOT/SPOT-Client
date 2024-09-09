import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { City, Region } from '@/constants/CITY';

interface QuizSubmitRequestParams {
  answer: string;
}

export interface QuizSubmitResponse {
  isCorrect: boolean;
  location: Region;
  city: City;
}

interface UseQuizSubmitMutationReturns {
  submitQuiz: ({
    answer,
  }: QuizSubmitRequestParams) => Promise<QuizSubmitResponse>;
}

export default function useQuizSubmitMutation() {
  const ref = useRef({} as UseQuizSubmitMutationReturns);
  const { mutateAsync } = useMutation({
    mutationFn: async ({ answer }: QuizSubmitRequestParams) => {
      return {
        isCorrect: Boolean(answer),
        location: Region.BUSAN,
        city: City.BUSAN,
      };
    },
  });

  ref.current.submitQuiz = mutateAsync;

  return ref.current;
}
