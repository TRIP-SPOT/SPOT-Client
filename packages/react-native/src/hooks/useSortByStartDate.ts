import { useEffect, useState } from 'react';

type orderType = 'ascending' | 'descending';

interface ObjectWithStartDate {
  startDate: string;
}

interface UseSortParams<T extends ObjectWithStartDate[]> {
  defaultData: T;
}

export default function useSortByStartDate<T extends ObjectWithStartDate[]>({
  defaultData,
}: UseSortParams<T>) {
  const [data, setData] = useState<T>(defaultData);
  const [order, setOrder] = useState<orderType>();

  const sort = (type: orderType) => {
    setData((prev) => {
      const sortedData = [...prev].sort((a, b) => {
        return type === 'ascending'
          ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          : new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      });
      return sortedData as T;
    });
  };

  const toggleSortOrder = (type?: orderType) => {
    if (!type) {
      setOrder((prev) => (prev === 'descending' ? 'ascending' : 'descending'));
      return;
    }

    setOrder(type);
  };

  useEffect(() => {
    setData(defaultData);
    if (order) {
      sort(order);
    }
  }, [order, defaultData]);

  return { data, order, toggleSortOrder };
}
