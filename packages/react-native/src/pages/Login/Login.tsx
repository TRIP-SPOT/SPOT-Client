import { SafeAreaView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SPOTLogo from '@assets/SPOTLogo';
import { LoginScreenProps } from '@routes/StackNavigator';
import { SocialLogin } from 'design-system';

export default function Login({ navigation }: LoginScreenProps) {
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
            <SocialLogin.Apple onPress={() => navigation.navigate('Landing')} />
          </View>
          <View>
            <SocialLogin.Kakao onPress={() => navigation.navigate('Landing')} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
