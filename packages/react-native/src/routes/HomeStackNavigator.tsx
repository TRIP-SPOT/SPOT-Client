import { createStackNavigator } from '@react-navigation/stack';
import Home from '@/pages/Home';
import Detail from '@/pages/Detail';

const Stack = createStackNavigator();

export type HomeStackParamList = {
  // FIXME: 카메라 페이지 제거
  Camera: undefined;
  'Home/Main': undefined;
  'Home/Detail': { title: string };
};

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
