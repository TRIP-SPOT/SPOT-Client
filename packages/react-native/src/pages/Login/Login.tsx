import { SafeAreaView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { login } from '@react-native-seoul/kakao-login';
import { SocialLogin } from 'design-system';
import SPOTLogo from '@assets/SPOTLogo';
import { StackNavigation } from '@/types/navigation';
import { AppStorage } from '@/utils/storage';
import useLoginMutation from '@/apis/mutations/useLoginMutation';
import MutationLoadingModal from '@/components/common/MutationLoadingModal';

interface LoginPageProps {
  navigation: StackNavigation<'Login'>;
}

export default function Login({ navigation }: LoginPageProps) {
  const { loginMutate, isLoginPending } = useLoginMutation();

  const handleLogin = async () => {
    const token = await login();
    await loginMutate(token.accessToken);

    // TODO: 토큰 검사로 변경되어야함
    const nickname = await AppStorage.getData('nickname');

    if (!nickname) {
      return navigation.navigate('Signup');
    }

    return navigation.reset({ routes: [{ name: 'Main' }] });
  };

  return (
    <LinearGradient
      colors={['#FF1919', '#000000']}
      start={{ x: 0, y: -0.5 }}
      end={{ x: 0, y: 0.5 }}
    >
      <MutationLoadingModal isSubmiting={isLoginPending} />
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
