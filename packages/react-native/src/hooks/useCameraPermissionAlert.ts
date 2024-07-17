import { useNavigation } from '@react-navigation/native';
import { Alert, Linking } from 'react-native';

export default function useCameraPermissionAlert() {
  const navigation = useNavigation();

  return () =>
    Alert.alert(
      '카메라 권한이 있어야 사용할 수 있어요',
      '설정 페이지로 이동하시겠어요?',
      [
        {
          text: '취소',
          onPress: () => navigation.goBack(),
        },
        {
          text: '확인',
          onPress: async () => {
            await Linking.openSettings();
          },
        },
      ],
    );
}
