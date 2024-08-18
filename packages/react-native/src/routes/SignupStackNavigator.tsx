import { createStackNavigator } from '@react-navigation/stack';
import NickName from '@/pages/Signup/Nickname';
import Profile from '@/pages/Signup/Profile';
import NicknameProfile from '@/pages/Signup/NicknameProfile';

const Stack = createStackNavigator();

export default function SignupStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Signup/Nickname" component={NickName} />
      <Stack.Screen name="Signup/Profile" component={Profile} />
      <Stack.Screen name="Signup/NicknameProfile" component={NicknameProfile} />
    </Stack.Navigator>
  );
}
