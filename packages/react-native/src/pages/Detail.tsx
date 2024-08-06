import { useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { HomeRouteProps } from '@/types/navigation';
import BackGroundGradient from '@/layouts/BackGroundGradient';

export default function Detail() {
  const route = useRoute<HomeRouteProps<'home/detail'>>();
  const { title } = route.params;

  return (
    <BackGroundGradient withHeader>
      <View>
        <Text>{title}</Text>
      </View>
    </BackGroundGradient>
  );
}
