import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/routes/StackNavigator';
import { SignupStackParamList } from '@/routes/SignupStackNavigator';
import { MyPageStackParamList } from '@/routes/MyPageStackNavigator';

export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type SignupStackNavigation<T extends keyof SignupStackParamList> =
  StackNavigationProp<SignupStackParamList, T>;

export type SignupRouteProps<T extends keyof SignupStackParamList> = RouteProp<
  SignupStackParamList,
  T
>;

export type MyPageRouteProps<T extends keyof MyPageStackParamList> =
  StackNavigationProp<MyPageStackParamList, T>;
