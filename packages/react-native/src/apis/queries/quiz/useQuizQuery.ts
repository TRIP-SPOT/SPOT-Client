import { useSuspenseQuery } from '@tanstack/react-query';

interface UseQuizQueryParams {
  id: number;
}

export interface QuizResponse {
  title: string;
  question: string;
  description: string;
  choices: string[];
}

const mockQuiz: QuizResponse = {
  title: '도깨비',
  question: '도깨비 팬티는?',
  description: '동요가 어쩌고 저쩌고...',
  choices: ['튼튼해요', '질기고요', '호랑이 가죽으로 만들었어요', '더러워요'],
};

export default function useQuizQuery({ id }: UseQuizQueryParams) {
  return useSuspenseQuery({
    queryKey: ['Quiz', id],
    queryFn: () => {
      return mockQuiz;
    },
  });
}
