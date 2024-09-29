import { Button, Font } from 'design-system';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import BottomSheet from './BottomSheet';
import useCalendar, { DateRange } from '@/hooks/useCalendar';
import { CALENDAR_THEME } from '@/constants/CALENDAR_THEME';
import BackIcon from '@/assets/BackIcon';

export interface DateSelectProps {
  date: DateRange;
  setDate: React.Dispatch<React.SetStateAction<DateRange>>;
}

const getDisplayDate = (displayDate?: Date) => {
  if (!displayDate) return '선택해주세요';
  return displayDate.toISOString().split('T')[0];
};

export default function DateSelect({ date, setDate }: DateSelectProps) {
  const [openCalendar, setOpenCalendar] = useState(false);
  const { date: selectedDate, dateRange, updateDate } = useCalendar();

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  return (
    <>
      <TouchableOpacity
        className="justify-between flex-row flex-1"
        onPress={() => setOpenCalendar(true)}
      >
        <View>
          <Font color="white" type="ui-text">
            From
          </Font>
          <View>
            <Font color="white" type="body1">
              {getDisplayDate(date.start)}
            </Font>
          </View>
        </View>
        <View className="pr-10">
          <Font color="white" type="ui-text">
            To
          </Font>
          <View>
            <Font color="white" type="body1">
              {getDisplayDate(date.end)}
            </Font>
          </View>
        </View>
      </TouchableOpacity>

      <BottomSheet
        isShow={openCalendar}
        snapPoints={['65%']}
        handleClose={() => setOpenCalendar(false)}
      >
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
          <Button onPress={() => setOpenCalendar(false)}>
            <Font.Bold type="title1" color="white">
              완료
            </Font.Bold>
          </Button>
        </View>
      </BottomSheet>
    </>
  );
}
