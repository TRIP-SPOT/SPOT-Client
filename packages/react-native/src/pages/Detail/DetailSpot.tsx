import { View, ScrollView } from 'react-native';
import AroundCard from '@/components/detail/AroundCard';
import CardSlider from '@/components/common/CardSlider';

const mockData = [
  {
    id: 1,
    title: '관광지 정보1',
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
  },
  {
    id: 2,
    title: '관광지 정보2',
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
  },
  {
    id: 3,
    title: '관광지 정보3',
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
  },
  {
    id: 4,
    title: '관광지 정보4',
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
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
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            gap: 35,
          }}
        >
          <CardSlider
            title="주변 관광지"
            data={mockData}
            renderItem={({ item }) => (
              <AroundCard
                id={item.id}
                backgroundImage={item.backgroundImage}
                title={item.title}
              />
            )}
          />
          <CardSlider
            title="음식점"
            data={mockData}
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
