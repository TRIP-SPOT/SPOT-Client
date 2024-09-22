import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyBadge from '@/pages/MyPage/MyBadge';
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
          marginBottom: 10,
          marginHorizontal: 20,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#FF1919',
        },
        tabBarLabelStyle: {
          fontFamily: 'Pretendard-Medium',
          fontWeight: 800,
          fontSize: 14,
          lineHeight: 16,
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
        options={{ tabBarLabel: 'Bagde Collection' }}
      />
      {/* <Tab.Screen
        name="myRoute"
        component={MyRoute}
        options={{ tabBarLabel: 'My Route' }}
      /> */}
    </Tab.Navigator>
  );
}
