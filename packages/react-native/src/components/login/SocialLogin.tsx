import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppleIcon from '../../assets/AppleIcon';
import { Font } from 'design-system';
import KakaoIcon from '../../assets/KakaoIcon';

export function AppleLogin() {
  return (
    <TouchableOpacity className="relative p-4 bg-[#616161] rounded-[10px]  justify-center items-center">
      <View className="absolute left-0 top-0 right-0 bottom-0 h-full p-4 flex justify-start items-start">
        <AppleIcon />
      </View>
      <Font.Bold type="body1" color="white">
        Apple로 계속하기
      </Font.Bold>
      <View />
    </TouchableOpacity>
  );
}

export function KakaoLogin() {
  return (
    <TouchableOpacity className="relative p-4 bg-[#FEE502] rounded-[10px]  justify-center items-center">
      <View className="absolute left-0 top-0 right-0 bottom-0 h-full p-4 flex justify-start items-start">
        <KakaoIcon />
      </View>
      <Font.Bold type="body1" color="black">
        Kakao로 계속하기
      </Font.Bold>
      <View />
    </TouchableOpacity>
  );
}
