import { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SPOTLogo from '@/assets/SPOTLogo';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { useToken } from '@/hooks/useToken';
import { StackNavigation } from '@/types/navigation';
import { AppStorage } from '@/utils/storage';

export default function Splash() {
  const { setAccess, setRefresh } = useToken();
  const navigation = useNavigation<StackNavigation<'Splash'>>();

  useEffect(() => {
    AppStorage.getData('token').then((res) => {
      if (!res) {
        return navigation.reset({
          index: 0,
          routes: [{ name: 'Landing' }],
        });
      }
      const { access, refresh } = res;
      setAccess(access);
      setRefresh(refresh);
      return navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    });
  }, []);

  return (
    <BackGroundGradient withoutScroll>
      <View className="flex-1 justify-center items-center">
        <SPOTLogo />
      </View>
    </BackGroundGradient>
  );
}
