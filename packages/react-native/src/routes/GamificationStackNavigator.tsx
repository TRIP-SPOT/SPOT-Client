import { createStackNavigator } from '@react-navigation/stack';
import Gamification from '@/pages/Gamification/Gamification';
import { StackParamList } from '@/types/navigation';

const Stack = createStackNavigator<StackParamList>();

export default function GamificationStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Gamification/Main"
    >
      <Stack.Screen name="Gamification/Main" component={Gamification} />
      <Stack.Screen name="Gamification/Quiz" component={Gamification} />
    </Stack.Navigator>
  );
}
