import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './components/common/BottomTabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
