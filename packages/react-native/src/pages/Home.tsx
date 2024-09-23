import { View, Text } from 'react-native';
import { Button, Font } from 'design-system';
import SearchBar from '@components/common/SearchBar';
import { SpotCardData } from '@/types/spot';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import useProfileQuery from '@/apis/queries/useProfileQuery';
import { StackNavigation } from '@/types/navigation';
import Card from '@/components/common/Card';
import CardSlider from '@/components/common/CardSlider';
import Header from '@/components/common/Header';
import withSuspense from '@/components/HOC/withSuspense';
import useHomeSpotQuery from '@/apis/queries/useHomeSpotQuery';

interface HomeScreenProps {
  navigation: StackNavigation<'Home/Main'>;
}

export default withSuspense(function Home({ navigation }: HomeScreenProps) {
  const { profile } = useProfileQuery();
  const { data: homeSpots } = useHomeSpotQuery();

  return (
    <BackGroundGradient>
      <Header type="logo" />
      <View className="flex flex-col gap-10 p-4">
        <View>
          <Font type="title1" color="white">
            안녕하세요, {profile?.nickname}님{'\n'}오늘은 어디로 가 볼까요?
          </Font>
          {/* FIXME: 추후 삭제 */}
          <Button onPress={() => navigation.navigate('Landing')}>
            <Text className="text-SPOT-white">랜딩</Text>
          </Button>
        </View>
        <View>
          <SearchBar
            placeholder="드라마/영화 제목을 검색하세요."
            handleSearch={(title) =>
              navigation.navigate('Home/Search', { title })
            }
          />
        </View>
        <View>
          <CardSlider
            title="지금 인기있는 촬영지"
            data={homeSpots}
            renderItem={({ item }) => <Card data={item} size={180} />}
          />
        </View>
        <View>
          <CardSlider
            title="이 여행지는 어때요?"
            data={homeSpots}
            renderItem={({ item }) => <Card data={item} size={180} />}
          />
        </View>
      </View>
    </BackGroundGradient>
  );
});
