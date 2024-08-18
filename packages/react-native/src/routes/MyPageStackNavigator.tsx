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
      screenOptions={{ headerShown: false }}
      initialRouteName="myPage/profile"
    >
      <Stack.Screen name="myPage/profile" component={MyPage} />
      <Stack.Screen name="myPage/editProfile" component={EditProfile} />
      <Stack.Screen
        name="myPage/editProfileWithNickname"
        component={EditProfileWithNickname}
      />
    </Stack.Navigator>
  );
}
