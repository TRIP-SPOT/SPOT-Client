import { createStackNavigator } from '@react-navigation/stack';
import Login from '@pages/Login/Login';
import TabScreens from '@pages/TabScreens';
import CameraPage from '@/pages/CameraPage';
import SignupStackNavigator from './SignupStackNavigator';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Landing: undefined;
  Camera: undefined;
  Home: undefined;
};

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Landing" component={TabScreens} />
      <Stack.Screen name="Signup" component={SignupStackNavigator} />
      <Stack.Screen name="Camera" component={CameraPage} />
    </Stack.Navigator>
  );
}
