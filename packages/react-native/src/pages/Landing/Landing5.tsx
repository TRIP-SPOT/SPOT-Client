import { Font } from 'design-system';
import { Dimensions, Image, View } from 'react-native';
import WordBreak from '@/components/common/WordBreak';

const { width } = Dimensions.get('window');

export default function Landing5() {
  return (
    <View className="flex-1 items-center">
      <Font.Bold type="mainTitle" color="red">
        Travel Log
      </Font.Bold>
      <View className="mt-3 items-center">
        <WordBreak
          width={300}
          type="body2"
          color="white"
          content="여행 기록을 사진과 함께 저장하고,"
        />
        <WordBreak
          width={300}
          type="body2"
          color="white"
          content="나만의 여행 지도를 완성하세요"
        />
        <WordBreak width={300} type="body2" color="white" content="" />
      </View>
      <View>
        <Image
          // eslint-disable-next-line global-require
          source={require('../../assets/landing/landing5.png')}
          style={{ width, height: undefined, aspectRatio: 2.9 / 5 }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
