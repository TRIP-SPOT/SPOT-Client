import { Modal, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Font } from 'design-system';
import { QuizSubmitResponse } from '@/apis/mutations/useQuizSubmitMutation';
import CancelIcon from '@/assets/CancelIcon';
import { BADGE_MAPPER, REGION, REVERSE_REGION_MAPPER } from '@/constants/CITY';
import Badge from '../common/Badge';
import { StackNavigation } from '@/types/navigation';

interface QuizResultModalProps {
  modalContent?: QuizSubmitResponse;
  closeModal: () => void;
}

export default function QuizResultModal({
  modalContent,
  closeModal,
}: QuizResultModalProps) {
  const navigate = useNavigation<StackNavigation<'Gamification/Quiz'>>();
  const region = modalContent && REVERSE_REGION_MAPPER[modalContent.location];
  const city =
    region &&
    Object.entries(REGION[region]).find((entry) => {
      return entry[1] === modalContent.city;
    });

  const renderModalHeader = () => {
    if (!modalContent) {
      return null;
    }

    return (
      <View className="justify-center flex-row">
        <Font type="body1" color="white">
          {modalContent.isCorrect ? '정답' : '오답'}
        </Font>
        <TouchableOpacity onPress={closeModal} className="absolute right-0">
          <CancelIcon />
        </TouchableOpacity>
      </View>
    );
  };

  const renderModalContent = () => {
    if (!modalContent) {
      return null;
    }
    if (!modalContent.isCorrect) {
      return (
        <>
          <View className="justify-center gap-2 flex-row items-center flex mt-6 mb-6">
            <Font.Bold type="title1" color="white">
              다시 도전해볼까요?
            </Font.Bold>
          </View>
          <View className="flex-row flex gap-4 justify-center items-center">
            <TouchableOpacity
              className="bg-SPOT-red px-10 py-2 rounded-xl justify-center items-center flex"
              onPress={closeModal}
            >
              <Font.Bold type="body1" color="white">
                재시도
              </Font.Bold>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-Button-gray px-10 py-2 rounded-xl justify-center items-center flex"
              onPress={() => {
                closeModal();
                navigate.navigate('Gamification/Main');
              }}
            >
              <Font.Bold type="body1" color="white">
                그만하기
              </Font.Bold>
            </TouchableOpacity>
          </View>
        </>
      );
    }

    return (
      <>
        <View className="justify-center gap-2 flex-row items-center flex mt-6">
          <View>
            <Font.Bold type="title1" color="white">
              {region}
            </Font.Bold>
          </View>
          <View>
            <Font.Bold type="title1" color="white">
              {city?.[0]}
            </Font.Bold>
          </View>
        </View>
        <View className="justify-center items-center">
          <Font type="body1" color="white">
            배지를 1개 획득했습니다.
          </Font>
          <View className="p-4">
            <Badge preventFade location={BADGE_MAPPER[modalContent.location]} />
          </View>
        </View>
      </>
    );
  };

  if (!modalContent) {
    return null;
  }

  return (
    <Modal visible={Boolean(modalContent)} transparent animationType="fade">
      <View className="flex-1 justify-center text-center px-8">
        <View className="p-4 bg-[#191919] rounded-lg">
          {renderModalHeader()}
          {renderModalContent()}
        </View>
      </View>
    </Modal>
  );
}
