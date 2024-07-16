import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppleIcon from './assets/AppleIcon';
import { Color, Font } from 'design-system';
import KakaoIcon from './assets/KakaoIcon';

type SocialLogin = 'apple' | 'kakao';
type SocialLoginConstant<T = string> = {
  [key in SocialLogin]: T;
};

interface SocialLoginButtonProps {
  onPress: () => void;
}

interface LoginButtonProps extends SocialLoginButtonProps {
  type: SocialLogin;
}

const BG_COLOR: SocialLoginConstant = {
  apple: 'bg-[#616161]',
  kakao: 'bg-[#FEE502]',
};

const MESSAGE: SocialLoginConstant = {
  apple: 'Apple로 계속하기',
  kakao: 'Kakao로 계속하기',
};

const COLOR: SocialLoginConstant<Color> = {
  apple: 'white',
  kakao: 'black',
};
const ICON: SocialLoginConstant<React.JSX.Element> = {
  apple: <AppleIcon />,
  kakao: <KakaoIcon />,
};

export function LoginButton({ type, onPress }: LoginButtonProps) {
  return (
    <TouchableOpacity
      className={`relative p-4 ${BG_COLOR[type]} rounded-[10px] justify-center items-center w-full`}
      onPress={onPress}
    >
      <View className="absolute left-0 top-0 right-0 bottom-0 h-full p-4 flex justify-start items-start">
        {ICON[type]}
      </View>
      <Font.Bold type="body1" color={COLOR[type]}>
        {MESSAGE[type]}
      </Font.Bold>
      <View />
    </TouchableOpacity>
  );
}

export const SocialLogin = {
  Apple: ({ onPress }: SocialLoginButtonProps) => (
    <LoginButton type="apple" onPress={onPress} />
  ),
  Kakao: ({ onPress }: SocialLoginButtonProps) => (
    <LoginButton type="kakao" onPress={onPress} />
  ),
};
