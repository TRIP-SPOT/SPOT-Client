import { TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import SortIcon from '@/assets/SortIcon';
import FloatingPlusButton from '@/components/maps/FloatingPlusButton';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { LOG_PADDING_X } from '@/components/maps/RecordCard';
import RecordCardList from '@/components/maps/RecordCardList';
import Header from '@/components/common/Header';
import { StackNavigation, StackRouteProps } from '@/types/navigation';

interface RecordsProps {
  navigation: StackNavigation<'Maps/Record'>;
}

export default function Records({ navigation }: RecordsProps) {
  const sort = () => {
    // TODO: 실제 구현 필요(현재 UI없음)
  };

  const route = useRoute<StackRouteProps<'Maps/Record'>>();
  return (
    <View>
      <BackGroundGradient>
        <Header
          RightActionButton={
            <TouchableOpacity onPress={sort} className="px-4">
              <SortIcon />
            </TouchableOpacity>
          }
          title={route.params.location}
        />
        <View
          className="relative flex-1 min-h-[100vh]"
          style={{
            paddingLeft: LOG_PADDING_X,
            paddingRight: LOG_PADDING_X,
          }}
        >
          <RecordCardList />
        </View>
      </BackGroundGradient>
      <FloatingPlusButton
        onPress={() => navigation.navigate('Maps/PostRecord')}
        bottom={16}
        right={16}
      />
    </View>
  );
}
