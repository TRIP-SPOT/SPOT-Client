import { useQuery } from '@tanstack/react-query';
import { Region, REVERSE_REGION_MAPPER } from '@/constants/CITY';
import { KoreaLocationName } from '@/types/map';
import { AppStorage } from '@/utils/storage';

interface RepresentativeImage {
  imageId: number;
  region: Region;
  imageUrl: string;
}
type RepresentativeResponse = RepresentativeImage[];

const mockRepresentativeImages: RepresentativeResponse = [
  {
    imageId: 1,
    region: Region.BUSAN,
    imageUrl:
      'https://ojsfile.ohmynews.com/STD_IMG_FILE/2023/0116/IE003101648_STD.jpg',
  },
];

export type RegionRepresentImage = Partial<Record<KoreaLocationName, string>>;

const getRepresentativeImages = async () => {
  return mockRepresentativeImages;
};

export default function useRecordRepresentativeQuery() {
  return useQuery({
    queryKey: ['Representative'],
    queryFn: async () => {
      const result: RegionRepresentImage = {};
      const images = await getRepresentativeImages();
      const stroageImages = await AppStorage.getData('representImage');

      images.forEach(({ region, imageUrl }) => {
        const v = REVERSE_REGION_MAPPER[region];
        result[v] = imageUrl;
      });

      return { ...stroageImages, ...result };
    },
  });
}
