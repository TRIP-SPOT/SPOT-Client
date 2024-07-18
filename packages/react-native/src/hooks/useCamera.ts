import { useEffect } from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import useCameraPermissionAlert from './useCameraPermissionAlert';

export default function useCamera() {
  const device = useCameraDevice('back');
  const { hasPermission } = useCameraPermission();
  const cameraPermissionAlert = useCameraPermissionAlert();

  useEffect(() => {
    const getPermission = async () => {
      const permission = Camera.getCameraPermissionStatus();

      switch (permission) {
        case 'granted':
          break;

        case 'not-determined': {
          const newPermission = await Camera.requestCameraPermission();

          if (newPermission === 'denied') cameraPermissionAlert();

          break;
        }

        case 'denied':
          cameraPermissionAlert();
          break;

        default:
          await Camera.requestCameraPermission();
          break;
      }
    };

    getPermission();
  }, []);

  return { device, hasPermission };
}
