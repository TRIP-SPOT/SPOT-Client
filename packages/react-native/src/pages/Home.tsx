import { View } from 'react-native';
import { Font } from 'design-system';
import SearchBar from '@components/common/SearchBar';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import useProfileQuery from '@/apis/queries/common/useProfileQuery';
import { StackNavigation } from '@/types/navigation';
import Card from '@/components/common/Card';
import CardSlider from '@/components/common/CardSlider';
import Header from '@/components/common/Header';
import withSuspense from '@/components/HOC/withSuspense';
import useHomeSpotQuery from '@/apis/queries/home/useHomeSpotQuery';
import SPOTLogo from '@/assets/SPOTLogo';

interface HomeScreenProps {
  navigation: StackNavigation<'Home/Main'>;
}

export default withSuspense(function Home({ navigation }: HomeScreenProps) {
  const { profile } = useProfileQuery();
  const { data: homeSpots } = useHomeSpotQuery();

  return (
    <BackGroundGradient>
      <Header
        hideLeft
        TitleComponent={
          <View className="justify-center items-center">
            <SPOTLogo height={45} width={110} />
          </View>
        }
      />
      <View className="flex flex-col gap-10 px-4">
        <View>
          <Font type="title1" color="white">
            안녕하세요, {profile?.nickname}님{'\n'}오늘은 어디로 가 볼까요?
          </Font>
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
        {/* FIXME: 추후 주석 제거
        <View>
          <CardSlider
            title="이 여행지는 어때요?"
            data={homeSpots}
            renderItem={({ item }) => <Card data={item} size={180} />}
          />
        </View> */}
      </View>
    </BackGroundGradient>
  );
});
