import { useRef } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';
import { City, Region } from '@/constants/CITY';

export interface RecordGetResponse {
  id: number;
  title: string;
  region: Region;
  city: City;
  description: string;
  startDate: string;
  endDate: string;
  images: string[];
}

interface GetRecordApiResponse {
  result: RecordGetResponse;
}

interface UseRecordDetailQueryParams {
  recordId: number;
}

interface UseRecordDetailQueryReturn {
  recordDetail: RecordGetResponse;
  isError: boolean;
  refetch: () => void;
}

export default function useRecordDetailQuery({
  recordId,
}: UseRecordDetailQueryParams) {
  const authAxios = useAuthAxios();
  const returnRef = useRef({} as UseRecordDetailQueryReturn);

  const getDetailRecord = async () => {
    const result = await authAxios.get<GetRecordApiResponse>(
      `api/record/${recordId}`,
    );
    return result.data.result;
  };

  const { data, isError, refetch } = useSuspenseQuery({
    queryKey: ['recordDetail', recordId],
    queryFn: getDetailRecord,
  });

  returnRef.current.recordDetail = data;
  returnRef.current.isError = isError;
  returnRef.current.refetch = refetch;

  return returnRef.current;
}
