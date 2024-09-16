/**
 * YYYY-MM-DD
 */
export const getDateString = (date: Date | string, seperator: string = '-') => {
  const tmpDate = new Date(date);

  return `${tmpDate.getFullYear()}${seperator}${String(tmpDate.getMonth() + 1).padStart(2, '0')}${seperator}${String(tmpDate.getDate()).padStart(2, '0')}`;
};
