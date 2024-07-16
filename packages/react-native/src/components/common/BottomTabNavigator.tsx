import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Home from '../../pages/Home';
import Route from '../../pages/Route';
import HomeIcon from '../../assets/HomeIcon';
import Detail from '../../pages/Detail';
import MyPage from '../../pages/MyPage';
import MapIcon from '../../assets/MapIcon';
import DetailIcon from '../../assets/DetailIcon';
import MyPageIcon from '../../assets/MyPageIcon';

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
      <Tab.Screen
        name="Route"
        component={Route}
        options={{
          tabBarLabel: '경로',
          tabBarIcon: MapIcon,
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
