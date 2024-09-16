/**
 * Date 객체의 모든 시간을 통일
 * @description 정확한 시간을 비교할 경우 `new Date` 대신 사용
 */
export const normalizeDate = (date?: Date | string) => {
  const normalizedDate = date ? new Date(date) : new Date();
  normalizedDate.setUTCHours(0, 0, 0, 0);
  return normalizedDate;
};

/**
 * `separator`를 기준으로 날짜 문자열 반환
 *
 * `default`: YYYY-MM-DD
 */
export const getDateString = (date: Date | string, separator: string = '-') => {
  const tmpDate = new Date(date);

  return `${tmpDate.getFullYear()}${separator}${String(tmpDate.getMonth() + 1).padStart(2, '0')}${separator}${String(tmpDate.getDate()).padStart(2, '0')}`;
};

const week = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * 시작 Date와 끝 Date를 포함하는 날짜 배열 반환
 * @param startDate 시작날짜
 * @param endDate 끝날짜
 */
export const getDateList = (
  startDate: Date | string,
  endDate: Date | string,
) => {
  const dateList = [];

  const normalizedStartDate = normalizeDate(startDate);
  const normalizedEndDate = normalizeDate(endDate);

  if (normalizedStartDate.getTime() > normalizedEndDate.getTime()) return [];

  while (normalizedStartDate <= normalizedEndDate) {
    dateList.push({
      date: normalizedStartDate.getDate(),
      day: week[normalizedStartDate.getDay()],
    });
    normalizedStartDate.setDate(normalizedStartDate.getDate() + 1);
  }

  return dateList;
};

/**
 * 간략한 날짜 문자열 - 두 번째 인자에 includeWeek를 false로 설정하면 요일은 제외
 *
 * e.g. 2.8 (월)
 */
export const getMinimalDateString = (
  date: Date | string,
  options?: {
    separator?: string;
    includeWeek?: boolean;
  },
) => {
  const { separator = '.', includeWeek = true } = options || {};
  const normalizedDate = normalizeDate(date);
  const month = normalizedDate.getMonth() + 1;
  const day = normalizedDate.getDay();

  return `${month}${separator}${normalizedDate.getDate()}${includeWeek ? ` (${week[day]})` : ''}`;
};
