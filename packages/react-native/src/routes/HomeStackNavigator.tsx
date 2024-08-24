import { createStackNavigator } from '@react-navigation/stack';
import Home from '@/pages/Home';
import { StackParamList } from '@/types/navigation';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';

const Stack = createStackNavigator<StackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home/Main"
    >
      <Stack.Screen name="Home/Main" component={Home} />
      <Stack.Screen name="Home/Search" component={Search} />
      <Stack.Screen name="Home/Detail" component={Detail} />
    </Stack.Navigator>
  );
}
