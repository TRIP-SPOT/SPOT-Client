import { Font } from 'design-system';
import { Dimensions, Image, View } from 'react-native';
import WordBreak from '@/components/common/WordBreak';

const { width } = Dimensions.get('window');

export default function Landing2() {
  return (
    <View className="flex-1 items-center">
      <Font.Bold type="mainTitle" color="red">
        주변 여행지 담기
      </Font.Bold>
      <View className="mt-3 items-center">
        <WordBreak
          width={300}
          type="body2"
          color="white"
          content="
            촬영지 주변 관광지, 음식점, 숙소 정보를 확인하세요."
        />
        <WordBreak
          width={300}
          type="body2"
          color="white"
          content="나의 여행에 담아 한 눈에 확인할 수도 있어요!"
        />
      </View>
      <View
        style={{
          marginTop: -30,
        }}
      >
        <Image
          source={require('../../assets/landing/landing2.png')}
          style={{ width, height: undefined, aspectRatio: 2.9 / 5 }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
