/* eslint-disable global-require */
import { Font } from 'design-system';
import { Image, TouchableOpacity, View } from 'react-native';

export const badgePath = {
  서울: require('../../assets/badges/Seoul.png'),
  경기: require('../../assets/badges/Gyeonggi.png'),
  인천: require('../../assets/badges/Incheon.png'),
  강원: require('../../assets/badges/Gangwon.png'),
  충청: require('../../assets/badges/Chungbuk.png'),
  세종: require('../../assets/badges/Sejong.png'),
  대전: require('../../assets/badges/Daejeon.png'),
  전라: require('../../assets/badges/Jeonbuk.png'),
  광주: require('../../assets/badges/Gwangju.png'),
  경상: require('../../assets/badges/Gyeongbuk.png'),
  대구: require('../../assets/badges/Daegu.png'),
  울산: require('../../assets/badges/Ulsan.png'),
  부산: require('../../assets/badges/Busan.png'),
  제주: require('../../assets/badges/Jeju.png'),
} as const;

interface BadgeProps {
  location: keyof typeof badgePath;
  onPress?: () => void;
  label?: string;
  width?: number;
  count?: number;
  preventFade?: boolean; // count가 없는 경우 요소를 흐리게 표현할지 여부. true인 경우 count가 없어도 요소가 흐려지지 않음
}

export default function Badge({
  location,
  onPress,
  label,
  width = 120,
  count,
  preventFade = false,
}: BadgeProps) {
  return (
    <View className="mb-5">
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <Image source={badgePath[location]} style={{ width, height: width }} />
        {label && (
          <View className="items-center mt-2">
            <Font.Bold type="body2" color="white">
              {label}
            </Font.Bold>
          </View>
        )}
        {count ? (
          <View className="bg-white/80 rounded-full absolute top-2 left-3 h-6 w-6 items-center justify-center">
            <Font.Bold type="body3" color="black">
              {count}
            </Font.Bold>
          </View>
        ) : (
          !preventFade && (
            <View className="bg-black/80 absolute w-full h-full" />
          )
        )}
      </TouchableOpacity>
    </View>
  );
}
