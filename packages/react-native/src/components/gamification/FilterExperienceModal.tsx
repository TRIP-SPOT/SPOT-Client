import { Modal, TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import CancelIcon from '@/assets/CancelIcon';

interface FilterExperienceModal {
  visible: boolean;
  closeModal: () => void;
  modalAction: () => void;
}

export default function FilterExperienceModal({
  visible,
  closeModal,
  modalAction,
}: FilterExperienceModal) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center text-center px-8 bg-black/70">
        <View className="bg-[#191919] p-4 rounded-xl">
          <View className="justify-end flex-row">
            <TouchableOpacity onPress={closeModal} className="absolute right-0">
              <CancelIcon width={12} height={12} />
            </TouchableOpacity>
          </View>
          <View className="mt-6 mb-4 flex flex-col justify-center items-center">
            <View className="items-center flex flex-col justify-center">
              <Font.Bold type="body1" color="white">
                현재 해당 촬영지의 필터가 없습니다.
              </Font.Bold>
              <Font.Bold type="body1" color="white">
                다른 Spot! 필터를 체험해보세요.
              </Font.Bold>
            </View>
            <TouchableOpacity
              className="bg-Button-red px-3 py-2 rounded-xl items-center flex mt-9 w-full"
              onPress={() => {
                modalAction();
                closeModal();
              }}
            >
              <Font.Bold type="body1" color="white">
                Spot! 필터 체험해보기
              </Font.Bold>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
