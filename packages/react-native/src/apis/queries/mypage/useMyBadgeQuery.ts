import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';
import { BADGE_MAPPER, Region } from '@/constants/CITY';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import { ServerResponse } from '@/types/response';
import unique from '@/utils/unique';

interface BadgeResponse {
  region: Region;
  count: number;
}

export default function useMyBadgeQuery() {
  const authAxios = useAuthAxios();
  const getBadges = async () => {
    const result =
      await authAxios.get<ServerResponse<BadgeResponse[]>>('/api/user/badge');

    const badges = result.data.result.map((badge) => ({
      count: badge.count,
      badgeRegion: BADGE_MAPPER[badge.region],
    }));

    return unique(badges, 'badgeRegion');
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.MY_BADGES],
    queryFn: getBadges,
  });
}
