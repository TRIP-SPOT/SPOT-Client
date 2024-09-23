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
                {spotList.mySpots.length > 0 && (
                  <>
                    <Font.Bold type="body1" color="white">
                      나의 SPOT!
                    </Font.Bold>
                    <Spacing height={15} />
                  </>
                )}
                {spotList.mySpots.map((mySpot, index) => (
                  <>
                    <TouchableOpacity
                      className="flex-row items-center justify-start"
                      style={{ gap: 20 }}
                      onPress={() => {
                        setSelectedSpot({ type: 'mySpot', id: mySpot.id });
                        setLocationName(mySpot.spotName);
                      }}
                      key={JSON.stringify(mySpot) + index}
                    >
                      <CheckBox
                        selected={
                          selectedSpot?.type === 'mySpot' &&
                          selectedSpot.id === mySpot.id
                        }
                      />
                      <Font type="title1" color="white">
                        {mySpot.spotName}
                      </Font>
                    </TouchableOpacity>
                    {selectedSpot?.type === 'mySpot' &&
                      selectedSpot.id === mySpot.id && (
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
                      height={index === spotList.mySpots.length - 1 ? 30 : 10}
                    />
                  </>
                ))}
                {spotList.restaurants.length > 0 && (
                  <>
                    <Font.Bold type="body1" color="white">
                      담은 음식점
                    </Font.Bold>
                    <Spacing height={15} />
                  </>
                )}
                {spotList.restaurants.map((restaurant, index) => (
                  <>
                    <TouchableOpacity
                      className="flex-row items-center justify-start"
                      style={{ gap: 20 }}
                      onPress={() => {
                        setSelectedSpot({
                          type: 'restaurant',
                          id: restaurant.id,
                        });
                        setLocationName(restaurant.spotName);
                      }}
                      key={JSON.stringify(restaurant) + index}
                    >
                      <CheckBox
                        selected={
                          selectedSpot?.type === 'restaurant' &&
                          selectedSpot.id === restaurant.id
                        }
                      />
                      <Font type="title1" color="white">
                        {restaurant.spotName}
                      </Font>
                    </TouchableOpacity>
                    {selectedSpot?.type === 'restaurant' &&
                      selectedSpot.id === restaurant.id && (
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
                        index === spotList.restaurants.length - 1 ? 30 : 10
                      }
                    />
                  </>
                ))}
                {spotList.hotels.length > 0 && (
                  <>
                    <Font.Bold type="body1" color="white">
                      담은 숙소
                    </Font.Bold>
                    <Spacing height={15} />
                  </>
                )}
                {spotList.hotels.map((hotel, index) => (
                  <>
                    <TouchableOpacity
                      className="flex-row items-center justify-start"
                      style={{ gap: 20 }}
                      onPress={() => {
                        setSelectedSpot({ type: 'hotel', id: hotel.id });
                        setLocationName(hotel.spotName);
                      }}
                      key={JSON.stringify(hotel) + index}
                    >
                      <CheckBox
                        selected={
                          selectedSpot?.type === 'hotel' &&
                          selectedSpot.id === hotel.id
                        }
                      />
                      <Font type="title1" color="white">
                        {hotel.spotName}
                      </Font>
                    </TouchableOpacity>
                    {selectedSpot?.type === 'hotel' &&
                      selectedSpot.id === hotel.id && (
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
                      height={index === spotList.hotels.length - 1 ? 30 : 10}
                    />
                  </>
                ))}
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
