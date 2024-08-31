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

  const hasGalleryPermission = async () => {
    if (Platform.OS === 'ios') {
      await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      const iosGalleryPermission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      return checkGalleryPermission(iosGalleryPermission) === 'granted';
    }

    await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    const aosGalleryPermission = await check(
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    );
    return checkGalleryPermission(aosGalleryPermission) === 'granted';
  };

  const savePhoto = async (uri: string) => {
    if (!(await hasGalleryPermission())) return Promise.reject();

    // eslint-disable-next-line consistent-return
    return CameraRoll.saveAsset(uri);
  };

  const getPhoto = async (selectionLimit?: number) => {
    const hasPermission = await hasGalleryPermission();
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
