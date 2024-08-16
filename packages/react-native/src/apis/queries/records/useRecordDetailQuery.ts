import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

interface RecordGetResponse {
  recordId: number;
  name: string;
  description: string;
  imageUrls: string[];
  isRepresentation: boolean;
}

interface UseRecordDetailQueryParams {
  recordId: number;
}

interface UseRecordDetailQueryReturn {
  recordDetail?: RecordGetResponse;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export default function useRecordDetailQuery({
  recordId,
}: UseRecordDetailQueryParams) {
  const returnRef = useRef({} as UseRecordDetailQueryReturn);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['logDetail'],
    queryFn: async () => ({
      recordId,
      name: '부산 풀코스',
      description: '부산이 좋지',
      imageUrls: [
        'https://t1.daumcdn.net/news/202406/27/poctan/20240627172416746baii.jpg',
        'https://i.namu.wiki/i/8BAuDmjlFbHoGpGTyTUJyeIsrWw7vrGKTvbOBS1DbaLNHHFL6D05TSZEyVGGffn_RIs6zrf4jCb5Xq5Lnbs8QQ.webp',
      ],
      isRepresentation: false,
    }),
  });

  returnRef.current.recordDetail = data;
  returnRef.current.isLoading = isLoading;
  returnRef.current.isError = isError;
  returnRef.current.refetch = refetch;

  return returnRef.current;
}
