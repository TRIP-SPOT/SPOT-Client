import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FloatingPlusButton } from 'design-system';
import AroundCard from '@/components/detail/AroundCard';
import CardSlider from '@/components/common/CardSlider';
import useAroundSpotQuery, {
  AroundSpot,
} from '@/apis/queries/detail/useAroundSpotQuery';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import SpotDetailBottomSheet from '@/components/common/SpotDetailBottomSheet';
import useArrayToggle from '@/hooks/useArrayToggle';

export default function DetailSpot() {
  const route = useRoute<StackRouteProps<'Home/Detail'>>();
  const [longPressMode, setLongPressMode] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<number>();
  const { list, toggleItem } = useArrayToggle<AroundSpot>();
  const navigation = useNavigation<StackNavigation<'Home/Detail'>>();

  const { id } = route.params;

  const { data } = useAroundSpotQuery({ id });

  const startLongPress = (spot: AroundSpot) => {
    if (!longPressMode) {
      setLongPressMode(true);
      toggleItem(spot, 'id');
    }
  };

  const handleCardClick = (spot: AroundSpot) => {
    if (longPressMode) {
      return toggleItem(spot, 'id');
    }
    return setSelectedSpot(spot.id);
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-[#100F0F] flex-1 relative"
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
                  selectedSpots={list}
                  onCardClick={handleCardClick}
                  startLongPress={startLongPress}
                />
              )}
            />
            <CardSlider
              title="음식점"
              data={data.restaurantss}
              renderItem={({ item }) => (
                <AroundCard
                  data={item}
                  isLongPressMode={longPressMode}
                  selectedSpots={list}
                  startLongPress={startLongPress}
                  onCardClick={handleCardClick}
                />
              )}
            />
          </View>
        </View>
        <SpotDetailBottomSheet
          selectedDetailSpotId={selectedSpot}
          onClose={() => setSelectedSpot(undefined)}
        />
      </ScrollView>
      {longPressMode && (
        <FloatingPlusButton
          bottom={16}
          right={16}
          onPress={() => {
            navigation.navigate('Home/AddSpot', {
              spots: list,
            });
          }}
        />
      )}
    </>
  );
}
