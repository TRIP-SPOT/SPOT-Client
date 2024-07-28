import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Home from '@pages/Home';
import HomeIcon from '@assets/HomeIcon';
import Detail from '@pages/Detail';
import MapIcon from '@assets/MapIcon';
import DetailIcon from '@assets/DetailIcon';
import MyPageIcon from '@assets/MyPageIcon';
import Maps from '@/pages/Maps';
import MyPageStackNavigator from './MyPageStackNavigator';

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
        component={Home}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Route"
        component={Maps}
        options={{
          tabBarLabel: '경로',
          tabBarIcon: MapIcon,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Detail"
        component={Detail}
        options={{
          tabBarLabel: '상세보기',
          tabBarIcon: DetailIcon,
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
