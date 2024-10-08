import { Button, Font } from 'design-system';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import Overlay from '@/components/signup/common/Overlay';
import useProfileImage from '@/hooks/useProfileImage';
import SignupHeader from '@/components/signup/common/Header';
import { AppStorage } from '@/utils/storage';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import useProfileImageMutation from '@/apis/mutations/useProfileImageMutation';
import MutationLoadingModal from '@/components/common/MutationLoadingModal';

interface ProfileProps {
  navigation: StackNavigation<'Signup/Profile'>;
}

export default function Profile({ navigation }: ProfileProps) {
  const { ProfileImage, photoAsset } = useProfileImage();
  const { postMutate, isPostPending } = useProfileImageMutation();
  const route = useRoute<StackRouteProps<'Signup/Profile'>>();
  const { nickname } = route.params;

  const handleNext = async () => {
    if (!photoAsset) return;

    await postMutate(photoAsset);
    await AppStorage.saveData({
      key: 'nickname',
      value: {
        value: nickname,
      },
    });
    navigation.reset({ routes: [{ name: 'Main' }] });
  };

  return (
    <Overlay>
      <MutationLoadingModal isSubmiting={isPostPending} />
      <View className="w-full h-full justify-between">
        <View>
          <SignupHeader
            onBack={() => navigation.goBack()}
            onCancel={() => navigation.navigate('Login')}
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
        <Button onPress={handleNext} disabled={photoAsset?.uri === ''}>
          <Font.Bold type="body2" color="white">
            다음
          </Font.Bold>
        </Button>
      </View>
    </Overlay>
  );
}
