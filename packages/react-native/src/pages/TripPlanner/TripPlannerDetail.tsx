import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Font } from 'design-system';
import { useRoute } from '@react-navigation/native';
import CardSlider from '@/components/common/CardSlider';
import Header from '@/components/common/Header';
import withSuspense from '@/components/HOC/withSuspense';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { StackRouteProps } from '@/types/navigation';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';
import AroundCard from '@/components/detail/AroundCard';
import SpotDetailBottomSheet from '@/components/common/SpotDetailBottomSheet';
import useTripPlanMySpotQuery from '@/apis/queries/tripPlan/useTripPlanMySpotQuery';

export default withSuspense(function TripPlannerDetail() {
  const route = useRoute<StackRouteProps<'TripPlanner/Detail'>>();
  const { tripId, region, city, startDate, endDate } = route.params;
  const { data } = useTripPlanMySpotQuery({ id: tripId });
  const [selectedSpot, setSelectedSpot] = useState<number>();

  return (
    <BackGroundGradient withoutScroll>
      <Header />
      <View className="px-4">
        <View className="opacity-50">
          <Font type="body1" color="white">
            {startDate} ~ {endDate}
          </Font>
        </View>
        <Font type="mainTitle" color="white">
          {getDisplayRegion({
            locationEnum: region,
            cityEnum: city,
          })}
        </Font>
      </View>
      <View className="rounded-2xl bg-SPOT-white h-full mt-5 ">
        <ScrollView className="px-5 py-6">
          <View>
            {data.restaurant.length > 0 && (
              <CardSlider
                gap={8}
                title="담은 음식점"
                titleColor="black"
                data={data.restaurant}
                titleGap={4}
                renderItem={({ item }) => (
                  <AroundCard
                    data={item}
                    onCardClick={() => setSelectedSpot(item.contentId)}
                  />
                )}
              />
            )}
            {data.attraction.length > 0 && (
              <CardSlider
                gap={8}
                title="담은 관광지"
                titleColor="black"
                data={data.attraction}
                titleGap={4}
                renderItem={({ item }) => (
                  <AroundCard
                    data={item}
                    onCardClick={() => setSelectedSpot(item.contentId)}
                  />
                )}
              />
            )}
            {data.accommodation.length > 0 && (
              <CardSlider
                gap={8}
                title="담은 숙소"
                titleColor="black"
                data={data.accommodation}
                titleGap={4}
                renderItem={({ item }) => (
                  <AroundCard
                    data={item}
                    onCardClick={() => setSelectedSpot(item.contentId)}
                  />
                )}
              />
            )}
          </View>
        </ScrollView>
      </View>
      <SpotDetailBottomSheet
        selectedDetailSpotId={selectedSpot}
        onClose={() => setSelectedSpot(undefined)}
      />
    </BackGroundGradient>
  );
});
