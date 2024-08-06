export interface SpotData {
  locationName: string;
  location: string;
  tags: string[];
  liked: boolean;
  backgroundImage: string;
}

interface LocationData {
  spotId: number;
  name: string;
  imageUrl: string;
  isLiked: boolean;
  likeCount: number;
}

export interface LocationList {
  status: number;
  message: string;
  result: {
    workId: number;
    posterUrl: string;
    data: LocationData[];
  };
}
