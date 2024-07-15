import { View, Text, FlatList } from 'react-native';
import Card from './common/Card';
import { SpotData } from '../types/spot';

function CardSeperation() {
  return <View style={{ width: 16 }} />;
}

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

export default function SpotForMe() {
  return (
    <View>
      {/* FIXME: 공통 폰트 디자인 적용: text-body1 */}
      <Text className="text-white font-extrabold text-base mb-4">
        나를 위한 여행지
      </Text>
      <FlatList
        data={mockData}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={CardSeperation}
        // @ts-expect-error 2339
        renderItem={({ item }) => <Card data={item} />}
      />
    </View>
  );
}
