import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from '../components/common/BottomTabNavigator';

export default function TabScreens() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
