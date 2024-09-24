import { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import { useNavigation, useRoute } from '@react-navigation/native';
import CardSlider from '@/components/common/CardSlider';
import Header from '@/components/common/Header';
import withSuspense from '@/components/HOC/withSuspense';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';
import AroundCard from '@/components/detail/AroundCard';
import SpotDetailBottomSheet from '@/components/common/SpotDetailBottomSheet';
import useTripPlanMySpotQuery from '@/apis/queries/tripPlan/useTripPlanMySpotQuery';
import Spacing from '@/components/common/Spacing';

export default withSuspense(function TripPlannerDetail() {
  const route = useRoute<StackRouteProps<'TripPlanner/Detail'>>();
  const { tripId, region, city, startDate, endDate } = route.params;
  const { data } = useTripPlanMySpotQuery({ id: tripId });
  const [selectedSpot, setSelectedSpot] = useState<number>();
  const navigation = useNavigation<StackNavigation<'TripPlanner/Detail'>>();

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
      <View className="rounded-t-2xl bg-SPOT-white flex-1 mt-5 ">
        <Spacing height={10} />
        <ScrollView className="px-5 flex-1 ">
          <Font.Bold type="body1" color="black">
            일정
          </Font.Bold>
          <Spacing height={10} />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TripPlanner/EditPlan', { tripId })
            }
          >
            {/* eslint-disable-next-line global-require */}
            <Image source={require('../../assets/plan.png')} />
          </TouchableOpacity>
          <Spacing height={10} />
          <View>
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
            {data.restaurant.length === 0 && <Spacing height={160} />}
            <Spacing height={10} />
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
            {data.attraction.length === 0 && <Spacing height={160} />}
            <Spacing height={10} />
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
            {data.accommodation.length === 0 && <Spacing height={160} />}
            <Spacing height={10} />
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
