import { View } from 'react-native';
import { Font } from 'design-system';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import SelectProfile from '@/assets/SelectProfile';
import Badge from '@/components/mypage/Badge';
import EditButton from '@/components/common/EditButton';
import MyPageTabNavigator from '@/routes/MyPageTabNavigator';
import useNicknameQuery from '@/apis/queries/useNicknameQuery';
import { StackNavigation } from '@/types/navigation';

interface MyPageProps {
  navigation: StackNavigation<'MyPage/Profile'>;
}

export default function MyPage({ navigation }: MyPageProps) {
  const { nickname } = useNicknameQuery();
  return (
    <BackGroundGradient marginTop={40}>
      <View className="flex">
        <View className="flex items-center gap-7">
          {/* FIXME: 실제 이미지 받아와서 설정 */}
          <View className="relative">
            <SelectProfile />
            <View className="absolute right-0 bottom-0">
              <EditButton
                onPress={() => navigation.navigate('MyPage/EditProfile')}
              />
            </View>
          </View>
          <View className="flex flex-col items-center">
            <View>
              <Badge content="Beginner" />
            </View>
            <View className="mt-2">
              {/* FIXME: 실제 닉네임 받아와서 설정 */}
              <Font type="mainTitle" color="white">
                {nickname}
              </Font>
            </View>
          </View>
        </View>
        <View className="p-5 h-96">
          <MyPageTabNavigator />
        </View>
      </View>
    </BackGroundGradient>
  );
}
