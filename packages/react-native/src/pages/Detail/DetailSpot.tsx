import { View, ScrollView, FlatList } from 'react-native';
import { Font } from 'design-system';
import AroundCard from '@/components/detail/AroundCard';
import { CardSeperation } from '@/components/common/CardSeperation';

const mockData = [
  {
    id: 1,
    title: '관광지 정보1',
    backgroundImage:
      'https://i.namu.wiki/i/rPbIK73UvaZkqrOVZ2XUs2bqFr8krBAeJRDZIu9dy_2lNEVv2A8ukPsMT2WCQg0mcAIKmVqw7YhdXMek2BUPLUu7pBrT9RRwvnfMRzwLxUL3k7Amfo44GQWagFtAIRfbVPWuGDAHTBDOWN5asD7o7A.webp',
  },
  {
    id: 2,
    title: '관광지 정보2',
    backgroundImage:
      'https://i.namu.wiki/i/rPbIK73UvaZkqrOVZ2XUs2bqFr8krBAeJRDZIu9dy_2lNEVv2A8ukPsMT2WCQg0mcAIKmVqw7YhdXMek2BUPLUu7pBrT9RRwvnfMRzwLxUL3k7Amfo44GQWagFtAIRfbVPWuGDAHTBDOWN5asD7o7A.webp',
  },
  {
    id: 3,
    title: '관광지 정보3',
    backgroundImage:
      'https://i.namu.wiki/i/rPbIK73UvaZkqrOVZ2XUs2bqFr8krBAeJRDZIu9dy_2lNEVv2A8ukPsMT2WCQg0mcAIKmVqw7YhdXMek2BUPLUu7pBrT9RRwvnfMRzwLxUL3k7Amfo44GQWagFtAIRfbVPWuGDAHTBDOWN5asD7o7A.webp',
  },
  {
    id: 4,
    title: '관광지 정보4',
    backgroundImage:
      'https://i.namu.wiki/i/rPbIK73UvaZkqrOVZ2XUs2bqFr8krBAeJRDZIu9dy_2lNEVv2A8ukPsMT2WCQg0mcAIKmVqw7YhdXMek2BUPLUu7pBrT9RRwvnfMRzwLxUL3k7Amfo44GQWagFtAIRfbVPWuGDAHTBDOWN5asD7o7A.webp',
  },
];

export default function DetailSpot() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-[#100F0F] flex-1"
    >
      <View
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <View>
          <Font.Bold type="body1" color="white">
            주변 관광지
          </Font.Bold>
          <FlatList
            data={mockData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={CardSeperation}
            renderItem={({ item }) => (
              <AroundCard
                id={item.id}
                backgroundImage={item.backgroundImage}
                title={item.title}
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}
