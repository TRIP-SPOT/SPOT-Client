import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Font } from 'design-system';
import { View } from 'react-native';
import { badgePath } from '../common/Badge';
import BadgeListItem from './BadgeListItem';
import BottomSheet from '../common/BottomSheet';
import useBadgeHistoryQuery from '@/apis/queries/mypage/useBadgeHistoryQuery';
import { REVERSE_REGION_MAPPER } from '@/constants/CITY';
import { ACQUISITION_MAPPER } from '@/constants/BADGE_ACQUISITION';

interface BadgeListBottomSheetProps {
  selectedBadge: keyof typeof badgePath;
  onClose: () => void;
}

export default function BadgeListBottomSheet({
  selectedBadge,
  onClose,
}: BadgeListBottomSheetProps) {
  const { data: badgeHistory } = useBadgeHistoryQuery({
    region: selectedBadge,
  });

  return (
    <BottomSheet
      isShow={Boolean(selectedBadge)}
      snapPoints={['60%']}
      handleClose={onClose}
    >
      <View className="items-center my-2">
        <Font.Bold type="mainTitle" color="black">
          {selectedBadge}
        </Font.Bold>
      </View>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16 }}
      >
        {selectedBadge &&
          badgeHistory?.map((badgeInfo, index) => (
            <BadgeListItem
              key={`data-${index}`}
              location={selectedBadge}
              title={REVERSE_REGION_MAPPER[badgeInfo.region]}
              date={badgeInfo.createdAt}
              content={ACQUISITION_MAPPER[badgeInfo.acquisitionType]}
            />
          ))}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
