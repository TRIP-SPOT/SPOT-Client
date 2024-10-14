import { PropsWithChildren } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import CancelIcon from '@/assets/CancelIcon';

interface BadgeModalProps {
  visible: boolean;
  headerTitle?: string;
  handleClose: () => void;
}

export default function BadgeModal({
  visible,
  headerTitle,
  handleClose,
  children,
}: PropsWithChildren<BadgeModalProps>) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center text-center px-8">
        <View className="p-4 bg-[#191919] rounded-xl">
          <View className="justify-center flex-row">
            {headerTitle && (
              <Font type="body1" color="white">
                {headerTitle}
              </Font>
            )}
            <TouchableOpacity
              onPress={handleClose}
              className="absolute right-0"
            >
              <CancelIcon />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}
