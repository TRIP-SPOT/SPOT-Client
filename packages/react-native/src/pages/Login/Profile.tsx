import Header from '@/components/signup/Header';
import Overlay from '@/components/signup/Overlay';
import { SignupStackNavigation } from '@/routes/SignupStackNavigator';
import { Font } from 'design-system';
import { View } from 'react-native';

interface ProfileProps {
  navigation: SignupStackNavigation<'Signup/Profile'>;
}

export default function Profile({ navigation }: ProfileProps) {
  return (
    <Overlay>
      <Header
        onBack={() => navigation.goBack()}
        onCancel={() => navigation.goBack()}
      />
      <View className="flex w-full mt-[30px]">
        <Font type="mainTitle" color="white">
          사용할 프로필 사진을
        </Font>
        <Font type="mainTitle" color="white">
          설정하세요
        </Font>
      </View>
    </Overlay>
  );
}
