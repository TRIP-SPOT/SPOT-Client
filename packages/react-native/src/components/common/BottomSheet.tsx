import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

interface BottomSheetProps {
  isShow: boolean;
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

export default function BottomSheet({
  isShow,
  handleClose,
  children,
  snapPoints,
}: BottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isShow) {
      bottomSheetRef.current?.present();
      return () => {
        bottomSheetRef.current?.dismiss();
      };
    }

    bottomSheetRef.current?.dismiss();
    return () => {
      bottomSheetRef.current?.dismiss();
    };
  }, [bottomSheetRef.current]);

  return (
    <BottomSheetModal
      backdropComponent={renderBackdropComponent}
      ref={bottomSheetRef}
      snapPoints={snapPoints || SNAP_POINTS}
      enablePanDownToClose
      onChange={(index) => index === -1 && handleClose && handleClose()}
    >
      {children}
    </BottomSheetModal>
  );
}
