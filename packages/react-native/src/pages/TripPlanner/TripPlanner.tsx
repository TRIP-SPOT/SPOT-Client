import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { Font, FloatingPlusButton } from 'design-system';
import { useNavigation } from '@react-navigation/native';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import Header from '@/components/common/Header';
import SortIcon from '@/assets/SortIcon';
import useTripPlansQuery, {
  TripPlanResponse,
} from '@/apis/queries/tripPlan/useTripPlansQuery';
import TripPlanCard, { CARD_GAP } from '@/components/tripPlan/TripPlanCard';
import { StackNavigation } from '@/types/navigation';
import withSuspense from '@/components/HOC/withSuspense';
import EmptyPlan from '@/components/tripPlan/EmptyPlan';
import TripPlannerBottomSheet from '@/components/tripPlan/TripPlannerBottomSheet';

type orderType = 'ascending' | 'descending';

const { height } = Dimensions.get('window');

export default withSuspense(function TripPlanner() {
  const { data: defaultData } = useTripPlansQuery();
  const [data, setData] = useState(defaultData);
  const [order, setOrder] = useState<orderType>('ascending');
  const [selectedPlan, setSelectedPlan] = useState<TripPlanResponse>();

  const navigation = useNavigation<StackNavigation<'TripPlanner/Main'>>();

  useEffect(() => {
    setData(defaultData);
  }, [defaultData]);

  const sort = (type: orderType) => {
    setData((prev) =>
      type === 'ascending'
        ? prev.sort(
            (a, b) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
          )
        : prev.sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
          ),
    );
  };

  const handleClickCardOption = (selectedCardData: TripPlanResponse) => {
    setSelectedPlan(selectedCardData);
  };

  const isEmpty = data.length === 0;

  useEffect(() => {
    sort(order);
  }, [order]);

  return (
    <View>
      <BackGroundGradient withoutScroll={isEmpty}>
        <Header type="logo" />
        <View
          className="relative flex-1"
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            minHeight: isEmpty ? undefined : height,
          }}
        >
          <View className="flex flex-row items-center justify-between">
            <Font type="title1" color="white">
              My Trip
            </Font>
            <TouchableOpacity
              onPress={() =>
                setOrder((prev) =>
                  prev === 'ascending' ? 'descending' : 'ascending',
                )
              }
            >
              <SortIcon />
            </TouchableOpacity>
          </View>
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
                    cardData={plan}
                    onOptionClick={handleClickCardOption}
                    onCardClick={() =>
                      navigation.navigate('TripPlanner/Detail', {
                        tripId: plan.id,
                        region: plan.region,
                        city: plan.city,
                        startDate: plan.startDate,
                        endDate: plan.endDate,
                      })
                    }
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </BackGroundGradient>
      <FloatingPlusButton
        bottom={16}
        right={16}
        onPress={() => navigation.navigate('TripPlanner/Post')}
      />
      <TripPlannerBottomSheet
        selectedPlan={selectedPlan}
        handleClose={() => setSelectedPlan(undefined)}
      />
    </View>
  );
});
