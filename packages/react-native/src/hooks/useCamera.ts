import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
  CameraPosition,
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
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');
  const device = useCameraDevice(cameraPosition);
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

  const changeCameraPosition = () => {
    setCameraPosition((prev) => (prev === 'back' ? 'front' : 'back'));
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

  return { device, hasPermission, changeCameraPosition };
}
