import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Button, FloatingPlusButton, Font } from 'design-system';
import { useRoute } from '@react-navigation/native';
import useTripPlansQuery from '@/apis/queries/tripPlan/useTripPlansQuery';
import Header from '@/components/common/Header';
import withSuspense from '@/components/HOC/withSuspense';
import EmptyPlan from '@/components/tripPlan/EmptyPlan';
import TripPlanCard, { CARD_GAP } from '@/components/tripPlan/TripPlanCard';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { StackRouteProps } from '@/types/navigation';

const { height } = Dimensions.get('window');

export default withSuspense(function HomeSpotAdd() {
  const route = useRoute<StackRouteProps<'Home/AddSpot'>>();
  const { data } = useTripPlansQuery();
  const [tripId, setTripId] = useState<number>();
  const isEmpty = data.length === 0;

  return (
    <>
      <BackGroundGradient>
        <Header title="나의 여행 목록" />
        <View
          className="relative flex-1 justify-between"
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            minHeight: isEmpty ? undefined : height,
          }}
        >
          <View>
            {isEmpty ? (
              <EmptyPlan />
            ) : (
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
            )}
          </View>
        </View>
      </BackGroundGradient>
      <View className="absolute bottom-4 w-full px-4">
        <Button disabled={!tripId}>
          <Font type="title1" color="white">
            이 여행에 담기
          </Font>
        </Button>
      </View>
      <FloatingPlusButton bottom={16} right={16} onPress={() => {}} />
    </>
  );
});