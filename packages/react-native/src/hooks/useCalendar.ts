import { useState } from 'react';
import { normalizeDate } from '@/utils/date';

interface DateSelectionInfo {
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
  textColor?: string;
  customContainerStyle?: { borderRadius: number };
}

export interface DateRange {
  start: Date | undefined;
  end: Date | undefined;
}

const generateDateRange = (startDate?: Date, endDate?: Date) => {
  const normalizedStartDate = normalizeDate(startDate);
  const normalizedEndDate = normalizeDate(endDate);

  const result: Record<string, DateSelectionInfo> = {};
  const day = normalizeDate(normalizedStartDate);

  if (!endDate) {
    const dateString = day.toISOString().split('T')[0];
    result[dateString] = {
      startingDay: true,
      endingDay: true,
      color: '#FF1919',
      textColor: 'white',
      customContainerStyle: { borderRadius: 8 },
    };

    return result;
  }

  for (; day <= normalizedEndDate; day.setDate(day.getDate() + 1)) {
    const dateString = day.toISOString().split('T')[0]; // YYYY-MM-DD

    const entry: DateSelectionInfo = {
      color: '#ffbaba',
      customContainerStyle: { borderRadius: 8 },
    };

    // 시작 날짜인 경우
    if (day.getTime() === normalizedStartDate.getTime()) {
      entry.startingDay = true;
      entry.textColor = 'white';
      entry.color = '#FF1919';
    }

    // 끝 날짜인 경우
    if (day.getTime() === normalizedEndDate.getTime()) {
      entry.endingDay = true;
      entry.textColor = 'white';
      entry.color = '#FF1919';
    }

    result[dateString] = entry;
  }

  return result;
};

export default function useCalendar(
  initialStartDate?: Date,
  initialEndDate?: Date,
) {
  const [date, setDate] = useState<DateRange>({
    start: initialStartDate,
    end: initialEndDate,
  });

  const updateDate = (selectedDate: Date | string) => {
    const normalizedDate = normalizeDate(selectedDate);
    const currentStart = date.start;
    const currentEnd = date.end;

    // 선택된 날짜가 없을 때
    if (!currentStart && !currentEnd) {
      setDate({ start: normalizedDate, end: undefined });
      return;
    }

    // 시작 날짜가 선택되어 있을 때
    if (currentStart && !currentEnd) {
      // 시작 날짜보다 이전 날짜를 선택하는 경우
      if (normalizedDate.getTime() < currentStart.getTime()) {
        setDate({ start: normalizedDate, end: currentStart });
        return;
      }

      // 시작 날짜보다 이전 날짜를 선택하는 경우
      setDate({ start: currentStart, end: normalizedDate });
      return;
    }

    // 시작 날짜와 끝 날짜가 모두 선택되어 있을 때
    setDate({ start: normalizedDate, end: undefined });
  };

  return {
    date,
    dateRange: generateDateRange(date.start, date.end),
    updateDate,
  };
}
