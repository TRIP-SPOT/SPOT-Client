import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeIcon from '@assets/HomeIcon';
import MapIcon from '@assets/MapIcon';
import MyPageIcon from '@assets/MyPageIcon';
import MyPageStackNavigator from './MyPageStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import MapsStackNavigator from './MapsStackNavigator';
import GamificationStackNavigator from './GamificationStackNavigator';
import RouteIcon from '@/assets/RouteIcon';
import EarthIcon from '@/assets/EarthIcon';

type BottomTabNavigationList = {
  Home: undefined;
  TripPlanner: undefined;
  Filter: undefined;
  TravelLog: undefined;
  MyPage: undefined;
};

export default function BottomTabNavigator() {
  const Tab = createBottomTabNavigator<BottomTabNavigationList>();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#191919',
          borderTopWidth: 0.5,
          borderTopColor: '#333333',
          height: 65 + insets.bottom,
          paddingBottom: 5 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 400,
          textAlign: 'center',
          lineHeight: 13,
          fontFamily: 'Pretendard-Medium',
          top: -2,
        },
        tabBarActiveTintColor: '#FF1919',
        tabBarInactiveTintColor: '#909090',
        unmountOnBlur: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="TripPlanner"
        component={GamificationStackNavigator}
        options={{ tabBarLabel: 'Trip Planner', tabBarIcon: RouteIcon }}
      />

      <Tab.Screen
        name="Filter"
        component={GamificationStackNavigator}
        options={{
          tabBarLabel: 'Filter & Quiz',
          tabBarIcon: EarthIcon,
        }}
      />
      <Tab.Screen
        name="TravelLog"
        component={MapsStackNavigator}
        options={{
          tabBarLabel: 'Travel Log',
          tabBarIcon: MapIcon,
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStackNavigator}
        options={{
          tabBarLabel: 'My Page',
          tabBarIcon: MyPageIcon,
        }}
      />
    </Tab.Navigator>
  );
}
