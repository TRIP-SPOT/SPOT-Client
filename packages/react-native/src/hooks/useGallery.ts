import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Alert, Linking, Platform } from 'react-native';
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
      case (RESULTS.GRANTED, RESULTS.LIMITED):
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

  const savePhoto = async (uri: string) => {
    if (Platform.OS === 'ios') {
      await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      const iosGalleryPermission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      const iosResult = checkGalleryPermission(iosGalleryPermission);
      if (iosResult === 'denied') return Promise.reject();
    } else {
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(() => {
        check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(
          checkGalleryPermission,
        );
      });
      await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      const aosGalleryPermission = await check(
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      );
      const aosResult = checkGalleryPermission(aosGalleryPermission);
      if (aosResult === 'denied') return Promise.reject();
    }

    // eslint-disable-next-line consistent-return
    return CameraRoll.saveAsset(uri);
  };

  return { savePhoto };
}
