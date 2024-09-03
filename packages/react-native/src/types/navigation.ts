import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { KoreaLocationName } from './map';

export type StackParamList = {
  Login: undefined;
  Main: undefined;
  Signup: undefined;
  Camera: undefined;

  'Signup/Nickname': undefined;
  'Signup/Profile': { nickname: string };
  'Signup/NicknameProfile': { nickname: string };

  'MyPage/Profile': undefined;
  'MyPage/EditProfile': undefined;
  'MyPage/EditProfileWithNickname': { nickname: string };

  'Home/Main': undefined;
  'Home/Search': { title: string };
  'Home/Detail': { id: number };

  'Gamification/Main': undefined;

  'Maps/Main': undefined;
  'Maps/Record': { location: KoreaLocationName };
  'Maps/PostRecord': {
    location: KoreaLocationName;
  };
  'Maps/ModifyRecord': {
    recordId: number;
    location: KoreaLocationName;
  };
  'Maps/RecordDetail': {
    recordId: number;
    location: KoreaLocationName;
  };

  'Setting/Main': undefined;
};

export type StackNavigation<T extends keyof StackParamList> =
  StackNavigationProp<StackParamList, T>;

export type StackRouteProps<T extends keyof StackParamList> = RouteProp<
  StackParamList,
  T
>;
