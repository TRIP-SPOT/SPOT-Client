import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import AroundCard from '@/components/detail/AroundCard';
import CardSlider from '@/components/common/CardSlider';
import BottomSheet from '@/components/common/BottomSheet';
import useAroundSpotQuery from '@/apis/queries/detail/useAroundSpotQuery';
import { StackRouteProps } from '@/types/navigation';
import MySpotDetailBottomSheet from '@/components/mypage/MySpotDetailBottomSheet';

export default function DetailSpot() {
  const route = useRoute<StackRouteProps<'Home/Detail'>>();
  const [selectedSpots, setSelectedSpots] = useState<number[]>([]);
  const [longPressMode, setLongPressMode] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<number>();

  const { id } = route.params;

  const { data } = useAroundSpotQuery({ id });

  const toggleSelect = (spotId: number) => {
    if (selectedSpots.includes(spotId)) {
      return setSelectedSpots((prev) =>
        prev.filter((prevId) => spotId !== prevId),
      );
    }
    return setSelectedSpots((prev) => [...prev, spotId]);
  };

  const startLongPress = (spotId: number) => {
    if (!longPressMode) {
      setLongPressMode(true);
      toggleSelect(spotId);
    }
  };

  const handleCardClick = (spotId: number) => {
    if (longPressMode) {
      return toggleSelect(spotId);
    }
    return setSelectedSpot(spotId);
  };

  if (!data) {
    return null;
  }

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
            data={data.attractions}
            renderItem={({ item }) => (
              <AroundCard
                data={item}
                isLongPressMode={longPressMode}
                selectedSpots={selectedSpots}
                onCardClick={handleCardClick}
                startLongPress={startLongPress}
              />
            )}
          />
          <CardSlider
            title="음식점"
            data={data.restaurants}
            renderItem={({ item }) => (
              <AroundCard
                data={item}
                isLongPressMode={longPressMode}
                selectedSpots={selectedSpots}
                startLongPress={startLongPress}
                onCardClick={handleCardClick}
              />
            )}
          />
        </View>
      </View>
      <MySpotDetailBottomSheet
        selectedDetailSpotId={selectedSpot}
        onClose={() => setSelectedSpot(undefined)}
      />
    </ScrollView>
  );
}
