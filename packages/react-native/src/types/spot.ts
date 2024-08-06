export interface SpotData {
  spotId: number;
  name: string;
  location: string;
  tags: string[];
  isLiked: boolean;
  likeCount: number;
  backgroundImage: string;
}

export interface LocationList {
  status: number;
  message: string;
  result: {
    workId: number;
    posterUrl: string;
    data: SpotData[];
  };
}
