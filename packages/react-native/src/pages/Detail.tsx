import { useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { HomeRouteProps } from '@/types/navigation';

export default function Detail() {
  const route = useRoute<HomeRouteProps<'home/detail'>>();
  const { title } = route.params;

  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
