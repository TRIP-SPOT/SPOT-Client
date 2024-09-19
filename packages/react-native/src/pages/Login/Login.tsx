import { SafeAreaView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { login } from '@react-native-seoul/kakao-login';
import { SocialLogin } from 'design-system';
import SPOTLogo from '@assets/SPOTLogo';
import useLoginMutation from '@/apis/mutations/useLoginMutation';
import MutationLoadingModal from '@/components/common/MutationLoadingModal';

export default function Login() {
  const { loginMutate, isLoginPending } = useLoginMutation();

  const handleLogin = async () => {
    const token = await login();
    await loginMutate(token.accessToken);
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
          {/* <View>
            <SocialLogin.Apple onPress={handleLogin} />
          </View> */}
          <View>
            <SocialLogin.Kakao onPress={handleLogin} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
