import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/routes/StackNavigator';
import { SignupStackParamList } from '@/routes/SignupStackNavigator';

export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type SignupStackNavigation<T extends keyof SignupStackParamList> =
  StackNavigationProp<SignupStackParamList, T>;
