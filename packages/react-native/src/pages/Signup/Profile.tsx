import { Button, Font } from 'design-system';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import Overlay from '@/components/signup/common/Overlay';
import { SignupRouteProps, SignupStackNavigation } from '@/types/navigation';
import useProfileImage from '@/hooks/useProfileImage';
import SignupHeader from '@/components/signup/common/Header';

interface ProfileProps {
  navigation: SignupStackNavigation<'Signup/Profile'>;
}

export default function Profile({ navigation }: ProfileProps) {
  const { ProfileImage, photoUri } = useProfileImage();
  const route = useRoute<SignupRouteProps<'Signup/Profile'>>();
  const { nickname } = route.params;

  const handleNext = () => {
    if (!photoUri) return;

    navigation.navigate('Main');
  };

  return (
    <Overlay>
      <View className="w-full h-full justify-between">
        <View>
          <SignupHeader
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
          <View className="w-full mt-[60px] justify-center items-center">
            <ProfileImage />
            <TouchableOpacity
              className="mt-[30px]"
              onPress={() =>
                navigation.navigate('Signup/NicknameProfile', { nickname })
              }
            >
              <Font.Bold type="body2" color="white" underline>
                닉네임으로 프로필 사진 설정하기
              </Font.Bold>
            </TouchableOpacity>
          </View>
        </View>
        <Button onPress={handleNext} disabled={photoUri === ''}>
          <Font.Bold type="body2" color="white">
            다음
          </Font.Bold>
        </Button>
      </View>
    </Overlay>
  );
}
