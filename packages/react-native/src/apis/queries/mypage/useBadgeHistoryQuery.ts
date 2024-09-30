import { useQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';
import { badgePath } from '@/components/common/Badge';
import { BadgeAcquisition } from '@/constants/BADGE_ACQUISITION';
import { City, Region, REVERSE_BADGE_MAPPER } from '@/constants/CITY';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import { ServerResponse } from '@/types/response';

interface BadgeHistoryResponse {
  region: Region;
  city: City;
  acquisitionType: BadgeAcquisition;
  createdAt: string;
}

export default function useBadgeHistoryQuery({
  region,
}: {
  region: keyof typeof badgePath;
}) {
  const badgeRegions = REVERSE_BADGE_MAPPER[region];
  const params = Array.isArray(badgeRegions)
    ? badgeRegions.join(',')
    : badgeRegions;
  const authAxios = useAuthAxios();

  const getBadgeHistory = async () => {
    const result = await authAxios.get<ServerResponse<BadgeHistoryResponse[]>>(
      `/api/user/badge/acquisition?regions=${params}`,
    );
    return result.data.result;
  };

  return useQuery({
    queryKey: [QUERY_KEYS.BADGE_HISTORY, region],
    queryFn: getBadgeHistory,
  });
}
