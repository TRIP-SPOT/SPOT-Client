import { TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import { useRoute } from '@react-navigation/native';
import { StackRouteProps } from '@/types/navigation';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import Header from '@/components/common/Header';
import withSuspense from '@/components/HOC/withSuspense';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';
import useTripPlanEditDetailQuery from '@/apis/queries/tripPlan/useTripPlanEditDetailQuery';
import { getDateString } from '@/utils/date';
import BackIcon from '@/assets/BackIcon';

const EditTripPlan = withSuspense(() => {
  const route = useRoute<StackRouteProps<'TripPlanner/EditPlan'>>();
  const { tripId } = route.params;

  const { data } = useTripPlanEditDetailQuery(tripId);

  return (
    <BackGroundGradient>
      <Header title="일정" />
      <View className="items-center">
        <View
          className="items-center justify-center mt-5 flex-row"
          style={{ gap: 30 }}
        >
          <TouchableOpacity className="p-2">
            <BackIcon />
          </TouchableOpacity>
          <View className="items-center">
            <Font.Bold type="title1" color="white">
              {getDisplayRegion({
                locationEnum: data.region,
                cityEnum: data.city,
              })}
            </Font.Bold>
            <Font.Light type="body3" color="white">
              {getDateString(data.startDate, '.')}
              {' - '}
              {getDateString(data.endDate, '.')}
            </Font.Light>
          </View>
          <TouchableOpacity className="rotate-180 p-2">
            <BackIcon />
          </TouchableOpacity>
        </View>
      </View>
    </BackGroundGradient>
  );
});

export default EditTripPlan;
