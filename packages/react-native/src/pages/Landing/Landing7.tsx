import { Font } from 'design-system';
import { Image, View } from 'react-native';
import WordBreak from '@/components/common/WordBreak';

export default function Landing7() {
  return (
    <View className="flex-1 items-center">
      <Font.Bold type="mainTitle" color="red">
        My Page
      </Font.Bold>
      <View className="mt-3 items-center">
        <WordBreak
          width={250}
          type="body2"
          color="white"
          content="Spot(촬영지)을 방문하고, 한국을 여행하며 Spot만의 한국 지역별 뱃지를 모아보세요!"
        />
        <WordBreak
          width={300}
          type="body2"
          color="white"
          content="뱃지를 많이 모을수록 여행자 레벨이 올라가요!"
        />
      </View>
      <View>
        {/* eslint-disable-next-line global-require */}
        <Image source={require('../../assets/landing/landing7.png')} />
      </View>
    </View>
  );
}
