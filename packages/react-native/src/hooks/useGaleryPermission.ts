import { PermissionsAndroid, Platform } from 'react-native';
import {
  CameraRoll,
  SaveToCameraRollOptions,
} from '@react-native-camera-roll/camera-roll';

export default function useGaleryPermission() {
  // eslint-disable-next-line consistent-return
  async function hasAndroidPermission() {
    const getCheckPermissionPromise = async () => {
      if ((Platform.Version as number) >= 33) {
        const [hasReadMediaImagesPermission, hasReadMediaVideoPermission] =
          await Promise.all([
            PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            ),
            PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            ),
          ]);
        return hasReadMediaImagesPermission && hasReadMediaVideoPermission;
      }

      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if ((Platform.Version as number) >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          (statuses) =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      }

      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
    };

    await getRequestPermissionPromise();
  }

  async function savePicture(tag: string, option?: SaveToCameraRollOptions) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.saveAsset(tag, { ...option });
  }

  return { savePicture };
}
