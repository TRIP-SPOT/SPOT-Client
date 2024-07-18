import { useEffect } from 'react';
import { Platform } from 'react-native';
import {
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  RESULTS,
} from 'react-native-permissions';
import useCameraPermissionAlert from './useCameraPermissionAlert';

export default function useCamera() {
  const device = useCameraDevice('back');
  const { hasPermission } = useCameraPermission();
  const cameraPermissionAlert = useCameraPermissionAlert();

  const checkCameraPermission = (result: PermissionStatus) => {
    switch (result) {
      case RESULTS.GRANTED:
        break;
      default:
        cameraPermissionAlert();
        break;
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.CAMERA).then(() => {
        check(PERMISSIONS.IOS.CAMERA).then(checkCameraPermission);
      });
    } else {
      request(PERMISSIONS.ANDROID.CAMERA).then(() => {
        check(PERMISSIONS.ANDROID.CAMERA).then(checkCameraPermission);
      });
    }
  }, []);

  return { device, hasPermission };
}
