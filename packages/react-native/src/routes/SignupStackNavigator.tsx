import Niakname from '@/pages/Login/Nickname';
import Profile from '@/pages/Login/Profile';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

type SignupStackParamList = {
  'Signup/Nickname': undefined;
  'Signup/Profile': {
    nickname: string;
  };
};

export type SignupStackNavigation<T extends keyof SignupStackParamList> =
  StackNavigationProp<SignupStackParamList, T>;

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
