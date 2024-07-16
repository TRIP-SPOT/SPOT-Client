import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import Login from '../../pages/Login';
import TabScreens from '../../pages/TabScreens';

const Stack = createStackNavigator();

type RootStackParamList = {
  Login: undefined;
  Landing: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Landing" component={TabScreens} />
    </Stack.Navigator>
  );
}
