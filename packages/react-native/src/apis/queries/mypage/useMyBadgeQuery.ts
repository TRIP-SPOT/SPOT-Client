import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';
import { BADGE_MAPPER, Region } from '@/constants/CITY';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import { ServerResponse } from '@/types/response';
import unique from '@/utils/unique';
import { badgePath } from '@/components/common/Badge';

interface BadgeResponse {
  region: Region;
  count: number;
}

interface Badge {
  count: number;
  badgeRegion: keyof typeof badgePath;
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

    return badges.reduce((merge, item) => {
      const findedItem = merge.find(
        (element) => element.badgeRegion === item.badgeRegion,
      );
      if (findedItem) {
        findedItem.count += item.count;
        return merge;
      }
      return [...merge, item];
    }, [] as Badge[]);
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.MY_BADGES],
    queryFn: getBadges,
  });
}
