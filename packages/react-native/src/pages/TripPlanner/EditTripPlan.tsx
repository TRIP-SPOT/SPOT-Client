import { Font } from 'design-system';
import { useRoute } from '@react-navigation/native';
import { StackRouteProps } from '@/types/navigation';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import Header from '@/components/common/Header';

export default function EditTripPlan() {
  const route = useRoute<StackRouteProps<'TripPlanner/EditPlan'>>();
  const { tripId } = route.params;

  return (
    <BackGroundGradient>
      <Header title="일정" />
      <Font type="title1" color="white">
        {tripId}
      </Font>
    </BackGroundGradient>
  );
}
