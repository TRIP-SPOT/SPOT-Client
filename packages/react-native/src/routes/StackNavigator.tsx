import { createStackNavigator } from '@react-navigation/stack';
import Login from '@pages/Login/Login';
import { Text, View } from 'react-native';
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

function CameraHeader() {
  return (
    <View className="flex-1 bg-red-300" style={{ height: 80 }}>
      <Text className="text-white">test</Text>
    </View>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

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
      <Stack.Screen
        name="Camera"
        options={{ header: CameraHeader }}
        component={CameraPage}
      />
    </Stack.Navigator>
  );
}
