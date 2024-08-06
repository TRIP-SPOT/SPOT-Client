import { createStackNavigator } from '@react-navigation/stack';
import Home from '@/pages/Home';
import Detail from '@/pages/Detail';
import { HEADER_STYLE } from '@/constants/HEADER_STYLE';

const Stack = createStackNavigator();

export type HomeStackParamList = {
  // FIXME: 카메라 페이지 제거
  Camera: undefined;
  'home/main': undefined;
  'home/detail': { title: string };
};

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...HEADER_STYLE,
        headerShown: false,
      }}
      initialRouteName="home/main"
    >
      <Stack.Screen name="home/main" component={Home} />
      <Stack.Screen
        name="home/detail"
        component={Detail}
        options={{ headerShown: true, title: '촬영지 정보' }}
      />
    </Stack.Navigator>
  );
}
