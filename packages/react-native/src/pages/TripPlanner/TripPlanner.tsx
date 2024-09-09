import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Font, FloatingPlusButton } from 'design-system';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import Header from '@/components/common/Header';
import SortIcon from '@/assets/SortIcon';
import useTripPlansQuery from '@/apis/queries/tripPlan/useTripPlansQuery';
import TripPlanCard, { CARD_GAP } from '@/components/tripPlan/TripPlanCard';
import useBottomSheet from '@/hooks/useBottomSheet';

export default function TripPlanner() {
  const { data } = useTripPlansQuery();
  const [selectedPlan, setSelectedPlan] = useState<number>();
  const { BottomSheet, showBottonSheet } = useBottomSheet();

  const sort = () => {};

  const handleClickCard = (selectedCardDataId: number) => {
    showBottonSheet();
    setSelectedPlan(selectedCardDataId);
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
              <View key={plan.backgroundImage}>
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
      <FloatingPlusButton bottom={16} right={16} onPress={() => {}} />
      {selectedPlan && (
        <BottomSheet isShow={Boolean(selectedPlan)} snapPoints={['20%']}>
          <View className="flex items-center w-full justify-center flex-col">
            <TouchableOpacity className="py-2" onPress={() => {}}>
              <Font.Light type="title1" color="black">
                수정
              </Font.Light>
            </TouchableOpacity>
            <View className="w-[90%] h-[0.5px] bg-[#333333]" />
            <TouchableOpacity className="py-2">
              <Font.Light type="title1" color="black">
                삭제
              </Font.Light>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      )}
    </View>
  );
}
