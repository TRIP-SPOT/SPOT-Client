import { createStackNavigator } from '@react-navigation/stack';
import MyPage from '@/pages/MyPage';
import EditProfile from '@/pages/EditProfile';

const Stack = createStackNavigator();

export type MyPageStackParamList = {
  'myPage/profile': undefined;
  'myPage/editProfile': undefined;
};

export default function MyPageStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="myPage/profile"
    >
      <Stack.Screen name="myPage/profile" component={MyPage} />
      <Stack.Screen name="myPage/editProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}
