import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Button, Font } from 'design-system';
import { MyPageRouteProps, MyPageStackNavigation } from '@/types/navigation';
import BackGroundGradient from '@/layouts/BackGroundGradient';

interface EditProfileWithNicknameProps {
  navigation: MyPageStackNavigation<'myPage/editProfileWithNickname'>;
}

export default function EditProfileWithNickname({
  navigation,
}: EditProfileWithNicknameProps) {
  const route = useRoute<MyPageRouteProps<'myPage/editProfileWithNickname'>>();
  const { nickname } = route.params;

  return (
    <>
      <BackGroundGradient>
        <View>
          <Text>{nickname}</Text>
        </View>
      </BackGroundGradient>

      <View className="bottom-16">
        <Button onPress={() => navigation.navigate('myPage/editProfile')}>
          <Font.Bold type="title1" color="white">
            완료
          </Font.Bold>
        </Button>
      </View>
    </>
  );
}
