import { Font } from 'design-system';
import { Dimensions, Image, View } from 'react-native';
import WordBreak from '@/components/common/WordBreak';

const { width } = Dimensions.get('window');

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
      <View
        style={{
          marginTop: -30,
        }}
      >
        <Image
          // eslint-disable-next-line global-require
          source={require('../../assets/landing/landing4.png')}
          style={{ width, height: undefined, aspectRatio: 2.9 / 5 }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
