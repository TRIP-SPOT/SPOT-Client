import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
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

const getDisplayRegion = (selectedPlan: TripPlanResponse) => {
  const region = REVERSE_REGION_MAPPER[selectedPlan.location];
  const city = Object.entries(
    REGION[REVERSE_REGION_MAPPER[selectedPlan.location]],
  ).find((entry) => {
    return entry[1] === selectedPlan.city;
  })?.[0];

  return `${region} ${city}`;
};

export default function TripPlanner() {
  const { data } = useTripPlansQuery();
  const [selectedPlan, setSelectedPlan] = useState<TripPlanResponse>();

  const navigation = useNavigation<StackNavigation<'TripPlanner/Main'>>();

  const sort = () => {};

  const handleClickCard = (selectedCardData: TripPlanResponse) => {
    setSelectedPlan(selectedCardData);
  };

  return (
    <View>
      <BackGroundGradient>
        <Header type="logo" />
        <View
          className="relative flex-1 min-h-[100vh]"
          style={{
            paddingLeft: 16,
            paddingRight: 16,
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
}
