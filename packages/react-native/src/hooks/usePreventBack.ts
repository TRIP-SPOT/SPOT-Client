import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

interface UsePreventBackParams {
  isPrevent: boolean;
  preventCallback: () => void;
}

export default function usePreventBack({
  isPrevent,
  preventCallback,
}: UsePreventBackParams) {
  const navigation = useNavigation();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (!isPrevent && navigation.canGoBack()) {
          navigation.goBack();
        }
        if (isPrevent) {
          preventCallback();
        }

        return true;
      },
    );
    return () => backHandler.remove();
  }, [isPrevent]);
}
