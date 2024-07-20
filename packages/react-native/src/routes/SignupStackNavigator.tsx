import { createStackNavigator } from '@react-navigation/stack';
import Niakname from '@/pages/Signup/Nickname';
import Profile from '@/pages/Signup/Profile';
import NicknameProfile from '@/pages/Signup/NicknameProfile';

const Stack = createStackNavigator();

export type SignupStackParamList = {
  'Signup/Nickname': undefined;
  'Signup/Profile': {
    nickname: string;
  };
  'Signup/NicknameProfile': {
    nickname: string;
  };
  Main: undefined;
};

export default function SignupStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Signup/Nickname" component={Niakname} />
      <Stack.Screen name="Signup/Profile" component={Profile} />
      <Stack.Screen name="Signup/NicknameProfile" component={NicknameProfile} />
    </Stack.Navigator>
  );
}
