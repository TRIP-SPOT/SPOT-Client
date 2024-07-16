import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../pages/Login';
import TabScreens from '../../pages/TabScreens';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={TabScreens} />
    </Stack.Navigator>
  );
}
