import { Font } from 'design-system';
import { View } from 'react-native';
import MockUp from '@/components/landing/MockUp';

export default function Landing2() {
  return (
    <View className="flex-1 items-center">
      <Font.Bold type="mainTitle" color="red">
        Spot! (촬영지) 검색
      </Font.Bold>
      <View className="mt-3 items-center">
        <Font type="body2" color="white">
          Travel Log를 만들어
        </Font>
        <Font type="body2" color="white">
          함께 여행하는 사람들을 초대해보세요!
        </Font>
      </View>
      <View className="mt-7">
        <MockUp />
      </View>
    </View>
  );
}
