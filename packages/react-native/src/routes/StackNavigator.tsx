import { createStackNavigator } from '@react-navigation/stack';
import Login from '@pages/Login/Login';
import TabScreens from '@pages/TabScreens';
import CameraPage from '@/pages/CameraPage';
import SignupStackNavigator from './SignupStackNavigator';
import { StackParamList } from '@/types/navigation';

const Stack = createStackNavigator<StackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={SignupStackNavigator} />
      <Stack.Screen name="Main" component={TabScreens} />
      <Stack.Screen name="Camera" component={CameraPage} />
    </Stack.Navigator>
  );
}
