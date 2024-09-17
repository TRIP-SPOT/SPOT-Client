import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { City, Region, REGION_MAPPER } from '@/constants/CITY';
import { KoreaLocationName } from '@/types/map';
import useAuthAxios from '@/apis/useAuthAxios';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

export type RecordResponse = {
  id: number;
  title: string;
  location: Region;
  city: City;
  startDate: string;
  endDate: string;
  image: string;
};

export type GetRecordResponse = {
  result: RecordResponse[];
};

interface UseRecordsQueryParams {
  location: KoreaLocationName;
}

export default function useRecordsQuery({ location }: UseRecordsQueryParams) {
  const authAxios = useAuthAxios();

  const getRecords = async () => {
    const result = await authAxios.get<GetRecordResponse>(
      `/api/record/region/${REGION_MAPPER[location]}`,
    );
    return result.data.result;
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.RECORDS, location],
    queryFn: getRecords,
  });
}
