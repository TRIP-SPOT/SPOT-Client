import { View } from 'react-native';
import { Button, Font } from 'design-system';
import { Calendar } from 'react-native-calendars';
import BackIcon from '@/assets/BackIcon';
import { CALENDAR_THEME } from '@/constants/CALENDAR_THEME';
import useCalendar from '@/hooks/useCalendar';

interface TripPlannerBottomSheetCalendarProps {
  handleClose: () => void;
}

export default function TripPlannerBottomSheetCalendar({
  handleClose,
}: TripPlannerBottomSheetCalendarProps) {
  const { dateRange, updateDate } = useCalendar();

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
}
