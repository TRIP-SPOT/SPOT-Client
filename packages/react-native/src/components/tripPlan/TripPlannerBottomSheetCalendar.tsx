import { View } from 'react-native';
import { Button, Font } from 'design-system';
import { Calendar } from 'react-native-calendars';
import BackIcon from '@/assets/BackIcon';
import { CALENDAR_THEME } from '@/constants/CALENDAR_THEME';
import useCalendar from '@/hooks/useCalendar';
import useSchedulePeriodMutation from '@/apis/mutations/useSchedulePeriodMutation';
import { TripPlanResponse } from '@/apis/queries/tripPlan/useTripPlansQuery';
import MutationLoadingModal from '../common/MutationLoadingModal';
import { normalizeDate } from '@/utils/date';

interface TripPlannerBottomSheetCalendarProps {
  selectedPlan: TripPlanResponse;
  handleClose: () => void;
}

export default function TripPlannerBottomSheetCalendar({
  selectedPlan,
  handleClose,
}: TripPlannerBottomSheetCalendarProps) {
  const { date, dateRange, updateDate } = useCalendar(
    normalizeDate(selectedPlan.startDate),
    normalizeDate(selectedPlan.endDate),
  );
  const { mutateAsync, isPending } = useSchedulePeriodMutation();

  const changePeriod = async () => {
    await mutateAsync({
      id: selectedPlan.id,
      startDate: date.start.toISOString().replace('.000Z', ''),
      endDate: date.end.toISOString().replace('.000Z', ''),
    });
    handleClose();
  };

  return (
    <>
      <MutationLoadingModal isSubmiting={isPending} />
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
        <Button onPress={changePeriod}>
          <Font.Bold type="title1" color="white">
            완료
          </Font.Bold>
        </Button>
      </View>
    </>
  );
}
