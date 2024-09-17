import { useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, FloatingPlusButton, Font } from 'design-system';
import { useRoute } from '@react-navigation/native';
import { StackRouteProps } from '@/types/navigation';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import Header from '@/components/common/Header';
import withSuspense from '@/components/HOC/withSuspense';
import useTripPlanEditDetailQuery from '@/apis/queries/tripPlan/useTripPlanEditDetailQuery';
import { getDateList, getMinimalDateString, normalizeDate } from '@/utils/date';
import Spacing from '@/components/common/Spacing';
import EditIcon from '@/assets/EditIcon';
import EditPlanTitle from '@/components/editPlan/EditPlanTitle';
import ScheduleBlock from '@/components/editPlan/ScheduleBlock';

const EditTripPlan = withSuspense(() => {
  const route = useRoute<StackRouteProps<'TripPlanner/EditPlan'>>();
  const [selectedDate, setSelectedDate] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [selectedSchedules, setSelectedSchedules] = useState<number[]>([]);
  const { tripId } = route.params;

  const { data } = useTripPlanEditDetailQuery(tripId);
  const selectedDateObj = normalizeDate(data.startDate);
  selectedDateObj.setDate(selectedDateObj.getDate() + selectedDate);

  const selectSchedule = (id: number) => {
    if (selectedSchedules.includes(id)) {
      setSelectedSchedules((prev) =>
        prev.filter((selectedIds) => selectedIds !== id),
      );
    } else setSelectedSchedules((prev) => [...prev, id]);
  };

  return (
    <BackGroundGradient withoutScroll>
      <Header title="일정" />
      <View className="p-4">
        <EditPlanTitle
          startDate={data.startDate}
          endDate={data.endDate}
          region={data.region}
          city={data.city}
        />
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
            <TouchableOpacity
              className="bg-[#4c4c4c] p-2 rounded-full"
              onPress={() => {
                setEditMode((prev) => !prev);
                setSelectedSchedules([]);
              }}
            >
              <EditIcon />
            </TouchableOpacity>
          </View>
          <ScrollView className="h-full mt-6">
            {data.schedules
              .filter((schedule) => schedule.day === selectedDate + 1)
              .sort((a, b) => a.order - b.order)
              .map((info) => (
                <>
                  <ScheduleBlock
                    key={JSON.stringify(info)}
                    title={info.name}
                    description={info.description}
                    order={info.order}
                    editMode={editMode}
                    onSelect={() => selectSchedule(info.id)}
                    selected={selectedSchedules.includes(info.id)}
                  />
                  <Spacing height={10} />
                </>
              ))}
          </ScrollView>
        </View>
      </View>
      {!editMode && (
        <FloatingPlusButton onPress={() => {}} bottom={14} right={12} />
      )}
      {editMode && (
        <View style={{ position: 'absolute', bottom: 14, width: '100%' }}>
          <Button disabled={selectedSchedules.length === 0} onPress={() => {}}>
            <Font.Bold type="title1" color="white">
              삭제하기
            </Font.Bold>
          </Button>
        </View>
      )}
    </BackGroundGradient>
  );
});

export default EditTripPlan;
