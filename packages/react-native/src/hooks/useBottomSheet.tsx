import { ReactNode, useRef } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

interface BottomSheetProps {
  isShow?: boolean;
  children: ReactNode;
  handleClose?: () => void;
}

const SNAP_POINTS = ['30%'];

const renderBackdropComponent = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    pressBehavior="close"
    // Backdrop이 등장하기 시작하는 bottom sheet의 index
    appearsOnIndex={0}
    // Backdrop이 사라지기 시작하는 bottom sheet의 index
    disappearsOnIndex={-1}
  />
);

export default function useBottomSheet() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  function BottomSheetComponent({
    isShow,
    handleClose,
    children,
  }: BottomSheetProps) {
    if (!isShow) {
      return null;
    }

    return (
      <BottomSheet
        backdropComponent={renderBackdropComponent}
        ref={bottomSheetRef}
        snapPoints={SNAP_POINTS}
        enablePanDownToClose
        onClose={handleClose}
      >
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheet>
    );
  }

  const hideBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const showBottonSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  return {
    BottomSheet: BottomSheetComponent,
    showBottonSheet,
    hideBottomSheet,
  };
}
