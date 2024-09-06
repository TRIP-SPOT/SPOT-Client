import { View, Text } from 'react-native';
import { Button, Font } from 'design-system';
import SearchBar from '@components/common/SearchBar';
import { SpotData } from '@/types/spot';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import useNicknameQuery from '@/apis/queries/useNicknameQuery';
import { StackNavigation } from '@/types/navigation';
import Card from '@/components/common/Card';
import CardSlider from '@/components/common/CardSlider';
import Header from '@/components/common/Header';

const mockData: SpotData[] = [
  {
    spotId: 1,
    name: '주문진 방파제',
    location: '강원 강릉',
    tags: [
      '바다',
      '도깨비',
      '바다',
      '도깨비',
      '바다',
      '도깨비',
      '바다',
      '도깨비',
    ],
    isLiked: false,
    likeCount: 20,
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
  },
  {
    spotId: 2,
    name: '주문진 방파제',
    location: '강원 강릉',
    tags: ['바다', '도깨비'],
    isLiked: false,
    likeCount: 20,
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
  },
  {
    spotId: 3,
    name: '주문진 방파제',
    location: '강원 강릉',
    tags: ['바다', '도깨비'],
    isLiked: false,
    likeCount: 20,
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
  },
  {
    spotId: 4,
    name: '주문진 방파제',
    location: '강원 강릉',
    tags: ['바다', '도깨비'],
    isLiked: false,
    likeCount: 20,
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
  },
];

interface HomeScreenProps {
  navigation: StackNavigation<'Home/Main'>;
}

export default function Home({ navigation }: HomeScreenProps) {
  const { nickname } = useNicknameQuery();

  return (
    <BackGroundGradient>
      <Header type="logo" />
      <View className="flex flex-col gap-10 p-4">
        <View>
          <Font type="title1" color="white">
            안녕하세요, {nickname}님{'\n'}오늘은 어디로 가 볼까요?
          </Font>
          {/* FIXME: 추후 삭제 */}
          <Button onPress={() => navigation.navigate('Camera')}>
            <Text className="text-SPOT-white">카메라</Text>
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
            renderItem={({ item }) => <Card.Small data={item} />}
          />
        </View>
        <View>
          <CardSlider
            title="지금 인기있는 여행지"
            data={mockData}
            renderItem={({ item }) => <Card.Small data={item} />}
          />
        </View>
      </View>
    </BackGroundGradient>
  );
}
