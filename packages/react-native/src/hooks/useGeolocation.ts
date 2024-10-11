import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { Alert, Linking, Platform } from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

export interface Location {
  latitude?: number;
  longitude?: number;
}

export default function useGeolocation() {
  const checkLocationPermission = (result: PermissionStatus) => {
    switch (result) {
      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        return 'granted';

      default:
        Alert.alert(
          '위치 정보 권한이 있어야 사용할 수 있어요.',
          '설정페이지로 이동하시겠어요?',
          [
            {
              text: '취소',
            },
            {
              text: '확인',
              onPress: async () => {
                await Linking.openSettings();
              },
            },
          ],
        );
        return 'denied';
    }
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      const permission = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
      return checkLocationPermission(permission) === 'granted';
    }
    await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    const permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    return checkLocationPermission(permission) === 'granted';
  };

  const getGeolocation: () => Promise<Location | null> = async () => {
    const hasPermission = await hasLocationPermission();
    if (!hasPermission) {
      return null;
    }

    const result = await new Promise<GeolocationResponse>((resolve) => {
      Geolocation.getCurrentPosition((pos) => resolve(pos));
    });

    return {
      latitude: result.coords.latitude,
      longitude: result.coords.longitude,
    };
  };

  return { getGeolocation };
}
