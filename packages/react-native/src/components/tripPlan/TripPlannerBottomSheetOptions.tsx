import { TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import useDeleteTripPlan from '@/apis/mutations/useDeleteTripPlan';
import useUpdateTripPlanImage from '@/apis/mutations/useUpdateTripPlanImage';
import { TripPlanResponse } from '@/apis/queries/tripPlan/useTripPlansQuery';
import useGallery from '@/hooks/useGallery';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';
import MutationLoadingModal from '../common/MutationLoadingModal';

interface TripPlannerBottomSheetOptions {
  selectedPlan: TripPlanResponse;
  handleClose: () => void;
  openCalendar: () => void;
}

export default function TripPlannerBottomSheetOptions({
  selectedPlan,
  handleClose,
  openCalendar,
}: TripPlannerBottomSheetOptions) {
  const { getPhoto } = useGallery();

  const { mutate: deleteTripPlan, isPending: isDeleting } = useDeleteTripPlan({
    onSuccess: () => {
      handleClose();
    },
  });
  const { mutate, isPending: isUpdating } = useUpdateTripPlanImage(
    selectedPlan?.id,
    {
      onSuccess: () => {
        handleClose();
      },
    },
  );

  const getPhtoFromLibrary = async () => {
    const photo = await getPhoto({ fullObject: true });

    if (!photo) return;

    mutate(photo);
  };

  return (
    <>
      <MutationLoadingModal isSubmiting={isUpdating || isDeleting} />
      <View className="flex items-center w-full justify-center flex-col gap-1">
        <Font.Bold type="mainTitle" color="black">
          {getDisplayRegion({
            locationEnum: selectedPlan.region,
            cityEnum: selectedPlan.city,
          })}
        </Font.Bold>
        <TouchableOpacity className="py-2" onPress={openCalendar}>
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
    </>
  );
}
