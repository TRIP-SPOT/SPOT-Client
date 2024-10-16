import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import { useNavigation } from '@react-navigation/native';
import { QuizzesResponse } from '@/apis/queries/quiz/useQuizzesQuery';
import { StackNavigation } from '@/types/navigation';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';
import useToggle from '@/hooks/useToggle';
import FilterExperienceModal from './FilterExperienceModal';
import SPOTLogo from '@/assets/SPOTLogo';

interface QuizCardProps {
  quizData: QuizzesResponse;
}

const { width: fullWidth } = Dimensions.get('window');

export const QUIZ_CARD_SIZE = (fullWidth * 80) / 100;

export default function QuizCard({ quizData }: QuizCardProps) {
  const navigate = useNavigation<StackNavigation<'Gamification/Main'>>();
  const [experiencezModalShow, setExperienceModalShow] = useToggle(false);
  const handleClickQuizStart = () => {
    navigate.navigate('Gamification/Quiz', {
      quizId: quizData.quizId,
      quizWorkName: quizData.workName,
    });
  };

  const handleClickFilter = () => {
    if (quizData.filterImage) {
      navigate.navigate('Camera', {
        filterUrl: quizData.filterImage,
      });
      return;
    }
    setExperienceModalShow(true);
  };

  return (
    <View
      style={{
        display: 'flex',
        width: QUIZ_CARD_SIZE,
      }}
    >
      <FilterExperienceModal
        visible={experiencezModalShow}
        closeModal={() => setExperienceModalShow(false)}
        modalAction={() => navigate.navigate('Camera', {})}
      />
      <Image
        source={{
          uri: quizData.imageUrl,
        }}
        style={{
          width: QUIZ_CARD_SIZE,
          height: QUIZ_CARD_SIZE,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        className="bg-SPOT-red/30"
      />
      {!quizData.imageUrl && (
        <View className="items-center justify-center absolute w-full h-3/4">
          <SPOTLogo color="black" />
        </View>
      )}
      <View className="bg-[#191919] rounded-b-3xl p-3">
        <View className="flex gap-1">
          <View className="justify-center items-center gap-1 flex flex-col">
            <Font.Bold type="title1" color="white">
              {quizData.workName}
            </Font.Bold>
            <View>
              <Font.Bold type="body2" color="white">
                {quizData.spotName}
              </Font.Bold>
            </View>
            <View>
              <Font.Bold type="ui-text" color="white">
                {getDisplayRegion({
                  locationEnum: quizData.region,
                  cityEnum: quizData.city,
                })}
              </Font.Bold>
            </View>
          </View>
          <View className="flex gap-3 flex-row justify-center py-3">
            <TouchableOpacity
              className="bg-SPOT-red justify-center items-center px-6 py-1.5 rounded-lg"
              onPress={handleClickQuizStart}
            >
              <Font.Bold type="body3" color="white">
                퀴즈 풀기
              </Font.Bold>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-Button-gray justify-center items-center px-6 py-1.5 rounded-lg"
              onPress={handleClickFilter}
            >
              <Font.Bold type="body3" color="white">
                Spot! 필터
              </Font.Bold>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
