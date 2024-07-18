import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/routes/StackNavigator';
import { SignupStackParamList } from '@/routes/SignupStackNavigator';
import { RouteProp } from '@react-navigation/native';

export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type SignupStackNavigation<T extends keyof SignupStackParamList> =
  StackNavigationProp<SignupStackParamList, T>;

export type SignupRouteProps<T extends keyof SignupStackParamList> = RouteProp<
  SignupStackParamList,
  T
>;
