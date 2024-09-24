import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { KoreaLocationName } from './map';
import { SpotResponse } from '@/apis/queries/spot/useSpotDetailQuery';
import { City, Region } from '@/constants/CITY';

export type StackParamList = {
  Splash: undefined;
  Login: undefined;
  TOS: {
    kakaoEmail: string;
  };
  Main: undefined;
  Signup: undefined;
  Camera: undefined;
  Landing: undefined;

  'Signup/Nickname': undefined;
  'Signup/Profile': { nickname: string };
  'Signup/NicknameProfile': { nickname: string };

  'TripPlanner/Main': undefined;
  'TripPlanner/Post': undefined;
  'TripPlanner/Detail': {
    tripId: number;
    region: Region;
    city: City;
    startDate: string;
    endDate: string;
  };
  'TripPlanner/EditPlan': {
    tripId: number;
  };
  'TripPlanner/AddSchedule': {
    tripId: number;
  };

  'MyPage/Profile': undefined;
  'MyPage/EditProfile': { nickname: string };
  'MyPage/EditProfileWithNickname': { nickname: string };

  'Home/Main': undefined;
  'Home/Search': { title: string };
  'Home/Detail': { contentId: number; id: number };
  'Home/AddSpot': {
    spots: SpotResponse[];
  };

  'Gamification/Main': undefined;
  'Gamification/Quiz': {
    quizId: number;
    quizWorkName: string;
  };

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
