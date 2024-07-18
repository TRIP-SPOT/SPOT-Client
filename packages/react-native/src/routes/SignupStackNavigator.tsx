import { createStackNavigator } from '@react-navigation/stack';
import Niakname from '@/pages/Login/Nickname';
import Profile from '@/pages/Login/Profile';

const Stack = createStackNavigator();

export type SignupStackParamList = {
  'Signup/Nickname': undefined;
  'Signup/Profile': {
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
    </Stack.Navigator>
  );
}
