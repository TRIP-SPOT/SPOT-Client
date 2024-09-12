import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { City, Region } from '@/constants/CITY';
import { KoreaLocationName } from '@/types/map';

export type RecordResponse = {
  id: number;
  title: string;
  location: Region;
  city: City;
  startDate: string;
  endDate: string;
  imageUrl: string;
};

const mockRecord: RecordResponse[] = [
  {
    id: 1,
    title: '민지사진',
    startDate: '2024.08.04',
    endDate: '2024.08.04',
    location: Region.GANGWON,
    city: City.ANDONG,
    imageUrl:
      'https://i.namu.wiki/i/8BAuDmjlFbHoGpGTyTUJyeIsrWw7vrGKTvbOBS1DbaLNHHFL6D05TSZEyVGGffn_RIs6zrf4jCb5Xq5Lnbs8QQ.webp',
  },
  {
    id: 2,
    title: '준비갈완료',
    startDate: '2024.08.05',
    endDate: '2024.08.06',
    location: Region.GANGWON,
    city: City.ANDONG,
    imageUrl:
      'https://t1.daumcdn.net/news/202406/27/poctan/20240627172416746baii.jpg',
  },
  {
    id: 3,
    title: '이미지 구하기 귀찮다',
    startDate: '2024.08.05',
    endDate: '2024.08.06',
    location: Region.JEJU,
    city: City.SACHEON,
    imageUrl:
      'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202406/20/starfashion/20240620094035441whlh.jpg',
  },
];

interface UseRecordsQueryParams {
  location: KoreaLocationName;
}

export default function useRecordsQuery({ location }: UseRecordsQueryParams) {
  return useSuspenseQuery({
    queryKey: ['records', location],
    queryFn: async () => {
      return mockRecord;
    },
  });
}
