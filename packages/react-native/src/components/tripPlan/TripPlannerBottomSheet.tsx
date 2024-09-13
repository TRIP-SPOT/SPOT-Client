import { View } from 'react-native';
import { Font } from 'design-system';
import { BottomSheetView, TouchableOpacity } from '@gorhom/bottom-sheet';
import { TripPlanResponse } from '@/apis/queries/tripPlan/useTripPlansQuery';
import BottomSheet from '../common/BottomSheet';
import { REGION, REVERSE_REGION_MAPPER } from '@/constants/CITY';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';

interface TripPlannerBottomSheetProps {
  selectedPlan?: TripPlanResponse;
  handleClose: () => void;
}

export default function TripPlannerBottomSheet({
  selectedPlan,
  handleClose,
}: TripPlannerBottomSheetProps) {
  if (!selectedPlan) {
    return null;
  }

  return (
    <BottomSheet
      isShow={Boolean(selectedPlan)}
      snapPoints={['30%']}
      handleClose={handleClose}
    >
      <BottomSheetView
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View className="flex items-center w-full justify-center flex-col gap-2">
          <Font.Bold type="mainTitle" color="black">
            {getDisplayRegion({
              locationEnum: selectedPlan.location,
              cityEnum: selectedPlan.city,
            })}
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
  );
}
