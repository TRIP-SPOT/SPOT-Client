import { useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DetailInfo from '@/pages/Detail/DetailInfo';
import DetailSpot from '@/pages/Detail/DetailSpot';
import { StackRouteProps } from '@/types/navigation';

const Tab = createMaterialTopTabNavigator();

export default function DetailTabNavigator() {
  const route = useRoute<StackRouteProps<'Home/Detail'>>();
  const { id, contentId } = route.params;

  return (
    <Tab.Navigator
      initialRouteName="Detail/Info"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
          marginBottom: 10,
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
        name="Detail/Info"
        component={DetailInfo}
        options={{ tabBarLabel: '상세정보' }}
        initialParams={{
          id,
          contentId,
        }}
      />
      <Tab.Screen
        name="Detail/Spot"
        component={DetailSpot}
        options={{ tabBarLabel: 'SPOT!' }}
        initialParams={{ id, contentId }}
      />
    </Tab.Navigator>
  );
}
