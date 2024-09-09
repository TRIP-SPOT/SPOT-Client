import { ReactNode, useEffect, useRef } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

interface BottomSheetProps {
  isShow?: boolean;
  children: ReactNode;
  handleClose?: () => void;
  snapPoints?: string[];
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
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function BottomSheetComponent({
    isShow,
    handleClose,
    children,
    snapPoints,
  }: BottomSheetProps) {
    useEffect(() => {
      if (!isShow) {
        bottomSheetRef.current?.dismiss();
        return;
      }

      bottomSheetRef.current?.present();
      // eslint-disable-next-line consistent-return
      return () => {
        bottomSheetRef.current?.dismiss();
      };
    }, [bottomSheetRef.current, isShow]);

    if (!isShow) {
      return null;
    }

    return (
      <BottomSheetModal
        backdropComponent={renderBackdropComponent}
        ref={bottomSheetRef}
        snapPoints={snapPoints || SNAP_POINTS}
        enablePanDownToClose
        onDismiss={handleClose}
      >
        {children}
      </BottomSheetModal>
    );
  }

  const hideBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
  };

  const showBottonSheet = () => {
    bottomSheetRef.current?.present();
  };

  return {
    BottomSheet: BottomSheetComponent,
    showBottonSheet,
    hideBottomSheet,
  };
}
