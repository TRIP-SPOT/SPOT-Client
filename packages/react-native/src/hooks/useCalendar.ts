import { useEffect, useState } from 'react';

interface DateSelectionInfo {
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
  textColor?: string;
}

type dateRangeData = Record<string, DateSelectionInfo>;

interface DateRange {
  start: Date;
  end: Date;
}

// FIXME: 다음 달 날짜를 선택하는 경우 날짜만 비교하기 때문에 범위가 이상해지는 문제가 있음
export default function useCalendar(
  defaultStartDate?: Date,
  defaultEndDate?: Date,
) {
  const [date, setDate] = useState<DateRange>({
    start: defaultStartDate || new Date(),
    end: defaultEndDate || new Date(),
  });
  const [dateRange, setDateRange] = useState<dateRangeData>({});

  const generateDateRange = (startDate: Date, endDate: Date) => {
    const result: Record<string, DateSelectionInfo> = {};

    const day = new Date(startDate);
    for (; day.getDate() <= endDate.getDate(); day.setDate(day.getDate() + 1)) {
      const dateString = day.toISOString().split('T')[0]; // YYYY-MM-DD

      const entry: {
        startingDay?: boolean;
        endingDay?: boolean;
        color?: string;
        textColor?: string;
      } = {
        color: '#ffbaba',
      };

      // 시작 날짜인 경우
      if (day.getDate() === startDate.getDate()) {
        entry.startingDay = true;
        entry.textColor = 'white';
        entry.color = '#FF1919';
      }

      // 끝 날짜인 경우
      if (day.getDate() === endDate.getDate()) {
        entry.endingDay = true;
        entry.textColor = 'white';
        entry.color = '#FF1919';
      }

      result[dateString] = entry;
    }

    return result;
  };

  const updateDate = (selectedDate: Date) => {
    if (!date.start && !date.end) {
      setDate({ start: selectedDate, end: selectedDate }); // 선택된 범위가 없을 때
      return;
    }

    const currentStart = date.start;
    const currentEnd = date.end;

    // 현재 범위 이전 날짜를 선택
    if (selectedDate.getDate() < currentStart.getDate()) {
      setDate({ start: selectedDate, end: currentEnd });
      return;
    }

    // 현재 범위 이후 날짜를 선택
    if (selectedDate.getDate() > currentEnd.getDate()) {
      setDate({ start: currentStart, end: selectedDate });
      return;
    }

    const dateGap = currentEnd.getDate() - currentStart.getDate();
    const midPointOffset = Math.floor(dateGap / 2); // 중간점까지의 오프셋

    const midPoint = new Date(currentStart);
    midPoint.setDate(midPoint.getDate() + midPointOffset); // 중간점 날짜 계산

    if (selectedDate.getDate() <= midPoint.getDate()) {
      // 선택한 날짜가 중간점보다 이전일 경우
      setDate({ start: selectedDate, end: currentEnd });
    } else {
      // 선택한 날짜가 중간점보다 이후일 경우
      setDate({ start: currentStart, end: selectedDate });
    }
  };

  useEffect(() => {
    setDateRange(generateDateRange(date.start, date.end));
  }, [date]);

  return { date, dateRange, updateDate };
}
