import { View } from 'react-native';
import Header from '@/components/common/Header';
import TripPlanPostForm from '@/components/tripPlan/TripPlanPostForm';
import { TripFormProvider } from '@/hooks/useTripPlanFormState';
import BackGroundGradient from '@/layouts/BackGroundGradient';

export default function TripPlannerPost() {
  return (
    <BackGroundGradient withoutScroll>
      <TripFormProvider>
        <Header title="새 여행 등록" />
        <TripPlanPostForm />
      </TripFormProvider>
    </BackGroundGradient>
  );
}
