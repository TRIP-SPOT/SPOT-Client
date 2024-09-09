import { View } from 'react-native';
import { Font } from 'design-system';
import BackGroundGradient from '@/layouts/BackGroundGradient';

export default function NoQuiz() {
  return (
    <BackGroundGradient withoutScroll>
      <View className="flex justify-center items-center flex-col flex-1">
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
    </BackGroundGradient>
  );
}
