import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Font } from 'design-system';
import { View } from 'react-native';
import { badgePath } from '../common/Badge';
import BadgeListItem from './BadgeListItem';
import BottomSheet from '../common/BottomSheet';

interface BadgeListBottomSheetProps {
  selectedBadge: keyof typeof badgePath;
  onClose: () => void;
}

export default function BadgeListBottomSheet({
  selectedBadge,
  onClose,
}: BadgeListBottomSheetProps) {
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
        <BadgeListItem selectedBadge={selectedBadge} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
