import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Button, FloatingPlusButton, Font } from 'design-system';
import { useNavigation, useRoute } from '@react-navigation/native';
import useTripPlansQuery from '@/apis/queries/tripPlan/useTripPlansQuery';
import Header from '@/components/common/Header';
import withSuspense from '@/components/HOC/withSuspense';
import EmptyPlan from '@/components/tripPlan/EmptyPlan';
import TripPlanCard, { CARD_GAP } from '@/components/tripPlan/TripPlanCard';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import useSelectedSpotAddMutation from '@/apis/mutations/useSelectedSpotAddMutation';
import MutationLoadingModal from '@/components/common/MutationLoadingModal';

const { height } = Dimensions.get('window');

export default withSuspense(function HomeSpotAdd() {
  const route = useRoute<StackRouteProps<'Home/AddSpot'>>();
  const { data } = useTripPlansQuery();
  const [tripId, setTripId] = useState<number>();
  const isEmpty = data.length === 0;
  const { mutateAsync, isPending } = useSelectedSpotAddMutation();
  const navigation = useNavigation<StackNavigation<'Home/AddSpot'>>();

  const add = () => {
    if (!tripId) return;

    mutateAsync({ planId: tripId, spotList: route.params.spots });
    navigation.goBack();
  };

  return (
    <>
      <BackGroundGradient withoutScroll={isEmpty}>
        <MutationLoadingModal isSubmiting={isPending} />
        <Header title="나의 여행 목록" />
        <View
          className="relative flex-1 justify-between"
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            minHeight: isEmpty ? undefined : height,
          }}
        >
          <View className="flex-1">
            {isEmpty ? (
              <EmptyPlan />
            ) : (
              <View>
                <View className="justify-center items-center">
                  <Font type="body1" color="white">
                    나의 여행은 Trip Planner 탭에서 확인할 수 있습니다.
                  </Font>
                </View>
                <View
                  className="mt-5 flex flex-row flex-wrap "
                  style={{
                    gap: CARD_GAP,
                  }}
                >
                  {data?.map((plan) => (
                    <View key={plan.id}>
                      <TripPlanCard
                        isSelectionMode
                        isSelect={tripId === plan.id}
                        cardData={plan}
                        onCardClick={() => {
                          setTripId(plan.id);
                        }}
                      />
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </BackGroundGradient>

      <View className="absolute bottom-4 w-full px-4">
        <Button disabled={!tripId} onPress={add}>
          <Font type="title1" color="white">
            이 여행에 담기
          </Font>
        </Button>
      </View>
      <FloatingPlusButton
        bottom={80}
        right={16}
        onPress={() => navigation.navigate('Home/PlanPost')}
      />
    </>
  );
});
