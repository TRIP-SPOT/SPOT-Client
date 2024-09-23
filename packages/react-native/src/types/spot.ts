import { City, Region } from '@/constants/CITY';

export interface SpotCardData {
  id: number;
  contentId: number;
  name: string;
  region: Region;
  city: City;
  workId: number;
  workName: string;
  posterUrl: string;
  quote: string | null;
  isLiked: boolean;
  likeCount: number;
}

export interface LocationList {
  status: number;
  message: string;
  result: {
    workId: number;
    posterUrl: string;
    data: SpotCardData[];
  };
}

export interface SpotAroundData {
  id: number;
  name: string;
  location: string;
  title: string;
  content: string;
  backgroundImage: string;
  address: string;
}
