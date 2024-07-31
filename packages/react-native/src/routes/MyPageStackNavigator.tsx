import { createStackNavigator } from '@react-navigation/stack';
import MyPage from '@/pages/MyPage';
import EditProfile from '@/pages/MyPage/EditProfile';
import EditProfileWithNickname from '@/pages/MyPage/EditProfileWithNickname';

const Stack = createStackNavigator();

export type MyPageStackParamList = {
  'myPage/profile': undefined;
  'myPage/editProfile': undefined;
  'myPage/editProfileWithNickname': { nickname: string };
};

export default function MyPageStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Pretendard-Medium',
          fontSize: 16,
          lineHeight: 24,
        },
      }}
      initialRouteName="myPage/profile"
    >
      <Stack.Screen name="myPage/profile" component={MyPage} />
      <Stack.Screen
        name="myPage/editProfile"
        component={EditProfile}
        options={{
          headerShown: true,
          title: '프로필 수정',
        }}
      />
      <Stack.Screen
        name="myPage/editProfileWithNickname"
        component={EditProfileWithNickname}
        options={{
          headerShown: true,
          title: '배경 색상 선택',
        }}
      />
    </Stack.Navigator>
  );
}
