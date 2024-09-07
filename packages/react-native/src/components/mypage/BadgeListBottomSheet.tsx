import { useRef } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { Font } from 'design-system';
import { View } from 'react-native';
import { badgePath } from '../common/Badge';
import BadgeListItem from './BadgeListItem';

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
  const sheetRef = useRef<BottomSheet>(null);
  // FIXME: 실제 데이터 받아오기: selectedBadge를 기준으로 데이터를 받아오면 됨
  const mockData = [1, 2, 3, 4];

  return (
    <BottomSheet
      backdropComponent={renderBackdropComponent}
      ref={sheetRef}
      snapPoints={['60%']}
      enablePanDownToClose
      onClose={onClose}
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
        {mockData.map((_, index) => (
          <>
            <BadgeListItem key={`data-${index}`} location={selectedBadge} />
            {index !== mockData.length - 1 && (
              <View
                key={`sep-${index}`}
                className="h-[0.5px] bg-[#333333] bg-opacity-30 w-full"
              />
            )}
          </>
        ))}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
