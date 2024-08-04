import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/routes/StackNavigator';
import { SignupStackParamList } from '@/routes/SignupStackNavigator';
import { MyPageStackParamList } from '@/routes/MyPageStackNavigator';
import { HomeStackParamList } from '@/routes/HomeStackNavigator';
import { MapsStackParamList } from '@/routes/MapsStackNavigator';

export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type SignupStackNavigation<T extends keyof SignupStackParamList> =
  StackNavigationProp<SignupStackParamList, T>;

export type SignupRouteProps<T extends keyof SignupStackParamList> = RouteProp<
  SignupStackParamList,
  T
>;

export type MyPageStackNavigation<T extends keyof MyPageStackParamList> =
  StackNavigationProp<MyPageStackParamList, T>;

export type MyPageRouteProps<T extends keyof MyPageStackParamList> = RouteProp<
  MyPageStackParamList,
  T
>;

export type HomeStackNavigation<T extends keyof HomeStackParamList> =
  StackNavigationProp<HomeStackParamList, T>;

export type HomeRouteProps<T extends keyof HomeStackParamList> = RouteProp<
  HomeStackParamList,
  T
>;

export type MapsStackNavigation<T extends keyof MapsStackParamList> =
  StackNavigationProp<MapsStackParamList, T>;

export type MapsRouteProps<T extends keyof MapsStackParamList> = RouteProp<
  MapsStackParamList,
  T
>;
