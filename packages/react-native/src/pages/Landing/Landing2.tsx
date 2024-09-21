import { Font } from 'design-system';
import { Image, View } from 'react-native';
import WordBreak from '@/components/common/WordBreak';

export default function Landing2() {
  return (
    <View className="flex-1 items-center">
      <Font.Bold type="mainTitle" color="red">
        Spot! (촬영지) 검색
      </Font.Bold>
      <View className="mt-3 items-center">
        <WordBreak
          width={300}
          type="body2"
          color="white"
          content="
            드라마/영화 제목으로 Spot(촬영지)을 검색하고, 촬영지, 주변 관광지,
            음식점 정보를 확인하세요."
        />
        <WordBreak
          width={300}
          type="body2"
          color="white"
          content="나의 여행에 담아 한 눈에 확인할 수도 있어요!"
        />
      </View>
      <View>
        {/* eslint-disable-next-line global-require */}
        <Image source={require('../../assets/landing/landing2.png')} />
      </View>
    </View>
  );
}
