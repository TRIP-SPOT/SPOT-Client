import { createStackNavigator } from '@react-navigation/stack';
import MyPage from '@/pages/MyPage';
import EditProfile from '@/pages/MyPage/EditProfile';
import EditProfileWithNickname from '@/pages/MyPage/EditProfileWithNickname';

const Stack = createStackNavigator();

export default function MyPageStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MyPage/Profile"
    >
      <Stack.Screen name="MyPage/Profile" component={MyPage} />
      <Stack.Screen name="MyPage/EditProfile" component={EditProfile} />
      <Stack.Screen
        name="MyPage/EditProfileWithNickname"
        component={EditProfileWithNickname}
      />
    </Stack.Navigator>
  );
}
