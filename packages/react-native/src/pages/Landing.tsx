import { useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Font } from 'design-system';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import Header from '@/components/common/Header';
import Landing1 from './Landing/Landing1';
import Landing2 from './Landing/Landing2';
import Landing3 from './Landing/Landing3';
import Landing4 from './Landing/Landing4';
import Landing5 from './Landing/Landing5';
import Landing6 from './Landing/Landing6';
import Landing7 from './Landing/Landing7';
import { DEFAULT_COLOR } from '@/constants/DEFAULT_COLOR';
import { StackNavigation } from '@/types/navigation';

function FinishButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Font type="body1" color="white">
        완료
      </Font>
    </TouchableOpacity>
  );
}

const landingPageList: (() => React.ReactNode)[] = [
  Landing1,
  Landing2,
  Landing3,
  Landing4,
  Landing5,
  Landing6,
  Landing7,
];

interface LandingScreenProps {
  navigation: StackNavigation<'Landing'>;
}

export default function Landing({ navigation }: LandingScreenProps) {
  const [itemWidth, setItemWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / Dimensions.get('window').width);
    setCurrentPage(index);
  };

  return (
    <BackGroundGradient withoutScroll>
      <Header
        title="사용 가이드"
        RightActionButton={
          currentPage === landingPageList.length - 1 ? (
            <FinishButton onPress={() => navigation.navigate('Home/Main')} />
          ) : undefined
        }
      />
      <View className="flex-row gap-2 items-center justify-center mt-0.5">
        {landingPageList.map((_, index) => (
          <View
            key={index}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor:
                currentPage === index
                  ? DEFAULT_COLOR.SPOT_RED
                  : DEFAULT_COLOR.SPOT_GRAY,
            }}
          />
        ))}
      </View>
      <ScrollView
        style={{ flex: 1, marginTop: 10 }}
        horizontal
        pagingEnabled
        contentContainerStyle={{ width: `${100 * landingPageList.length}%` }}
        scrollEventThrottle={200}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(width) =>
          setItemWidth(width / landingPageList.length)
        }
        onScroll={onScroll}
      >
        <View className="flex-row">
          {landingPageList.map((Page, index) => (
            <View style={{ width: itemWidth, height: '100%', padding: 20 }}>
              <Page key={index} />
            </View>
          ))}
        </View>
      </ScrollView>
    </BackGroundGradient>
  );
}
