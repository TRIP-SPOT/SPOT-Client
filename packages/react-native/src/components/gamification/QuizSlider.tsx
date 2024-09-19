import { useState } from 'react';
import { Dimensions, View, ViewToken } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { QuizzesResponse } from '@/apis/queries/quiz/useQuizzesQuery';
import Header from '@/components/common/Header';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import QuizCard from './QuizCard';

interface QuizSliderProps {
  quizListData: QuizzesResponse[];
}
const { width: fullWidth } = Dimensions.get('window');

export default function QuizSlider({ quizListData }: QuizSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const snapToOffset = quizListData.map((_, index) => index * fullWidth);

  const handleViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<QuizzesResponse>[];
  }) => {
    setCurrentIndex(viewableItems[0].index ?? 0);
  };

  return (
    <BackGroundGradient withoutScroll>
      <Header title={quizListData[currentIndex].workName} />
      <View className="flex-1 justify-center">
        <View className="justify-center items-center gap-2">
          <FlatList
            horizontal
            data={quizListData}
            snapToOffsets={snapToOffset}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: fullWidth,
                }}
              >
                <QuizCard quizData={item} />
              </View>
            )}
            onViewableItemsChanged={handleViewableItemsChanged}
          />
          <View className="flex flex-row gap-2 w-full justify-center">
            {quizListData.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-SPOT-red' : 'bg-Button-gray'}`}
              />
            ))}
          </View>
        </View>
      </View>
    </BackGroundGradient>
  );
}
