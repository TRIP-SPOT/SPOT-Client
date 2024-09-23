import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Font } from 'design-system';
import { BottomSheetView, TouchableOpacity } from '@gorhom/bottom-sheet';
import { TripPlanResponse } from '@/apis/queries/tripPlan/useTripPlansQuery';
import BottomSheet from '../common/BottomSheet';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';
import { StackNavigation } from '@/types/navigation';
import useDeleteTripPlan from '@/apis/mutations/useDeleteTripPlan';
import useGallery from '@/hooks/useGallery';
import useUpdateTripPlanImage from '@/apis/mutations/useUpdateTripPlanImage';
import MutationLoadingModal from '../common/MutationLoadingModal';

interface TripPlannerBottomSheetProps {
  selectedPlan?: TripPlanResponse;
  handleClose: () => void;
}

export default function TripPlannerBottomSheet({
  selectedPlan,
  handleClose,
}: TripPlannerBottomSheetProps) {
  const navigation = useNavigation<StackNavigation<'TripPlanner/Main'>>();
  const { mutate: deleteTripPlan } = useDeleteTripPlan();
  const { getPhoto } = useGallery();
  const { mutate, isPending } = useUpdateTripPlanImage(selectedPlan?.id, {
    onSuccess: () => {
      handleClose();
    },
  });

  const getPhtoFromLibrary = async () => {
    const photo = await getPhoto({ fullObject: true });

    if (!photo) return;

    mutate(photo);
  };

  if (!selectedPlan) {
    return null;
  }

  return (
    <>
      <MutationLoadingModal isSubmiting={isPending} />
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
                locationEnum: selectedPlan.region,
                cityEnum: selectedPlan.city,
              })}
            </Font.Bold>
            <TouchableOpacity
              className="py-2"
              onPress={() => {
                navigation.navigate('TripPlanner/EditPlan', {
                  tripId: selectedPlan.id,
                });
                handleClose();
              }}
            >
              <Font type="title1" color="black">
                여행기간 변경
              </Font>
            </TouchableOpacity>
            <View className="w-[90%] h-[0.5px] bg-[#333333]" />
            <TouchableOpacity className="py-2" onPress={getPhtoFromLibrary}>
              <Font type="title1" color="black">
                배너 사진 변경
              </Font>
            </TouchableOpacity>
            <View className="w-[90%] h-[0.5px] bg-[#333333]" />
            <TouchableOpacity
              className="py-2"
              onPress={() => deleteTripPlan(selectedPlan.id)}
            >
              <Font type="title1" color="black">
                삭제
              </Font>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
