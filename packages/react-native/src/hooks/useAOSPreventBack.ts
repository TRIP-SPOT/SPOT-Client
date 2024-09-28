import { useEffect } from 'react';
import { BackHandler } from 'react-native';

interface UseAOSPreventBackParams {
  isPrevent: boolean;
  preventCallback: () => void;
}
/**
 *
 * @description 안드로이드에서만 작동합니다.
 */
export default function useAOSPreventBack({
  isPrevent,
  preventCallback,
}: UseAOSPreventBackParams) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (!isPrevent) {
          return false;
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
