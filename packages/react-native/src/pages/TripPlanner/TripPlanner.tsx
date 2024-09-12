import { useState } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { Font, FloatingPlusButton } from 'design-system';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import Header from '@/components/common/Header';
import SortIcon from '@/assets/SortIcon';
import useTripPlansQuery, {
  TripPlanResponse,
} from '@/apis/queries/tripPlan/useTripPlansQuery';
import TripPlanCard, { CARD_GAP } from '@/components/tripPlan/TripPlanCard';
import BottomSheet from '@/components/common/BottomSheet';
import { StackNavigation } from '@/types/navigation';
import { REGION, REVERSE_REGION_MAPPER } from '@/constants/CITY';
import withSuspense from '@/components/HOC/withSuspense';

const getDisplayRegion = (selectedPlan: TripPlanResponse) => {
  const region = REVERSE_REGION_MAPPER[selectedPlan.location];
  const city = Object.entries(
    REGION[REVERSE_REGION_MAPPER[selectedPlan.location]],
  ).find((entry) => {
    return entry[1] === selectedPlan.city;
  })?.[0];

  return `${region} ${city}`;
};

const { height } = Dimensions.get('window');

export default withSuspense(function TripPlanner() {
  const { data } = useTripPlansQuery();
  const [selectedPlan, setSelectedPlan] = useState<TripPlanResponse>();

  const navigation = useNavigation<StackNavigation<'TripPlanner/Main'>>();

  const sort = () => {};

  const handleClickCard = (selectedCardData: TripPlanResponse) => {
    setSelectedPlan(selectedCardData);
  };

  const isEmpty = data.length === 0;

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
            <TouchableOpacity onPress={sort}>
              <SortIcon />
            </TouchableOpacity>
          </View>
          {isEmpty ? (
            <View className="justify-center items-center flex-grow">
              <Font type="body1" color="white">
                비어있어요
              </Font>
              <Font type="body1" color="white">
                나만의 여행을 채워보세요
              </Font>
            </View>
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
                    onOptionClick={handleClickCard}
                    onCardClick={() => {}}
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
      {selectedPlan && (
        <BottomSheet isShow={Boolean(selectedPlan)} snapPoints={['30%']}>
          <BottomSheetView
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <View className="flex items-center w-full justify-center flex-col">
              <Font.Bold type="mainTitle" color="black">
                {getDisplayRegion(selectedPlan)}
              </Font.Bold>
              <TouchableOpacity className="py-2" onPress={() => {}}>
                <Font.Light type="title1" color="black">
                  여행기간 변경
                </Font.Light>
              </TouchableOpacity>
              <View className="w-[90%] h-[0.5px] bg-[#333333]" />
              <TouchableOpacity className="py-2">
                <Font.Light type="title1" color="black">
                  배너 사진 변경
                </Font.Light>
              </TouchableOpacity>
              <View className="w-[90%] h-[0.5px] bg-[#333333]" />
              <TouchableOpacity className="py-2" onPress={() => {}}>
                <Font.Light type="title1" color="black">
                  삭제
                </Font.Light>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>
  );
});
