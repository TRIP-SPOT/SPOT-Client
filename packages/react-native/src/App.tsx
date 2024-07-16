import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './components/common/BottomTabNavigator';
import StackNavigator from './components/common/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
