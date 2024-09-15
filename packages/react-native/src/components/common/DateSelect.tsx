import { Button, Font } from 'design-system';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import BottomSheet from './BottomSheet';
import useCalendar from '@/hooks/useCalendar';

export interface DateSelectProps {
  date: {
    start: Date;
    end: Date;
  };
  setDate: React.Dispatch<
    React.SetStateAction<{
      start: Date;
      end: Date;
    }>
  >;
}

const getDisplayDate = (displayDate: Date) => {
  return displayDate.toISOString().split('T')[0];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calendarTheme: any = {
  'stylesheet.calendar.header': {
    dayHeader: {
      marginTop: 2,
      marginBottom: 7,
      width: 32,
      textAlign: 'center',
      color: '#4C4C4C',
    },
    dayTextAtIndex0: {
      color: '#FF1919',
    },
    dayTextAtIndex6: {
      color: 'blue',
    },
    arrowImage: {
      tintColor: '#4C4C4C',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 6,
      alignItems: 'center',
      gap: 30,
    },
  },
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textMonthFontWeight: 600,
};

export default function DateSelect({ date, setDate }: DateSelectProps) {
  const [openCalendar, setOpenCalendar] = useState(false);
  const { date: selectedDate, dateRange, updateDate } = useCalendar();
  // console.log(JSON.stringify(dateRange, null, 2));

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  return (
    <>
      <TouchableOpacity
        className="justify-between flex-row flex-1 pr-20"
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
        <View>
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
        snapPoints={['60%', '90%']}
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
            onDayPress={(day) =>
              updateDate(new Date(day.dateString /* YYYY-MM-DD */))
            }
            enableSwipeMonths
            theme={calendarTheme}
            markingType="period"
            markedDates={dateRange}
          />
        </View>
        <View className="mx-4">
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
