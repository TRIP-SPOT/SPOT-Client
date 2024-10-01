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
import useDeleteSelectedSpotMutation from '@/apis/mutations/useDeleteSelectedSpotMutation';
import BottomSheet from '@/components/common/BottomSheet';
import { SpotResponse } from '@/apis/queries/spot/useSpotDetailQuery';

export default withSuspense(function TripPlannerDetail() {
  const route = useRoute<StackRouteProps<'TripPlanner/Detail'>>();
  const { tripId, region, city, startDate, endDate } = route.params;
  const { data } = useTripPlanMySpotQuery({ id: tripId });
  const [selectedSpot, setSelectedSpot] = useState<number>();
  const [targetSpot, setTargetSpot] = useState<SpotResponse>();
  const navigation = useNavigation<StackNavigation<'TripPlanner/Detail'>>();
  const { mutate: deleteSelectedSpots } = useDeleteSelectedSpotMutation(
    tripId,
    { onSuccess: () => setTargetSpot(undefined) },
  );

  const deleteSpot = () => {
    if (!targetSpot) return;
    deleteSelectedSpots(targetSpot.id);
  };

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
            나의 일정
          </Font.Bold>
          <Spacing height={10} />
          <TouchableOpacity
            className="rounded-md overflow-hidden"
            onPress={() =>
              navigation.navigate('TripPlanner/EditPlan', { tripId })
            }
          >
            <Image
              // eslint-disable-next-line global-require
              source={require('../../assets/plan.png')}
              style={{ width: 'auto', height: undefined, aspectRatio: 5 / 2 }}
            />
          </TouchableOpacity>
          <Spacing height={10} />
          <View>
            <CardSlider
              gap={8}
              title="담은 관광지"
              titleColor="black"
              data={data.attraction}
              titleGap={4}
              renderItem={({ item }) => (
                <AroundCard
                  data={item}
                  withMenuIcon
                  onMenuClick={() => setTargetSpot(item)}
                  onCardClick={() => setSelectedSpot(item.contentId)}
                />
              )}
            />
            <Spacing height={10} />
            <CardSlider
              gap={8}
              title="담은 음식점"
              titleColor="black"
              data={data.restaurant}
              titleGap={4}
              renderItem={({ item }) => (
                <AroundCard
                  data={item}
                  withMenuIcon
                  onMenuClick={() => setTargetSpot(item)}
                  onCardClick={() => setSelectedSpot(item.contentId)}
                />
              )}
            />
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
                  withMenuIcon
                  onMenuClick={() => setTargetSpot(item)}
                  onCardClick={() => setSelectedSpot(item.contentId)}
                />
              )}
            />
            <Spacing height={10} />
          </View>
        </ScrollView>
      </View>
      <SpotDetailBottomSheet
        selectedDetailSpotId={selectedSpot}
        onClose={() => setSelectedSpot(undefined)}
      />
      <BottomSheet
        snapPoints={['20%']}
        isShow={Boolean(targetSpot)}
        handleClose={() => setTargetSpot(undefined)}
      >
        <View className="items-center p-4">
          <Font.Bold type="mainTitle" color="black" ellipsis>
            {targetSpot?.title}
          </Font.Bold>
          <Spacing height={20} />
          <TouchableOpacity
            className="w-full items-center"
            onPress={deleteSpot}
          >
            <Font type="title1" color="black">
              삭제
            </Font>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </BackGroundGradient>
  );
});
