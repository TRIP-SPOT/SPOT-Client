import { useState } from 'react';
import { normalizeDate } from '@/utils/date';

interface DateSelectionInfo {
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
  textColor?: string;
  customContainerStyle?: { borderRadius: number };
}

interface DateRange {
  start: Date;
  end: Date;
}

const generateDateRange = (startDate: Date, endDate: Date) => {
  const normalizedStartDate = normalizeDate(startDate);
  const normalizedEndDate = normalizeDate(endDate);

  const result: Record<string, DateSelectionInfo> = {};

  const day = normalizeDate(normalizedStartDate);
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
    start: normalizeDate(initialStartDate),
    end: normalizeDate(initialEndDate),
  });

  const updateDate = (selectedDate: Date | string) => {
    const normalizedDate = normalizeDate(selectedDate);
    if (!date.start && !date.end) {
      setDate({ start: normalizedDate, end: normalizedDate }); // 선택된 범위가 없을 때
      return;
    }

    const currentStart = date.start;
    const currentEnd = date.end;

    // 현재 범위 이전 날짜를 선택
    if (normalizedDate.getTime() < currentStart.getTime()) {
      setDate({ start: normalizedDate, end: currentEnd });
      return;
    }

    // 현재 범위 이후 날짜를 선택
    if (normalizedDate.getTime() > currentEnd.getTime()) {
      setDate({ start: currentStart, end: normalizedDate });
      return;
    }

    const timeGap = currentEnd.getTime() - currentStart.getTime();
    const dateGap = timeGap / (1000 * 60 * 60 * 24);
    const midPointOffset = Math.floor(dateGap / 2); // 중간점까지의 오프셋

    const midPoint = normalizeDate(currentStart);
    midPoint.setDate(midPoint.getDate() + midPointOffset); // 중간점 날짜 계산

    if (normalizedDate <= midPoint) {
      // 선택한 날짜가 중간점보다 이전일 경우
      setDate({ start: normalizedDate, end: currentEnd });
    } else {
      // 선택한 날짜가 중간점보다 이후일 경우
      setDate({ start: currentStart, end: normalizedDate });
    }
  };

  return {
    date,
    dateRange: generateDateRange(date.start, date.end),
    updateDate,
  };
}
