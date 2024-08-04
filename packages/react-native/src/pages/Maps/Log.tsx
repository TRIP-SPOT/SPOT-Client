import { TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import SortIcon from '@/assets/SortIcon';
import Header from '@/components/common/Header';
import FloatingPlusButton from '@/components/maps/FloatingPlusButton';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { MapsRouteProps, MapsStackNavigation } from '@/types/navigation';
import { LOG_PADDING_X } from '@/components/maps/LogCard';
import LogCardList from '@/components/maps/LogCardList';

interface LogProps {
  navigation: MapsStackNavigation<'Maps/Log'>;
}

export default function Log({ navigation }: LogProps) {
  const sort = () => {
    // TODO: 실제 구현 필요(현재 UI없음)
  };

  const route = useRoute<MapsRouteProps<'Maps/Log'>>();
  return (
    <View>
      <BackGroundGradient>
        <View
          className="relative flex-1 min-h-[100vh]"
          style={{
            padding: LOG_PADDING_X,
          }}
        >
          <Header
            onBack={() => navigation.goBack()}
            title={route.params.location}
            RightActionButton={
              <TouchableOpacity onPress={sort}>
                <SortIcon />
              </TouchableOpacity>
            }
          />
          <LogCardList />
        </View>
      </BackGroundGradient>
      <FloatingPlusButton
        onPress={() => navigation.navigate('Maps/PostLog')}
        bottom={16}
        right={16}
      />
    </View>
  );
}
