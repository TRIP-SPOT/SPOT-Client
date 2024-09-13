import { TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import Rank from '@/components/mypage/Rank';
import EditButton from '@/components/common/EditButton';
import MyPageTabNavigator from '@/routes/MyPageTabNavigator';
import useNicknameQuery from '@/apis/queries/useNicknameQuery';
import { StackNavigation } from '@/types/navigation';
import CogWheelIcon from '@/assets/CogWheelIcon';
import useProfileImage from '@/hooks/useProfileImage';

interface MyPageProps {
  navigation: StackNavigation<'MyPage/Profile'>;
}

export default function MyPage({ navigation }: MyPageProps) {
  const { nickname } = useNicknameQuery();
  const { ProfileImage } = useProfileImage();

  return (
    <BackGroundGradient paddingTop={40} withoutScroll>
      <View className="flex-1">
        <View className="flex items-center gap-7">
          <View className="relative">
            <ProfileImage disableTouch />
            <View className="absolute right-0 bottom-0">
              <EditButton
                onPress={() => navigation.navigate('MyPage/EditProfile')}
              />
            </View>
          </View>
          <View className="flex flex-col items-center">
            <View>
              <Rank content="Beginner" />
            </View>
            <View className="mt-2">
              <Font type="mainTitle" color="white">
                {nickname?.value}
              </Font>
            </View>
          </View>
        </View>
        <TouchableOpacity
          className="absolute -top-4 right-0 p-4"
          activeOpacity={1}
          onPress={() => navigation.navigate('Setting/Main')}
        >
          <CogWheelIcon />
        </TouchableOpacity>
        <View className="flex-1">
          <MyPageTabNavigator />
        </View>
      </View>
    </BackGroundGradient>
  );
}
