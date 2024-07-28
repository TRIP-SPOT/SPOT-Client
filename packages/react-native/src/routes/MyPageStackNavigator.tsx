import { createStackNavigator } from '@react-navigation/stack';
import MyPage from '@/pages/MyPage';
import EditProfile from '@/pages/MyPage/EditProfile';

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
      <Stack.Screen
        name="myPage/editProfile"
        component={EditProfile}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: '프로필 수정',
          headerTitleStyle: {
            fontFamily: 'Pretendard-Medium',
            fontSize: 16,
            lineHeight: 24,
          },
        }}
      />
    </Stack.Navigator>
  );
}
