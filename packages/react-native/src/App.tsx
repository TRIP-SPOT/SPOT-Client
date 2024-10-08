import { CanceledError } from 'axios';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '@routes/StackNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Sentry from '@sentry/react-native';
import { SENTRY_DSN } from '@env';
import useCodePush from './hooks/useCodePush';
import UpdateLoading from './components/common/UpdateLoading';

Sentry.init({
  dsn: SENTRY_DSN,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: true,
    },
    mutations: {
      onError: (err) => {
        if (err instanceof CanceledError) {
          return;
        }
        if (!__DEV__) {
          Sentry.captureException(err);
        }
        Alert.alert('오류가 발생했어요', '잠시뒤에 시도해보세요.');
      },
    },
  },
});

function App() {
  const { isRecent, downloadProgress } = useCodePush();

  if (!isRecent)
    return (
      <UpdateLoading isRecent={isRecent} downloadProgress={downloadProgress} />
    );

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
export default Sentry.wrap(App);
