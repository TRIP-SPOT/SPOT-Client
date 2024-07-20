import BottomTabNavigator from '@routes/BottomTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabScreens() {
  return (
    <SafeAreaProvider>
      <BottomTabNavigator />
    </SafeAreaProvider>
  );
}
