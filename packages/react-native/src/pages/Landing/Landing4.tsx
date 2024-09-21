import { Font } from 'design-system';
import { Image, View } from 'react-native';
import WordBreak from '@/components/common/WordBreak';

export default function Landing4() {
  return (
    <View className="flex-1 items-center">
      <Font.Bold type="mainTitle" color="red">
        Quiz & Filter
      </Font.Bold>
      <View className="mt-3 items-center">
        <WordBreak
          width={300}
          type="body2"
          color="white"
          content="Spot(촬영지)에 방문해서 퀴즈를 풀고,"
        />
        <WordBreak
          width={300}
          type="body2"
          color="white"
          content="주인공과 함께 사진을 찍어보세요!"
        />
        <WordBreak width={300} type="body2" color="white" content="" />
      </View>
      <View>
        {/* eslint-disable-next-line global-require */}
        <Image source={require('../../assets/landing/landing4.png')} />
      </View>
    </View>
  );
}
