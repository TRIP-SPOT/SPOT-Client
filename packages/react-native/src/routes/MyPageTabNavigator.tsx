import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyBadge from '@/pages/MyPage/MyBadge';
import MyRoute from '@/pages/MyPage/MyRoute';
import MySpot from '@/pages/MyPage/MySpot';

export default function MyPageTabNavigator() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="mySpot"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#FF1919',
        },
        tabBarLabelStyle: {
          fontFamily: 'Pretendard-Medium',
          textTransform: 'none',
        },
        tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
        tabBarActiveTintColor: 'rgba(255,255,255,1)',
      }}
    >
      <Tab.Screen
        name="mySpot"
        component={MySpot}
        options={{ tabBarLabel: 'My Spot!' }}
      />
      <Tab.Screen
        name="myBadge"
        component={MyBadge}
        options={{ tabBarLabel: '활동배지' }}
      />
      <Tab.Screen
        name="myRoute"
        component={MyRoute}
        options={{ tabBarLabel: 'My Route' }}
      />
    </Tab.Navigator>
  );
}
