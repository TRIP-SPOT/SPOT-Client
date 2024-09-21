import { Font } from 'design-system';
import { Image, View } from 'react-native';
import WordBreak from '@/components/common/WordBreak';

export default function Landing3() {
  return (
    <View className="flex-1 items-center">
      <Font.Bold type="mainTitle" color="red">
        Trip Planner
      </Font.Bold>
      <View className="mt-3 items-center">
        <WordBreak
          width={300}
          type="body2"
          color="white"
          content="담은 Spot(촬영지)와 관련 관광지, 음식점 등으로 나만의 여행 루트를 계획해보세요"
        />
        <WordBreak width={300} type="body2" color="white" content="" />
      </View>
      <View>
        {/* eslint-disable-next-line global-require */}
        <Image source={require('../../assets/landing/landing3.png')} />
      </View>
    </View>
  );
}
