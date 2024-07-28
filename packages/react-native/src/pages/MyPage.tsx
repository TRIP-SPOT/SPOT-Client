import { Alert, View } from 'react-native';
import { Font } from 'design-system';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import SelectProfile from '@/assets/SelectProfile';
import Badge from '@/components/mypage/Badge';
import EditButton from '@/components/common/EditButton';
import MyPageTabNavigator from '@/routes/MyPageTabNavigator';

export default function MyPage() {
  return (
    <BackGroundGradient>
      <View className="flex pt-16">
        <View className="flex items-center gap-7">
          {/* FIXME: 실제 이미지 받아와서 설정 */}
          <View className="relative">
            <SelectProfile />
            <View className="absolute right-0 bottom-0">
              <EditButton
                onPress={() => {
                  Alert.alert('변경');
                }}
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
                닉네임네임
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
