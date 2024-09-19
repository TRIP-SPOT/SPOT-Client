import { useState } from 'react';
import { View } from 'react-native';
import { Button, Font } from 'design-system';
import { useNavigation, useRoute } from '@react-navigation/native';
import useQuizQuery from '@/apis/queries/quiz/useQuizQuery';
import Header from '@/components/common/Header';
import QuizSelection from '@/components/gamification/QuizSelection';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import withSuspense from '@/components/HOC/withSuspense';
import useQuizSubmitMutation, {
  QuizSubmitResponse,
} from '@/apis/mutations/useQuizSubmitMutation';
import QuizResultModal from '@/components/gamification/QuizResultModal';

export default withSuspense(function Quiz() {
  const navigate = useNavigation<StackNavigation<'Gamification/Quiz'>>();
  const route = useRoute<StackRouteProps<'Gamification/Quiz'>>();
  const [selectedContent, setSelectedContent] = useState('');
  const { data } = useQuizQuery({ id: route.params.quizId });
  const { submitQuiz } = useQuizSubmitMutation();
  const [modalContent, setModalContent] = useState<QuizSubmitResponse>();

  const handleCloseModal = () => {
    setModalContent(undefined);
    if (modalContent?.isCorrect) {
      navigate.navigate('Gamification/Main');
    }
  };

  const handleSubmit = async () => {
    const result = await submitQuiz({
      answer: selectedContent,
    });

    if (result) {
      setModalContent(result);
    }
  };

  return (
    <BackGroundGradient>
      <Header title={route.params.quizWorkName} />
      <View className="p-4 gap-9">
        <View className="gap-2.5">
          <View>
            <Font.Bold type="mainTitle" color="white">
              Q. {data.question}
            </Font.Bold>
          </View>
        </View>
        <View className="flex flex-col justify-start gap-2.5 ">
          {data.choices.map((content) => (
            <View key={content}>
              <QuizSelection
                onPress={() => setSelectedContent(content)}
                isSelected={selectedContent === content}
                content={content}
              />
            </View>
          ))}
        </View>
        <View>
          <Button
            disabled={selectedContent.length === 0}
            onPress={handleSubmit}
          >
            <Font.Bold color="white" type="title1">
              제출
            </Font.Bold>
          </Button>
        </View>
        <QuizResultModal
          modalContent={modalContent}
          closeModal={handleCloseModal}
        />
      </View>
    </BackGroundGradient>
  );
});
