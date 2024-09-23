import { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { View } from 'react-native';
import { Button, Font } from 'design-system';
import { BottomSheetView, TouchableOpacity } from '@gorhom/bottom-sheet';
import { TripPlanResponse } from '@/apis/queries/tripPlan/useTripPlansQuery';
import BottomSheet from '../common/BottomSheet';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';
import useDeleteTripPlan from '@/apis/mutations/useDeleteTripPlan';
import useGallery from '@/hooks/useGallery';
import useUpdateTripPlanImage from '@/apis/mutations/useUpdateTripPlanImage';
import MutationLoadingModal from '../common/MutationLoadingModal';
import useCalendar from '@/hooks/useCalendar';
import { CALENDAR_THEME } from '@/constants/CALENDAR_THEME';
import BackIcon from '@/assets/BackIcon';

interface TripPlannerBottomSheetProps {
  selectedPlan?: TripPlanResponse;
  handleClose: () => void;
}

export default function TripPlannerBottomSheet({
  selectedPlan,
  handleClose,
}: TripPlannerBottomSheetProps) {
  const [viewMode, setViewMode] = useState<'options' | 'calendar'>('options');
  const { getPhoto } = useGallery();
  const { dateRange, updateDate } = useCalendar();

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

  if (!selectedPlan) {
    return null;
  }

  const renderPlannerSelectOptions = () => {
    return (
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
            setViewMode('calendar');
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
    );
  };

  const renderCalendar = () => {
    return (
      <>
        <View className="items-center my-3">
          <Font.Bold type="mainTitle" color="black">
            여행 기간 선택
          </Font.Bold>
        </View>
        <View className="flex flex-col justify-between">
          <Calendar
            monthFormat="yyyy M월"
            onDayPress={(day) => updateDate(day.dateString /* YYYY-MM-DD */)}
            enableSwipeMonths
            theme={CALENDAR_THEME}
            markingType="period"
            markedDates={dateRange}
            disableMonthChange
            renderArrow={(direction) =>
              direction === 'left' ? (
                <BackIcon color="black" />
              ) : (
                <View className="rotate-180">
                  <BackIcon color="black" />
                </View>
              )
            }
          />
        </View>
        <View
          className="px-2"
          style={{ position: 'absolute', bottom: 30, width: '100%' }}
        >
          <Button onPress={() => handleClose()}>
            <Font.Bold type="title1" color="white">
              완료
            </Font.Bold>
          </Button>
        </View>
      </>
    );
  };

  return (
    <>
      <MutationLoadingModal isSubmiting={isUpdating || isDeleting} />
      <BottomSheet
        isShow={Boolean(selectedPlan)}
        snapPoints={viewMode === 'options' ? ['30%'] : ['70%']}
        handleClose={() => {
          setViewMode('options');
          handleClose();
        }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            justifyContent: viewMode === 'options' ? 'center' : 'flex-start',
          }}
        >
          {viewMode === 'options'
            ? renderPlannerSelectOptions()
            : renderCalendar()}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
