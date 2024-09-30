import { TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import { useNavigation } from '@react-navigation/native';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { StackNavigation } from '@/types/navigation';

export default function NoQuiz() {
  const navigation = useNavigation<StackNavigation<'Gamification/Quiz'>>();
  return (
    <BackGroundGradient withoutScroll>
      <View className="flex justify-center items-center flex-col flex-1">
        <View className="flex-col items-center">
          <Font.Bold type="title1" color="white">
            현재 위치 주변에서
          </Font.Bold>
          <Font.Bold type="title1" color="white">
            Spot!이 검색되지 않습니다.
          </Font.Bold>
          <Font.Bold type="title1" color="white">
            반경 20km 이내 촬영지만
          </Font.Bold>
          <Font.Bold type="title1" color="white">
            검색이 가능합니다.
          </Font.Bold>
        </View>
        <View className="mt-12 w-full px-16">
          <TouchableOpacity
            className="bg-Button-red rounded-xl py-2 px-3 w-full items-center justify-center"
            onPress={() => navigation.navigate('Camera', {})}
          >
            <Font.Bold type="body1" color="white">
              Spot! 필터 체험해보기
            </Font.Bold>
          </TouchableOpacity>
        </View>
      </View>
    </BackGroundGradient>
  );
}
