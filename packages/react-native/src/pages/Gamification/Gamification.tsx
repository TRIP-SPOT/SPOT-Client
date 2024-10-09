import QuizLoading from '@components/gamification/QuizLoading';
import QuizSlider from '@components/gamification/QuizSlider';
import withSuspense from '@/components/HOC/withSuspense';
import useQuizzesQuery from '@/apis/queries/quiz/useQuizzesQuery';
import NoQuiz from '@/components/gamification/NoQuiz';

export default withSuspense(
  function Gamification() {
    const { data } = useQuizzesQuery();

    if (!data || data?.length === 0) {
      return <NoQuiz />;
    }

    return <QuizSlider quizListData={data} />;
  },
  {
    fallback: <QuizLoading />,
  },
);
