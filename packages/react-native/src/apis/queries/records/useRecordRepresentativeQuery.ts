import { useQuery } from '@tanstack/react-query';
import { Region, REVERSE_REGION_MAPPER } from '@/constants/CITY';
import { KoreaLocationName } from '@/types/map';
import { AppStorage } from '@/utils/storage';
import useAuthAxios from '@/apis/useAuthAxios';
import { ServerResponse } from '@/types/response';
import QUERY_KEYS from '@/constants/QUERY_KEYS';

interface RepresentativeImage {
  id: number;
  region: Region;
  url: string;
}

export type RegionRepresentImage = Partial<Record<KoreaLocationName, string>>;

export default function useRecordRepresentativeQuery() {
  const authAxios = useAuthAxios();

  const getRepresentativeImages = async () => {
    const result = await authAxios.get<ServerResponse<RepresentativeImage[]>>(
      '/api/record/representative',
    );

    return result.data.result;
  };

  return useQuery({
    queryKey: [QUERY_KEYS.REPERSENT_IMAGE],
    queryFn: async () => {
      try {
        const result: RegionRepresentImage = {};
        const images = await getRepresentativeImages();

        images.forEach(({ region, url }) => {
          const v = REVERSE_REGION_MAPPER[region];
          result[v] = url;
        });

        await AppStorage.saveData({
          key: 'representImage',
          value: result,
        });

        return result;
      } catch (err) {
        const stroageImages = await AppStorage.getData('representImage');
        return stroageImages;
      }
    },
  });
}
