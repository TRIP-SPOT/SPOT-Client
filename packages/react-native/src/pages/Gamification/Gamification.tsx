import { useEffect, useState } from 'react';
import QuizLoading from '@components/gamification/QuizLoading';
import QuizSlider from '@components/gamification/QuizSlider';
import withSuspense from '@/components/HOC/withSuspense';
import useGeolocation from '@/hooks/useGeolocation';
import useQuizzesQuery, { Location } from '@/apis/queries/quiz/useQuizzesQuery';

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

    if (!data) {
      return <QuizLoading />;
    }

    return <QuizSlider quizListData={data} />;
  },
  {
    fallback: <QuizLoading />,
  },
);
