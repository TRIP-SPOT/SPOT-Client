import { View } from 'react-native';
import { Font } from 'design-system';
import Header from '@/components/common/Header';
import BackGroundGradient from '@/layouts/BackGroundGradient';

export default function QuizLoading() {
  return (
    <BackGroundGradient withoutScroll>
      <Header type="logo" />
      <View className="flex-1 p-4 justify-center items-center gap-8">
        <View>
          <Font.Bold color="white" type="title1">
            현재 위치 주변
          </Font.Bold>
          <Font.Bold color="white" type="title1">
            촬영지(Spot!)를
          </Font.Bold>
          <Font.Bold color="white" type="title1">
            검색하고 있습니다...
          </Font.Bold>
        </View>
        <View className="p-3 flex justify-center items-center gap-4">
          <Font.Bold type="body2" color="white">
            Q. 지역 배지는 어떻게 받을 수 있나요?
          </Font.Bold>
          <View className="bg-[#191919] p-3 rounded-xl justify-center">
            <Font.Bold type="body3" color="white">
              해당 Spot에 직접 방문해서 ..
            </Font.Bold>
            <View className="mt-2">
              <Font.Bold type="body3" color="white">
                1. 퀴즈 풀고 배지 받기
              </Font.Bold>
              <Font.Bold type="body3" color="white">
                2. Spot! 필터 사용해서 촬영한 사진 저장하고 배지 받기
              </Font.Bold>
            </View>
          </View>
        </View>
      </View>
    </BackGroundGradient>
  );
}
