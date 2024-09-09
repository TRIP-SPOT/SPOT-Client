import { useEffect, useRef } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { Font } from 'design-system';
import { View } from 'react-native';
import { badgePath } from '../common/Badge';
import BadgeListItem from './BadgeListItem';

// FIXME: 실제 데이터 받아오기: selectedBadge를 기준으로 데이터를 받아오면 됨
const mockData = [
  { id: 1, title: '안동1', date: '2024. 08. 16.', content: 'SPOT! 퀴즈 정답' },
  { id: 2, title: '안동2', date: '2024. 08. 16.', content: 'SPOT! 퀴즈 정답' },
  { id: 3, title: '안동3', date: '2024. 08. 16.', content: 'SPOT! 퀴즈 정답' },
  { id: 4, title: '안동4', date: '2024. 08. 16.', content: 'SPOT! 퀴즈 정답' },
];

const renderBackdropComponent = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    pressBehavior="close"
    appearsOnIndex={0}
    disappearsOnIndex={-1}
  />
);

interface BadgeListBottomSheetProps {
  selectedBadge: keyof typeof badgePath;
  onClose: () => void;
}

export default function BadgeListBottomSheet({
  selectedBadge,
  onClose,
}: BadgeListBottomSheetProps) {
  const sheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    sheetRef.current?.present();
    return () => {
      sheetRef.current?.dismiss();
    };
  }, [sheetRef.current]);

  return (
    <BottomSheetModal
      backdropComponent={renderBackdropComponent}
      ref={sheetRef}
      snapPoints={['60%']}
      enablePanDownToClose
      onDismiss={onClose}
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
        {mockData.map((badgeInfo, index) => (
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
    </BottomSheetModal>
  );
}
