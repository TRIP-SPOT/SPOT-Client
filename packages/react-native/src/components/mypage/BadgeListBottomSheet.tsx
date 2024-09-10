import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Font } from 'design-system';
import { View } from 'react-native';
import { badgePath } from '../common/Badge';
import BadgeListItem from './BadgeListItem';
import BottomSheet from '../common/BottomSheet';

// FIXME: 실제 데이터 받아오기: selectedBadge를 기준으로 데이터를 받아오면 됨
const mockData = [
  { id: 1, title: '안동1', date: '2024. 08. 16.', content: 'SPOT! 퀴즈 정답' },
  { id: 2, title: '안동2', date: '2024. 08. 16.', content: 'SPOT! 퀴즈 정답' },
  { id: 3, title: '안동3', date: '2024. 08. 16.', content: 'SPOT! 퀴즈 정답' },
  { id: 4, title: '안동4', date: '2024. 08. 16.', content: 'SPOT! 퀴즈 정답' },
];

interface BadgeListBottomSheetProps {
  selectedBadge?: keyof typeof badgePath;
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
        {selectedBadge &&
          mockData.map((badgeInfo, index) => (
            <>
              <BadgeListItem
                key={`data-${badgeInfo.id}`}
                location={selectedBadge}
                title={badgeInfo.title}
                date={badgeInfo.date}
                content={badgeInfo.content}
              />
              {index !== mockData.length - 1 && (
                <View
                  key={`sep-${badgeInfo.id}`}
                  className="h-[0.5px] bg-[#333333] bg-opacity-30 w-full"
                />
              )}
            </>
          ))}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
