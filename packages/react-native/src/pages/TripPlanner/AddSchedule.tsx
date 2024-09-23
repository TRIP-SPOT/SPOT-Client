import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, CheckBox, Font, TextField } from 'design-system';
import { useRoute } from '@react-navigation/native';
import Header from '@/components/common/Header';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { StackRouteProps } from '@/types/navigation';
import useTripPlanDetailQuery from '@/apis/queries/tripPlan/useTripPlanDetailQuery';
import Spacing from '@/components/common/Spacing';
import useAddSchedule from '@/apis/mutations/useAddSchedule';

export default function AddSchedule() {
  const route = useRoute<StackRouteProps<'TripPlanner/AddSchedule'>>();
  const { tripId } = route.params;
  const { data: spotList } = useTripPlanDetailQuery({ id: tripId });
  const [addType, setAddTYpe] = useState<'new' | 'prev'>();
  const [locationName, setLocationName] = useState('');
  const [locationMemo, setLocationMemo] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<{
    type: 'mySpot' | 'restaurant' | 'hotel';
    id: number;
  }>();
  const { mutate } = useAddSchedule(tripId);

  const addSchedule = () => {
    if (!locationName || !locationMemo) return;

    mutate({
      name: locationName,
      description: locationMemo,
    });
  };

  return (
    <>
      <BackGroundGradient>
        <Header title="장소 추가" />
        <View className="p-2 mt-5">
          <View style={{ gap: 20 }}>
            <TouchableOpacity
              className="flex-row justify-start items-center"
              style={{ gap: 15 }}
              onPress={() => setAddTYpe('new')}
            >
              <CheckBox selected={addType === 'new'} />
              <Font.Bold type="title1" color="white">
                새 장소 추가하기
              </Font.Bold>
            </TouchableOpacity>
            {addType === 'new' && (
              <View className="bg-SPOT-white/50 rounded-md">
                <TextField
                  value={locationName}
                  placeholder="장소명"
                  onChange={(e) => setLocationName(e)}
                  multiline
                  bgColor="transparent"
                  isTitle
                  withoutBorder
                  style={{ paddingBottom: 2 }}
                />
                <TextField
                  value={locationMemo}
                  placeholder="메모"
                  onChange={(e) => setLocationMemo(e)}
                  multiline
                  bgColor="transparent"
                  withoutBorder
                  style={{ paddingTop: 2 }}
                />
              </View>
            )}
            <TouchableOpacity
              className="flex-row justify-start items-center"
              style={{ gap: 15 }}
              onPress={() => setAddTYpe('prev')}
            >
              <CheckBox selected={addType === 'prev'} />
              <Font.Bold type="title1" color="white">
                담은 SPOT!에서 선택하기
              </Font.Bold>
            </TouchableOpacity>
            {addType === 'prev' && (
              <View className="p-4 rounded-3xl bg-SPOT-white/5">
                {spotList.attraction.length > 0 && (
                  <>
                    <Font.Bold type="body1" color="white">
                      나의 SPOT!
                    </Font.Bold>
                    <Spacing height={15} />
                  </>
                )}
                {spotList.attraction.map((mySpot, index) => (
                  <>
                    <TouchableOpacity
                      className="flex-row items-center justify-start"
                      style={{ gap: 20 }}
                      onPress={() => {
                        setSelectedSpot({
                          type: 'mySpot',
                          id: mySpot.contentId,
                        });
                        setLocationName(mySpot.title);
                      }}
                      key={JSON.stringify(mySpot) + index}
                    >
                      <CheckBox
                        selected={
                          selectedSpot?.type === 'mySpot' &&
                          selectedSpot.id === mySpot.contentId
                        }
                      />
                      <Font type="title1" color="white">
                        {mySpot.title}
                      </Font>
                    </TouchableOpacity>
                    {selectedSpot?.type === 'mySpot' &&
                      selectedSpot.id === mySpot.contentId && (
                        <>
                          <Spacing height={10} />
                          <TextField
                            value={locationMemo}
                            placeholder="메모"
                            onChange={(e) => setLocationMemo(e)}
                            multiline
                            withoutBorder
                            style={{ paddingTop: 10 }}
                          />
                        </>
                      )}
                    <Spacing
                      height={
                        index === spotList.attraction.length - 1 ? 30 : 10
                      }
                    />
                  </>
                ))}
                {spotList.restaurant.length > 0 && (
                  <>
                    <Font.Bold type="body1" color="white">
                      담은 음식점
                    </Font.Bold>
                    <Spacing height={15} />
                  </>
                )}
                {spotList.restaurant.map((restaurantItem, index) => (
                  <>
                    <TouchableOpacity
                      className="flex-row items-center justify-start"
                      style={{ gap: 20 }}
                      onPress={() => {
                        setSelectedSpot({
                          type: 'restaurant',
                          id: restaurantItem.contentId,
                        });
                        setLocationName(restaurantItem.title);
                      }}
                      key={JSON.stringify(restaurantItem) + index}
                    >
                      <CheckBox
                        selected={
                          selectedSpot?.type === 'restaurant' &&
                          selectedSpot.id === restaurantItem.contentId
                        }
                      />
                      <Font type="title1" color="white">
                        {restaurantItem.title}
                      </Font>
                    </TouchableOpacity>
                    {selectedSpot?.type === 'restaurant' &&
                      selectedSpot.id === restaurantItem.contentId && (
                        <>
                          <Spacing height={10} />
                          <TextField
                            value={locationMemo}
                            placeholder="메모"
                            onChange={(e) => setLocationMemo(e)}
                            multiline
                            withoutBorder
                            style={{ paddingTop: 10 }}
                          />
                        </>
                      )}
                    <Spacing
                      height={
                        index === spotList.restaurant.length - 1 ? 30 : 10
                      }
                    />
                  </>
                ))}
                {spotList.accommodation.length > 0 && (
                  <>
                    <Font.Bold type="body1" color="white">
                      담은 숙소
                    </Font.Bold>
                    <Spacing height={15} />
                  </>
                )}
                {spotList.accommodation.map((hotel, index) => (
                  <>
                    <TouchableOpacity
                      className="flex-row items-center justify-start"
                      style={{ gap: 20 }}
                      onPress={() => {
                        setSelectedSpot({ type: 'hotel', id: hotel.contentId });
                        setLocationName(hotel.title);
                      }}
                      key={JSON.stringify(hotel) + index}
                    >
                      <CheckBox
                        selected={
                          selectedSpot?.type === 'hotel' &&
                          selectedSpot.id === hotel.contentId
                        }
                      />
                      <Font type="title1" color="white">
                        {hotel.title}
                      </Font>
                    </TouchableOpacity>
                    {selectedSpot?.type === 'hotel' &&
                      selectedSpot.id === hotel.contentId && (
                        <>
                          <Spacing height={10} />
                          <TextField
                            value={locationMemo}
                            placeholder="메모"
                            onChange={(e) => setLocationMemo(e)}
                            multiline
                            withoutBorder
                            style={{ paddingTop: 10 }}
                          />
                        </>
                      )}
                    <Spacing
                      height={
                        index === spotList.accommodation.length - 1 ? 30 : 10
                      }
                    />
                  </>
                ))}
                {spotList.accommodation.length === 0 &&
                  spotList.attraction.length === 0 &&
                  spotList.restaurant.length === 0 && (
                    <Font type="body1" color="white">
                      담은 SPOT이 없습니다.
                    </Font>
                  )}
              </View>
            )}
          </View>
        </View>
      </BackGroundGradient>
      <View style={{ position: 'absolute', bottom: 14, width: '100%' }}>
        <Button onPress={addSchedule}>
          <Font.Bold type="title1" color="white">
            일정 등록하기
          </Font.Bold>
        </Button>
      </View>
    </>
  );
}
