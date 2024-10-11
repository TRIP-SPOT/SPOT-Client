import { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FloatingPlusButton, Font } from 'design-system';
import AroundCard from '@/components/detail/AroundCard';
import CardSlider from '@/components/common/CardSlider';
import useAroundSpotQuery from '@/apis/queries/detail/useAroundSpotQuery';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import SpotDetailBottomSheet from '@/components/common/SpotDetailBottomSheet';
import useArrayToggle from '@/hooks/useArrayToggle';
import withSuspense from '@/components/HOC/withSuspense';
import { SpotResponse } from '@/apis/queries/spot/useSpotDetailQuery';
import useAOSPreventBack from '@/hooks/useAOSPreventBack';

export default withSuspense(
  function DetailSpot() {
    const route = useRoute<StackRouteProps<'Home/Detail'>>();
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState<number>();
    const { list, toggleItem, reset } = useArrayToggle<SpotResponse>();
    const navigation = useNavigation<StackNavigation<'Home/Detail'>>();

    const { contentId, workId } = route.params;

    const { data } = useAroundSpotQuery({ id: contentId, workId });

    const selectModeToggle = () => {
      setSelectionMode((prev) => !prev);
    };

    const handleCardClick = (spot: SpotResponse) => {
      if (selectionMode) {
        return toggleItem(spot, 'contentId');
      }
      return setSelectedSpot(spot.contentId);
    };

    useAOSPreventBack({
      isPrevent: selectionMode,
      preventCallback: () => {
        setSelectionMode(false);
        reset();
      },
    });

    useEffect(() => {
      navigation.addListener('blur', () => {
        setSelectionMode(false);
        reset();
      });
    });

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
                data={data.attraction}
                renderItem={({ item }) => (
                  <AroundCard
                    data={item}
                    selectionMode={selectionMode}
                    selectedSpots={list}
                    onCardClick={handleCardClick}
                  />
                )}
                RightActionButton={
                  <TouchableOpacity
                    className="bg-SPOT-red py-2 px-3 justify-center items-center rounded-lg"
                    onPress={selectModeToggle}
                  >
                    <Font type="body3" color="white">
                      {selectionMode ? '선택 취소' : '선택'}
                    </Font>
                  </TouchableOpacity>
                }
              />
              <CardSlider
                title="주변 음식점"
                data={data.restaurant}
                renderItem={({ item }) => (
                  <AroundCard
                    data={item}
                    selectionMode={selectionMode}
                    selectedSpots={list}
                    onCardClick={handleCardClick}
                  />
                )}
              />
              <CardSlider
                title="주변 숙소"
                data={data.accommodation}
                renderItem={({ item }) => (
                  <AroundCard
                    data={item}
                    selectionMode={selectionMode}
                    selectedSpots={list}
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
        {selectionMode && (
          <FloatingPlusButton
            bottom={16}
            right={16}
            onPress={() => {
              const currentRoute = route.name.split('/')[0];
              const nextRoute = `${currentRoute}/AddSpot` as
                | 'Home/AddSpot'
                | 'Mypage/AddSpot';
              navigation.navigate(nextRoute, {
                spots: list,
              });
            }}
            CustomButton={
              <View className="bg-[#3F1111] rounded-full w-14 h-14  flex-col items-center justify-center">
                <View className="flex justify-center items-center flex-col">
                  <View>
                    <Font.Bold type="ui-text" color="white">
                      내 여행에
                    </Font.Bold>
                  </View>
                  <View>
                    <Font.Bold type="ui-text" color="white">
                      담기
                    </Font.Bold>
                  </View>
                </View>
              </View>
            }
          />
        )}
      </>
    );
  },
  {
    fallback: (
      <View className="flex-1 justify-center items-center  bg-SPOT-black">
        <Font type="body1" color="white">
          잠시만
        </Font>
        <Font type="body1" color="white">
          기다려주세요
        </Font>
      </View>
    ),
  },
);
