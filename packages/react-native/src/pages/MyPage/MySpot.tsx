import { FlatList } from 'react-native';
import { useState } from 'react';
import MySpotBlock from '@/components/mypage/MySpotBlock';
import SpotDetailBottomSheet from '@/components/common/SpotDetailBottomSheet';

const mockData = [
  {
    id: 1,
    title: '여행',
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
    location: '주문진 방파제',
    date: '2024.01.01',
  },
  {
    id: 2,
    title: '여행',
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
    location: '주문진 방파제',
    date: '2024.01.02',
  },
  {
    id: 3,
    title: '여행',
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
    location: '주문진 방파제',
    date: '2024.01.03',
  },
  {
    id: 4,
    title: '여행',
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
    location: '주문진 방파제',
    date: '2024.01.04',
  },
  {
    id: 5,
    title: '여행',
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
    location: '주문진 방파제',
    date: '2024.01.05',
  },
  {
    id: 6,
    title: '여행',
    backgroundImage: 'https://cdn.hankyung.com/photo/202208/03.30909476.1.jpg',
    location: '주문진 방파제',
    date: '2024.01.06',
  },
];

export default function MySpot() {
  const [containerWidth, setContainerWidth] = useState(0);
  const [selectedDetailSpotId, setSelectedDetailSpotId] = useState<number>();
  const numColumns = 2;
  const paddingHorizontal = 8;
  const gap = 16;

  return (
    <>
      <FlatList
        data={mockData}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        style={{ flex: 1, backgroundColor: 'black', paddingHorizontal }}
        renderItem={({ item }) => (
          <MySpotBlock
            id={item.id}
            title={item.title}
            backgroundImage={item.backgroundImage}
            location={item.location}
            date={item.date}
            width={
              (containerWidth - gap * 2 - paddingHorizontal * 2) / numColumns
            }
            gap={gap}
            handleClickBlock={() => setSelectedDetailSpotId(item.id)}
          />
        )}
        keyExtractor={(item) => item.title + item.location + item.date}
        numColumns={numColumns}
      />
      <SpotDetailBottomSheet
        selectedDetailSpotId={selectedDetailSpotId}
        onClose={() => setSelectedDetailSpotId(undefined)}
      />
    </>
  );
}
