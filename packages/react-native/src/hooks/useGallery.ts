import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Alert, Linking, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  RESULTS,
} from 'react-native-permissions';

export default function useGallery() {
  const checkGalleryPermission = (result: PermissionStatus) => {
    switch (result) {
      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        return 'granted';

      default:
        Alert.alert(
          '사진첩 접근 권한이 있어야 사용할 수 있어요',
          '설정 페이지로 이동하시겠어요?',
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

  const hasGalleryPermission = async (type?: 'write' | 'read') => {
    if (Platform.OS === 'ios') {
      await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      const iosGalleryPermission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      return checkGalleryPermission(iosGalleryPermission) === 'granted';
    }

    if (Platform.OS === 'android') {
      if (type === 'write') {
        if (Platform.Version >= 29) {
          return true;
        }
        // API 레벨 28 이하에서만 쓰기 권한 요청
        const permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
        const permissionStatus = await request(permission);
        return checkGalleryPermission(permissionStatus) === 'granted';
      }

      // 읽기 권한 요청
      const permission =
        Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      const permissionStatus = await request(permission);
      return checkGalleryPermission(permissionStatus) === 'granted';
    }
    return false;
  };

  const savePhoto = async (uri: string) => {
    if (!(await hasGalleryPermission('write'))) return Promise.reject();

    // eslint-disable-next-line consistent-return
    return CameraRoll.saveAsset(uri);
  };

  const getPhoto = async (selectionLimit?: number) => {
    const hasPermission = await hasGalleryPermission('read');
    if (!hasPermission) return Promise.reject();

    const response = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: selectionLimit || 1,
    });

    if (response.didCancel) return null;

    if (!response.assets) return null;

    if (!selectionLimit) return response.assets[0]?.uri;

    return response.assets
      .map((asset) => asset.uri)
      .filter((url) => url !== undefined);
  };

  return { savePhoto, getPhoto };
}
