import { createStackNavigator } from '@react-navigation/stack';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import Login from '@pages/Login/Login';
import TabScreens from '@pages/TabScreens';
import CameraPage from '@/pages/CameraPage';
import SignupStackNavigator from './SignupStackNavigator';
import { StackParamList } from '@/types/navigation';
import SettingStackNavigator from './SettingStackNavigator';
import Landing from '@/pages/Landing';
import Splash from '@/pages/Splash';
import TOS from '@/pages/TOS';
import withSpotErrorBoundary from '@/components/HOC/withSpotErrorBoundary';

const Stack = createStackNavigator<StackParamList>();

/**
 * @description 하단 탭이 보이지 않는 스택 네비게이션을 이곳에 등록하면 됩니다.
 * 여러 depth를 갖거나 같은 도메인에 페이지가 여러 개인 경우는 별도의 StackNavigator를 추가한 뒤
 * 해당 StackNavigator 컴포넌트를 이곳에 추가합니다.
 */
export default function StackNavigator() {
  return (
    <QueryErrorResetBoundary>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={withSpotErrorBoundary(Splash)} />
        <Stack.Screen name="TOS" component={withSpotErrorBoundary(TOS)} />
        <Stack.Screen name="Login" component={withSpotErrorBoundary(Login)} />
        <Stack.Screen
          name="Signup"
          component={withSpotErrorBoundary(SignupStackNavigator)}
        />
        <Stack.Screen
          name="Main"
          component={withSpotErrorBoundary(TabScreens)}
        />
        <Stack.Screen
          name="Camera"
          component={withSpotErrorBoundary(CameraPage)}
        />
        <Stack.Screen
          name="Setting/Main"
          component={withSpotErrorBoundary(SettingStackNavigator)}
        />
        <Stack.Screen
          name="Landing"
          component={withSpotErrorBoundary(Landing)}
        />
      </Stack.Navigator>
    </QueryErrorResetBoundary>
  );
}
