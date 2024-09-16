import { useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import { useRoute } from '@react-navigation/native';
import { StackRouteProps } from '@/types/navigation';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import Header from '@/components/common/Header';
import withSuspense from '@/components/HOC/withSuspense';
import { getDisplayRegion } from '@/utils/getDisplayRegionName';
import useTripPlanEditDetailQuery from '@/apis/queries/tripPlan/useTripPlanEditDetailQuery';
import {
  getDateList,
  getDateString,
  getMinimalDateString,
  normalizeDate,
} from '@/utils/date';
import BackIcon from '@/assets/BackIcon';
import Spacing from '@/components/common/Spacing';
import EditIcon from '@/assets/EditIcon';

const EditTripPlan = withSuspense(() => {
  const route = useRoute<StackRouteProps<'TripPlanner/EditPlan'>>();
  const [selectedDate, setSelectedDate] = useState(0);
  const { tripId } = route.params;

  const { data } = useTripPlanEditDetailQuery(tripId);
  const selectedDateObj = normalizeDate(data.startDate);
  selectedDateObj.setDate(selectedDateObj.getDate() + selectedDate);

  return (
    <BackGroundGradient withoutScroll>
      <Header title="일정" />
      <View className="p-4">
        <View className="items-center">
          <View
            className="items-center justify-center flex-row"
            style={{ gap: 30 }}
          >
            <TouchableOpacity className="p-2">
              <BackIcon />
            </TouchableOpacity>
            <View className="items-center">
              <Font.Bold type="title1" color="white">
                {getDisplayRegion({
                  locationEnum: data.region,
                  cityEnum: data.city,
                })}
              </Font.Bold>
              <Font.Light type="body3" color="white">
                {getDateString(data.startDate, '.')}
                {' - '}
                {getDateString(data.endDate, '.')}
              </Font.Light>
            </View>
            <TouchableOpacity className="rotate-180 p-2">
              <BackIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <FlatList
            horizontal
            className="mt-8"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.date + item.day}
            data={getDateList(data.startDate, data.endDate)}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                className={`p-2.5 px-3 rounded-xl w-12 items-center ${selectedDate === index ? 'bg-SPOT-white/80' : 'bg-SPOT-white/20'}`}
                onPress={() => setSelectedDate(index)}
              >
                <Font
                  type="body1"
                  color={selectedDate === index ? 'black' : 'white'}
                >
                  {item.day}
                </Font>
                <Spacing height={3} />
                <Font
                  type="body1"
                  color={selectedDate === index ? 'black' : 'white'}
                >
                  {item.date}
                </Font>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          />
        </View>
        <View className="mt-10">
          <View className="flex-row justify-between">
            <View className="flex-row items-center" style={{ gap: 10 }}>
              <Font.Bold type="title1" color="white">
                {selectedDate + 1}일차
              </Font.Bold>
              <Font.Light type="body3" color="white">
                {getMinimalDateString(selectedDateObj)}
              </Font.Light>
            </View>
            <TouchableOpacity className="bg-[#4c4c4c] p-2 rounded-full">
              <EditIcon />
            </TouchableOpacity>
          </View>
          <ScrollView className="h-full mt-6">
            <View className="flex-row justify-between items-center">
              <View className="rounded-sm w-5 h-5 items-center justify-center bg-[#4c4c4c] mr-4">
                <Font.Bold type="body2" color="white">
                  1
                </Font.Bold>
              </View>
              <View className="bg-SPOT-white/40 p-2.5 px-3 rounded-md flex-1">
                <Font.Bold type="title1" color="white">
                  주문진 방파제
                </Font.Bold>
                <Font type="body1" color="white">
                  도깨비 촬영지{' '}
                </Font>
              </View>
            </View>
            <Spacing height={10} />
            <View className="flex-row justify-between items-center">
              <View className="rounded-sm w-5 h-5 items-center justify-center bg-[#4c4c4c] mr-4">
                <Font.Bold type="body2" color="white">
                  2
                </Font.Bold>
              </View>
              <View className="bg-SPOT-white/40 p-2.5 px-3 rounded-md flex-1">
                <Font.Bold type="title1" color="white">
                  주문진 방파제
                </Font.Bold>
                <Font type="body1" color="white">
                  도깨비 촬영지{' '}
                </Font>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </BackGroundGradient>
  );
});

export default EditTripPlan;
