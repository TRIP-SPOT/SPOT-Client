import { createStackNavigator } from '@react-navigation/stack';
import Home from '@/pages/Home';
import Detail from '@/pages/Detail';

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home/Main"
    >
      <Stack.Screen name="Home/Main" component={Home} />
      <Stack.Screen name="Home/Detail" component={Detail} />
    </Stack.Navigator>
  );
}
