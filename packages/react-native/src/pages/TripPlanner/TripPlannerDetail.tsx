import { ScrollView, View } from 'react-native';
import { Font } from 'design-system';
import { useRoute } from '@react-navigation/native';
import useTripPlanDetailQuery from '@/apis/queries/tripPlan/useTripPlanDetailQuery';
import CardSlider from '@/components/common/CardSlider';
import Header from '@/components/common/Header';
import withSuspense from '@/components/HOC/withSuspense';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { StackRouteProps } from '@/types/navigation';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';

export default withSuspense(function TripPlannerDetail() {
  const route = useRoute<StackRouteProps<'TripPlanner/Detail'>>();
  const { data } = useTripPlanDetailQuery({ id: route.params.tripId });

  return (
    <BackGroundGradient withoutScroll>
      <Header />
      <View className="px-4">
        <View className="opacity-50">
          <Font type="body1" color="white">
            {data.startDate} ~ {data.endDate}
          </Font>
        </View>
        <Font type="mainTitle" color="white">
          {getDisplayRegion({
            locationEnum: data.location,
            cityEnum: data.city,
          })}
        </Font>
      </View>
      <View className="rounded-2xl bg-SPOT-white h-full mt-5 ">
        <ScrollView className="px-5 py-6">
          <View>
            <CardSlider
              title="나의 SPOT"
              data={data.mySpots}
              renderItem={({ item }) => (
                <View>
                  <Font type="body2" color="white">
                    {item.spotName}
                  </Font>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </BackGroundGradient>
  );
});
