import { Font } from 'design-system';
import { View } from 'react-native';
import Header from '@/components/signup/Header';
import Overlay from '@/components/signup/Overlay';
import { SignupStackNavigation } from '@/types/navigation';

interface ProfileProps {
  navigation: SignupStackNavigation<'Signup/Profile'>;
}

export default function Profile({ navigation }: ProfileProps) {
  return (
    <Overlay>
      <Header
        onBack={() => navigation.goBack()}
        onCancel={() => navigation.navigate('Main')}
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
