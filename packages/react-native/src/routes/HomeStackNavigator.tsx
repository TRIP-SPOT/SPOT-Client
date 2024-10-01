import { createStackNavigator } from '@react-navigation/stack';
import Home from '@/pages/Home/Home';
import { StackParamList } from '@/types/navigation';
import Search from '@/pages/Search';
import Detail from '@/pages/Home/Detail';
import HomeSpotAdd from '@/pages/Home/HomeSpotAdd';
import TripPlannerPost from '@/pages/TripPlanner/TripPlannerPost';

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
      <Stack.Screen name="Home/AddSpot" component={HomeSpotAdd} />
      <Stack.Screen name="Home/PlanPost" component={TripPlannerPost} />
    </Stack.Navigator>
  );
}
