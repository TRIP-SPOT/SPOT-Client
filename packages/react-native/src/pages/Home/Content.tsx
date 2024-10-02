import { useRoute } from '@react-navigation/native';
import { SafeAreaView, ScrollView } from 'react-native';
import PopularSpot from '@/components/home/PopularSpot';
import { StackRouteProps } from '@/types/navigation';

export default function Content() {
  const route = useRoute<StackRouteProps<'Home/Content'>>();
  const { title } = route.params;

  return (
    <SafeAreaView>
      <ScrollView>
        {title === 'popular-spot' ? <PopularSpot /> : null}
      </ScrollView>
    </SafeAreaView>
  );
}
