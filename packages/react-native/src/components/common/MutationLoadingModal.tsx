import { Modal, View } from 'react-native';
import { Font } from 'design-system';
import LoadingIcon from '@/assets/LoadingIcon';

interface MutationLoadingModalProps {
  isSubmiting: boolean;
}

export default function MutationLoadingModal({
  isSubmiting,
}: MutationLoadingModalProps) {
  return (
    <Modal visible={isSubmiting} transparent animationType="fade">
      <View className="flex-1 justify-center text-center px-8">
        <View className="p-4 bg-[#191919] rounded-lg">
          <LoadingIcon />
          <View className="mt-5">
            <Font type="body1" color="white">
              잠시만
            </Font>

            <Font type="body1" color="white">
              기다려주세요
            </Font>
          </View>
        </View>
      </View>
    </Modal>
  );
}
