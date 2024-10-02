import { useRoute } from '@react-navigation/native';
import { SafeAreaView, ScrollView } from 'react-native';

import { StackRouteProps } from '@/types/navigation';
import PopularSpot from '@/components/home/contents/PopularSpot';
import SetJetting from '@/components/home/contents/SetJetting';

export default function Content() {
  const route = useRoute<StackRouteProps<'Home/Content'>>();
  const { title } = route.params;

  return (
    <SafeAreaView>
      <ScrollView>
        {title === 'popular-spot' ? <PopularSpot /> : <SetJetting />}
      </ScrollView>
    </SafeAreaView>
  );
}
