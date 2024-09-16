import { createStackNavigator } from '@react-navigation/stack';
import { StackParamList } from '@/types/navigation';
import TripPlanner from '@/pages/TripPlanner/TripPlanner';
import TripPlannerPost from '@/pages/TripPlanner/TripPlannerPost';
import TripPlannerDetail from '@/pages/TripPlanner/TripPlannerDetail';
import EditTripPlan from '@/pages/TripPlanner/EditTripPlan';

const Stack = createStackNavigator<StackParamList>();

export default function TripPlannerStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="TripPlanner/Main"
    >
      <Stack.Screen name="TripPlanner/Main" component={TripPlanner} />
      <Stack.Screen name="TripPlanner/Post" component={TripPlannerPost} />
      <Stack.Screen name="TripPlanner/Detail" component={TripPlannerDetail} />
      <Stack.Screen name="TripPlanner/EditPlan" component={EditTripPlan} />
    </Stack.Navigator>
  );
}
