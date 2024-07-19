import { Font } from 'design-system';
import { View } from 'react-native';
import Header from '@/components/signup/Header';
import Overlay from '@/components/signup/Overlay';
import { SignupStackNavigation } from '@/types/navigation';

interface NicknameProfileProps {
  navigation: SignupStackNavigation<'Signup/NicknameProfile'>;
}

export default function NicknameProfile({ navigation }: NicknameProfileProps) {
  return (
    <Overlay>
      <View>
        <Header
          onBack={() => navigation.goBack()}
          onCancel={() => navigation.goBack()}
        />
        <View className="flex w-full mt-[30px]">
          <Font type="mainTitle" color="white">
            배경 색상을
          </Font>
          <Font type="mainTitle" color="white">
            선택하세요
          </Font>
        </View>
      </View>
    </Overlay>
  );
}
