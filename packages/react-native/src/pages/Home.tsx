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

const mockData: SpotCardData[] = [
  {
    contentId: 1,
    name: '주문진 방파제',
    region: 1,
    city: 20,
    isLiked: false,
    likeCount: 20,
    posterUrl: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
    quote: '',
    workId: 1,
    workName: '도깨비',
  },
  {
    contentId: 2,
    name: '주문진 방파제',
    region: 1,
    city: 20,
    isLiked: true,
    likeCount: 20,
    posterUrl: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
    quote: '',
    workId: 2,
    workName: '도깨비',
  },
  {
    contentId: 3,
    name: '주문진 방파제',
    region: 1,
    city: 20,
    isLiked: false,
    likeCount: 20,
    posterUrl: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
    quote: '',
    workId: 1,
    workName: '도깨비',
  },
  {
    contentId: 4,
    name: '주문진 방파제',
    region: 1,
    city: 20,
    isLiked: false,
    likeCount: 20,
    posterUrl: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
    quote: '',
    workId: 1,
    workName: '도깨비',
  },
];

interface HomeScreenProps {
  navigation: StackNavigation<'Home/Main'>;
}

export default withSuspense(function Home({ navigation }: HomeScreenProps) {
  const { profile } = useProfileQuery();

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
            title="나를 위한 여행지"
            data={mockData}
            renderItem={({ item }) => <Card data={item} size={180} />}
          />
        </View>
        <View>
          <CardSlider
            title="지금 인기있는 여행지"
            data={mockData}
            renderItem={({ item }) => <Card data={item} size={180} />}
          />
        </View>
      </View>
    </BackGroundGradient>
  );
});
