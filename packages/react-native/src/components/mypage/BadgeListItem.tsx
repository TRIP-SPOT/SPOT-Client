import { Font } from 'design-system';
import { View } from 'react-native';
import Badge, { badgePath } from '../common/Badge';
import Spacing from '../common/Spacing';
import withSuspense from '../HOC/withSuspense';
import useBadgeHistoryQuery from '@/apis/queries/mypage/useBadgeHistoryQuery';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';
import { ACQUISITION_MAPPER } from '@/constants/BADGE_ACQUISITION';

interface BadgeListItemProps {
  selectedBadge: keyof typeof badgePath;
}

export default withSuspense(
  function BadgeListItem({ selectedBadge }: BadgeListItemProps) {
    const { data: badgeHistory } = useBadgeHistoryQuery({
      region: selectedBadge,
    });

    return badgeHistory.map((badgeInfo, index) => (
      <View className="flex-row items-center justify-start py-4" key={index}>
        <View className="items-center justify-center mr-3">
          <Badge location={selectedBadge} preventFade width={80} />
        </View>
        <View>
          <Font type="title1" color="black">
            {getDisplayRegion({
              locationEnum: badgeInfo.region,
              cityEnum: badgeInfo.city,
              onlyCity: true,
            }) || ''}
          </Font>
          <Spacing height={8} />
          <Font type="ui-text" color="black">
            {badgeInfo.createdAt}
          </Font>
          <Font type="body3" color="black">
            {ACQUISITION_MAPPER[badgeInfo.acquisitionType]}
          </Font>
        </View>
      </View>
    ));
  },
  {
    fallback: (
      <View className="flex-1 justify-center items-center">
        <Font type="body1" color="black">
          잠시만
        </Font>
        <Font type="body1" color="black">
          기다려주세요
        </Font>
      </View>
    ),
  },
);
