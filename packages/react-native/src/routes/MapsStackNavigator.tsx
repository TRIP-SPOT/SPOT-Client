import { createStackNavigator } from '@react-navigation/stack';
import Maps from '@/pages/Maps/Maps';
import Records from '@/pages/Maps/Records';
import PostRecord from '@/pages/Maps/PostRecord';
import ModifyRecord from '@/pages/Maps/ModifyRecord';
import RecordDetail from '@/pages/Maps/RecordDetail';
import { StackParamList } from '@/types/navigation';

const Stack = createStackNavigator<StackParamList>();

export default function MapsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Maps/Main" component={Maps} />
      <Stack.Screen name="Maps/Record" component={Records} />
      <Stack.Screen name="Maps/PostRecord" component={PostRecord} />
      <Stack.Screen name="Maps/ModifyRecord" component={ModifyRecord} />
      <Stack.Screen name="Maps/RecordDetail" component={RecordDetail} />
    </Stack.Navigator>
  );
}
