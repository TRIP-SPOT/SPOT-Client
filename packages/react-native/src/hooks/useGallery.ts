import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Alert, Linking, Platform } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  RESULTS,
} from 'react-native-permissions';

interface GetPhotoOptions {
  selectionLimit?: number;
  fullObject?: boolean;
}

type GetPhotoReturnType<T extends GetPhotoOptions | undefined> = T extends {
  selectionLimit: number;
  fullObject: true;
}
  ? Asset[]
  : T extends { selectionLimit: number }
    ? string[]
    : T extends { fullObject: true }
      ? Asset
      : string;

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

  const getPhoto = async <T extends GetPhotoOptions | undefined>(
    options?: T,
  ): Promise<GetPhotoReturnType<T> | null> => {
    const hasPermission = await hasGalleryPermission('read');
    if (!hasPermission) return Promise.reject();

    const response = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: options?.selectionLimit || 1,
    });

    if (response.didCancel) return null;

    if (!response.assets) return null;

    // 옵션이 없는 경우 한장의 uri를 리턴
    if (!options) {
      return response.assets[0].uri as GetPhotoReturnType<T>;
    }

    // selectionLimit가 없는 경우는 1장
    if (options.selectionLimit) {
      if (options.fullObject) {
        return response.assets as GetPhotoReturnType<T>;
      }

      return response.assets
        .map((asset) => asset.uri)
        .filter((url) => url !== undefined) as GetPhotoReturnType<T>;
    }

    if (options.fullObject) {
      return response.assets[0] as GetPhotoReturnType<T>;
    }

    return response.assets[0].uri as GetPhotoReturnType<T>;
  };

  const getCropPhoto = async () => {
    const hasPermission = await hasGalleryPermission('read');
    if (!hasPermission) return Promise.reject();

    const result = await ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
    });
    return result;
  };

  return { savePhoto, getPhoto, getCropPhoto };
}
