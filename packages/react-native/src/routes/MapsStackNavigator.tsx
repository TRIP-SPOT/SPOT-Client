import { createStackNavigator } from '@react-navigation/stack';
import { KoreaLocationName } from '@/types/map';
import Maps from '@/pages/Maps/Maps';
import Log from '@/pages/Maps/Log';

export type MapsStackParamList = {
  'Maps/Main': undefined;
  'Maps/Log': {
    location: KoreaLocationName;
  };
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
    </Stack.Navigator>
  );
}
