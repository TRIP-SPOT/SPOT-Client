import { Text, TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import SelectProfile from '@/assets/SelectProfile';
import Rank from '@/components/mypage/Rank';
import EditButton from '@/components/common/EditButton';
import MyPageTabNavigator from '@/routes/MyPageTabNavigator';
import useNicknameQuery from '@/apis/queries/useNicknameQuery';
import { StackNavigation } from '@/types/navigation';
import CogWheelIcon from '@/assets/CogWheelIcon';

interface MyPageProps {
  navigation: StackNavigation<'MyPage/Profile'>;
}

export default function MyPage({ navigation }: MyPageProps) {
  const { nickname } = useNicknameQuery();

  return (
    <BackGroundGradient paddingTop={40} withoutScroll>
      <View className="flex-1">
        <View className="flex items-center gap-7">
          {/* FIXME: 실제 이미지 받아와서 설정 */}
          <View className="relative">
            {nickname?.colorSet ? (
              <View
                className="w-[140px] h-[140px] rounded-full justify-center items-center"
                style={{
                  backgroundColor: nickname.colorSet.bgColor,
                }}
              >
                <Text
                  className="font-Pretendard-Medium text-[40px]"
                  style={{
                    color: nickname.colorSet.color,
                  }}
                >
                  {nickname.value}
                </Text>
              </View>
            ) : (
              <SelectProfile />
            )}
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
              {/* FIXME: 실제 닉네임 받아와서 설정 */}
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
