import { createStackNavigator } from '@react-navigation/stack';
import { KoreaLocationName } from '@/types/map';
import Maps from '@/pages/Maps/Maps';
import Log from '@/pages/Maps/Log';
import PostLog from '@/pages/Maps/PostLog';
import ModifyLog from '@/pages/Maps/ModifyLog';

export type MapsStackParamList = {
  'Maps/Main': undefined;
  'Maps/Log': {
    location: KoreaLocationName;
  };
  'Maps/PostLog': undefined;
  'Maps/ModifyLog': undefined;
};

const Stack = createStackNavigator<MapsStackParamList>();

export default function MapsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Maps/Main" component={Maps} />
      <Stack.Screen name="Maps/Log" component={Log} />
      <Stack.Screen name="Maps/PostLog" component={PostLog} />
      <Stack.Screen name="Maps/ModifyLog" component={ModifyLog} />
    </Stack.Navigator>
  );
}
