import { createStackNavigator } from '@react-navigation/stack';
import { StackParamList } from '@/types/navigation';
import Setting from '@/pages/Setting';

const Stack = createStackNavigator<StackParamList>();

export default function SettingStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Setting/Main"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Setting/Main" component={Setting} />
    </Stack.Navigator>
  );
}
