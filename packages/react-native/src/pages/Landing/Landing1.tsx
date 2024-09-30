import { Font } from 'design-system';
import { Dimensions, Image, View } from 'react-native';
import WordBreak from '@/components/common/WordBreak';

const { width } = Dimensions.get('window');

export default function Landing1() {
  return (
    <View className="flex-1 items-center">
      <Font.Bold type="mainTitle" color="red">
        Spot! (촬영지) 검색
      </Font.Bold>
      <View className="mt-3 items-center">
        <WordBreak
          width={200}
          type="body2"
          color="white"
          content="드라마/영화 제목으로"
        />
        <WordBreak
          width={300}
          type="body2"
          color="white"
          content="Spot(촬영지)을 검색하고, 상세정보를 확인하세요."
        />
      </View>
      <View
        style={{
          marginTop: -30,
        }}
      >
        <Image
          // eslint-disable-next-line global-require
          source={require('../../assets/landing/landing1.png')}
          style={{
            width,
            height: undefined,
            aspectRatio: 2.9 / 5,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
