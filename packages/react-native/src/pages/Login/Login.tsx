import { SafeAreaView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SPOTLogo from '@assets/SPOTLogo';
import { SocialLogin } from 'design-system';
import { ScreenNavigationProp } from '@/types/navigation';
import { AppStorage } from '@/utils/storage';

interface LoginPageProps {
  navigation: ScreenNavigationProp<'Login'>;
}

export default function Login({ navigation }: LoginPageProps) {
  const handleLogin = async () => {
    // TODO: 토큰 검사로 변경되어야함
    const nickname = await AppStorage.getData('nickname');

    if (!nickname) {
      return navigation.navigate('Signup');
    }

    return navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <LinearGradient
      colors={['#FF1919', '#000000']}
      start={{ x: 0, y: -0.5 }}
      end={{ x: 0, y: 0.5 }}
    >
      <SafeAreaView className="w-full h-full justify-evenly items-center p-4 flex ">
        <SPOTLogo />
        <View className="flex flex-col w-full px-4 gap-4">
          <View>
            <SocialLogin.Apple onPress={handleLogin} />
          </View>
          <View>
            <SocialLogin.Kakao onPress={handleLogin} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
