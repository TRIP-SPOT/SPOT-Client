import QuizLoading from '@components/gamification/QuizLoading';
import QuizSlider from '@components/gamification/QuizSlider';
import withSuspense from '@/components/HOC/withSuspense';
import useQuizzesQuery from '@/apis/queries/quiz/useQuizzesQuery';
import NoQuiz from '@/components/gamification/NoQuiz';
import useLocation from '@/hooks/useLocation';

export default withSuspense(
  function Gamification() {
    const location = useLocation();
    const { data } = useQuizzesQuery(location);

    if (!data || data?.length === 0) {
      return <NoQuiz />;
    }

    return <QuizSlider quizListData={data} />;
  },
  {
    fallback: <QuizLoading />,
  },
);
