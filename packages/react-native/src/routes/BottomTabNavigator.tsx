import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeIcon from '@assets/HomeIcon';
import MapIcon from '@assets/MapIcon';
import DetailIcon from '@assets/DetailIcon';
import MyPageIcon from '@assets/MyPageIcon';
import MyPageStackNavigator from './MyPageStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import MapsStackNavigator from './MapsStackNavigator';
import GamificationStackNavigator from './GamificationStackNavigator';

export default function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();
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
          height: 60 + insets.bottom,
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
          tabBarLabel: '홈',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Gamification"
        component={GamificationStackNavigator}
        options={{ tabBarLabel: '게이미피케이션', tabBarIcon: HomeIcon }}
      />

      <Tab.Screen
        name="Detail"
        // FIXME: 추후 바텀 네비게이션 확정에 따른 수정 필요
        component={HomeStackNavigator}
        options={{
          tabBarLabel: '상세보기',
          tabBarIcon: DetailIcon,
        }}
      />
      <Tab.Screen
        name="Route"
        component={MapsStackNavigator}
        options={{
          tabBarLabel: '여행지도',
          tabBarIcon: MapIcon,
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStackNavigator}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: MyPageIcon,
        }}
      />
    </Tab.Navigator>
  );
}
