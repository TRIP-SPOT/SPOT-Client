import { useSuspenseQuery } from '@tanstack/react-query';
import useAuthAxios from '@/apis/useAuthAxios';
import { badgePath } from '@/components/common/Badge';
import { Region } from '@/constants/CITY';
import QUERY_KEYS from '@/constants/QUERY_KEYS';
import { ServerResponse } from '@/types/response';

interface BadgeResponse {
  region: Region;
  count: number;
}

const badgeMapper = (badge: BadgeResponse): keyof typeof badgePath => {
  switch (badge.region) {
    case Region.SEOUL:
      return '서울';
    case Region.GYEONGGI:
      return '경기';
    case Region.INCHEON:
      return '인천';
    case Region.GANGWON:
      return '강원';
    case Region.SEJONG:
      return '세종';
    case Region.DAEJEON:
      return '대전';
    case Region.GWANGJU:
      return '광주';
    case Region.DAEGU:
      return '대구';
    case Region.ULSAN:
      return '울산';
    case Region.BUSAN:
      return '부산';
    case Region.CHUNGBUK || Region.CHUNGNAM:
      return '충청';
    case Region.GYEONGBUK || Region.GYEONGNAM:
      return '경상';
    case Region.JEONBUK || Region.JEONNAM:
      return '전라';
    case Region.JEJU:
    default:
      return '제주';
  }
};

export default function useMyBadgeQuery() {
  const authAxios = useAuthAxios();
  const getBadges = async () => {
    const result =
      await authAxios.get<ServerResponse<BadgeResponse[]>>('/api/user/badge');

    const badges = result.data.result.map((badge) => ({
      count: badge.count,
      badgeRegion: badgeMapper(badge),
    }));

    return badges;
  };

  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.MY_BADGES],
    queryFn: getBadges,
  });
}
