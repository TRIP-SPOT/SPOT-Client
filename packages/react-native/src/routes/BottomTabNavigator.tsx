import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Home from '@pages/Home';
import HomeIcon from '@assets/HomeIcon';
import Detail from '@pages/Detail';
import MyPage from '@pages/MyPage';
import MapIcon from '@assets/MapIcon';
import DetailIcon from '@assets/DetailIcon';
import MyPageIcon from '@assets/MyPageIcon';
import CameraPage from '@/pages/CameraPage';

export default function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#191919',
          borderTopWidth: 0.5,
          borderTopColor: '#333333',
          height: Platform.OS === 'ios' ? 95 : 65,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 400,
          textAlign: 'center',
          lineHeight: 13,
          top: -5,
          fontFamily: 'Pretendard-Medium',
        },
        tabBarActiveTintColor: '#FF1919',
        tabBarInactiveTintColor: '#909090',
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
      {/* FIXME: 경로 페이지로 변경 */}
      <Tab.Screen
        name="Route"
        component={CameraPage}
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
        component={MyPage}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: MyPageIcon,
        }}
      />
    </Tab.Navigator>
  );
}
