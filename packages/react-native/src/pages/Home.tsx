import { View, Text } from 'react-native';
import { Button, Font } from 'design-system';
import CardSlider from '@components/CardSlider';
import SearchBar from '@components/common/SearchBar';
import { SpotData } from '@/types/spot';
import { ScreenNavigationProp } from '@/types/navigation';
import BackGroundGradient from '@/layouts/BackGroundGradient';

const mockData: SpotData[] = [
  {
    locationName: '주문진 방파제',
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
    liked: false,
    backgroundImage:
      'https://i.namu.wiki/i/rPbIK73UvaZkqrOVZ2XUs2bqFr8krBAeJRDZIu9dy_2lNEVv2A8ukPsMT2WCQg0mcAIKmVqw7YhdXMek2BUPLUu7pBrT9RRwvnfMRzwLxUL3k7Amfo44GQWagFtAIRfbVPWuGDAHTBDOWN5asD7o7A.webp',
  },
  {
    locationName: '주문진 방파제',
    location: '강원 강릉',
    tags: ['바다', '도깨비'],
    liked: false,
    backgroundImage:
      'https://i.namu.wiki/i/rPbIK73UvaZkqrOVZ2XUs2bqFr8krBAeJRDZIu9dy_2lNEVv2A8ukPsMT2WCQg0mcAIKmVqw7YhdXMek2BUPLUu7pBrT9RRwvnfMRzwLxUL3k7Amfo44GQWagFtAIRfbVPWuGDAHTBDOWN5asD7o7A.webp',
  },
  {
    locationName: '주문진 방파제',
    location: '강원 강릉',
    tags: ['바다', '도깨비'],
    liked: false,
    backgroundImage:
      'https://i.namu.wiki/i/rPbIK73UvaZkqrOVZ2XUs2bqFr8krBAeJRDZIu9dy_2lNEVv2A8ukPsMT2WCQg0mcAIKmVqw7YhdXMek2BUPLUu7pBrT9RRwvnfMRzwLxUL3k7Amfo44GQWagFtAIRfbVPWuGDAHTBDOWN5asD7o7A.webp',
  },
  {
    locationName: '주문진 방파제',
    location: '강원 강릉',
    tags: ['바다', '도깨비'],
    liked: false,
    backgroundImage:
      'https://i.namu.wiki/i/rPbIK73UvaZkqrOVZ2XUs2bqFr8krBAeJRDZIu9dy_2lNEVv2A8ukPsMT2WCQg0mcAIKmVqw7YhdXMek2BUPLUu7pBrT9RRwvnfMRzwLxUL3k7Amfo44GQWagFtAIRfbVPWuGDAHTBDOWN5asD7o7A.webp',
  },
];

interface HomeScreenProps {
  navigation: ScreenNavigationProp<'Main'>;
}

export default function Home({ navigation }: HomeScreenProps) {
  return (
    <BackGroundGradient>
      <View className="flex flex-col gap-10 p-4">
        <View>
          <Font type="title1" color="white">
            안녕하세요, 아무개님.{'\n'}오늘은 어디로 가 볼까요?
          </Font>
          {/* FIXME: 추후 삭제 */}
          <Button onPress={() => navigation.navigate('Camera')}>
            <Text className="text-SPOT-white">카메라</Text>
          </Button>
        </View>
        <View>
          <SearchBar placeholder="드라마/영화 제목을 검색하세요." />
        </View>
        <View>
          <CardSlider title="나를 위한 여행지" data={mockData} />
        </View>
        <View>
          <CardSlider title="지금 인기있는 여행지" data={mockData} />
        </View>
      </View>
    </BackGroundGradient>
  );
}
