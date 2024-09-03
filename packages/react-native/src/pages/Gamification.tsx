import { useEffect, useState } from 'react';
import useGeolocation from '@/hooks/useGeolocation';
import useQuizzesQuery, { Location } from '@/apis/queries/useQuizzesQuery';
import QuizLoading from './Gamification/QuizLoading';
import QuizSlider from './Gamification/QuizSlider';
import withSuspense from '@/components/HOC/withSuspense';

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
    });

    if (!data) {
      return <QuizLoading />;
    }

    return <QuizSlider quizListData={data} />;
  },
  {
    fallback: <QuizLoading />,
  },
);
