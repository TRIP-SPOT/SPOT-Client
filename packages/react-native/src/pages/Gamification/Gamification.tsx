import { useEffect, useState } from 'react';
import QuizLoading from '@components/gamification/QuizLoading';
import QuizSlider from '@components/gamification/QuizSlider';
import withSuspense from '@/components/HOC/withSuspense';
import useGeolocation from '@/hooks/useGeolocation';
import useQuizzesQuery, { Location } from '@/apis/queries/quiz/useQuizzesQuery';
import NoQuiz from '@/components/gamification/NoQuiz';

export default withSuspense(
  function Gamification() {
    const { getGeolocation } = useGeolocation();
    const [location, setLocation] = useState<Location>();
    const { data } = useQuizzesQuery({ location });

    useEffect(() => {
      getGeolocation().then((res) => {
        setLocation({
          latitude: res?.coords.latitude,
          longitude: res?.coords.longitude,
        });
      });
    }, []);

    if (!location?.latitude || !location.longitude) {
      return <QuizLoading />;
    }

    if (!data || data?.length === 0) {
      return <NoQuiz />;
    }

    return <QuizSlider quizListData={data} />;
  },
  {
    fallback: <QuizLoading />,
  },
);
