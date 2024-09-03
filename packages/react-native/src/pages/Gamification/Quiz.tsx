import { useState } from 'react';
import { View } from 'react-native';
import { Button, Font } from 'design-system';
import { useRoute } from '@react-navigation/native';
import useQuizQuery from '@/apis/queries/quiz/useQuizQuery';
import Header from '@/components/common/Header';
import QuizSelection from '@/components/gamification/QuizSelection';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { StackRouteProps } from '@/types/navigation';
import withSuspense from '@/components/HOC/withSuspense';

export default withSuspense(function Quiz() {
  const route = useRoute<StackRouteProps<'Gamification/Quiz'>>();
  const [selectedContent, setSelectedContent] = useState('');
  const { data } = useQuizQuery({ id: route.params.quizId });

  return (
    <BackGroundGradient>
      <Header title={data.title} />
      <View className="p-4 gap-9">
        <View className="gap-2.5">
          <View>
            <Font.Bold type="mainTitle" color="white">
              Q. {data.question}
            </Font.Bold>
          </View>
          <View>
            <Font type="body2" color="white">
              {data.description}
            </Font>
          </View>
        </View>
        <View className="flex flex-col justify-start gap-2.5 ">
          {data.choices.map((content) => (
            <View>
              <QuizSelection
                onPress={() => setSelectedContent(content)}
                isSelected={selectedContent === content}
                content={content}
              />
            </View>
          ))}
        </View>
        <View>
          <Button disabled={selectedContent.length === 0}>
            <Font.Bold color="white" type="title1">
              제출
            </Font.Bold>
          </Button>
        </View>
      </View>
    </BackGroundGradient>
  );
});
