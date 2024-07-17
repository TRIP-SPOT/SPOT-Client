import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/routes/StackNavigator';

type ScreenNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type LoginScreenProps = {
  navigation: ScreenNavigationProp<'Login'>;
};

export type HomeScreenProps = {
  navigation: ScreenNavigationProp<'Home'>;
};
