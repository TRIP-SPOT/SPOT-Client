import { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { NestableDraggableFlatList } from 'react-native-draggable-flatlist';
import { Button, FloatingPlusButton, Font } from 'design-system';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import Header from '@/components/common/Header';
import withSuspense from '@/components/HOC/withSuspense';
import useTripPlanEditDetailQuery, {
  Schedule,
} from '@/apis/queries/tripPlan/useTripPlanEditDetailQuery';
import { getDateList, getMinimalDateString, normalizeDate } from '@/utils/date';
import Spacing from '@/components/common/Spacing';
import EditIcon from '@/assets/EditIcon';
import EditPlanTitle from '@/components/editPlan/EditPlanTitle';
import ScheduleBlock from '@/components/editPlan/ScheduleBlock';
import useDeleteSchedule from '@/apis/mutations/useDeleteSchedule';
import MutationLoadingModal from '@/components/common/MutationLoadingModal';
import useChangeScheduleOrder from '@/apis/mutations/useChangeScheduleOrder';

const EditTripPlan = withSuspense(() => {
  const route = useRoute<StackRouteProps<'TripPlanner/EditPlan'>>();
  const navigation = useNavigation<StackNavigation<'TripPlanner/EditPlan'>>();
  const [selectedDate, setSelectedDate] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [selectedSchedules, setSelectedSchedules] = useState<number[]>([]);
  const { tripId } = route.params;

  const { data } = useTripPlanEditDetailQuery(tripId);
  const { mutate: deleteSchedules, isPending: isDeleting } = useDeleteSchedule(
    tripId,
    {
      onSuccess: () => {
        setSelectedSchedules([]);
        setEditMode(false);
      },
    },
  );
  const { mutate: changeOrder, isPending: isChangingOrder } =
    useChangeScheduleOrder(tripId);

  const selectedDateObj = normalizeDate(data.startDate);
  selectedDateObj.setDate(selectedDateObj.getDate() + selectedDate);

  const selectedDateSchedules = data.locations
    .filter((location) => location.day === selectedDate)
    .sort((a, b) => a.seq - b.seq);

  const onDragEnd = (schedules: Schedule[], to: number) => {
    const scheduleLength = selectedDateSchedules.length;
    const beforeSeq = schedules[to - 1]?.seq || 0;
    const afterSeq = schedules[to + 1]?.seq || scheduleLength;

    changeOrder({
      scheduleId: schedules[to].id,
      day: selectedDate,
      before: beforeSeq,
      after: afterSeq,
    });
  };

  const selectSchedule = (id: number) => {
    if (selectedSchedules.includes(id)) {
      setSelectedSchedules((prev) =>
        prev.filter((selectedIds) => selectedIds !== id),
      );
    } else setSelectedSchedules((prev) => [...prev, id]);
  };

  return (
    <>
      <MutationLoadingModal isSubmiting={isDeleting || isChangingOrder} />
      <BackGroundGradient>
        <Header title="일정" />
        <View className="flex-1 p-4">
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
              keyExtractor={(item, index) => item.date + item.day + index}
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
            <NestableDraggableFlatList
              className="h-full mt-6 mb-20"
              data={selectedDateSchedules}
              onDragEnd={({ data: schedules, to }) => onDragEnd(schedules, to)}
              keyExtractor={(item, idx) => `${JSON.stringify(item)}-${idx}`}
              renderItem={({ item: info, drag, getIndex }) => {
                const index = getIndex() || 0;
                return (
                  <>
                    <ScheduleBlock
                      title={info.name}
                      description={info.description}
                      order={index}
                      editMode={editMode}
                      onSelect={() => selectSchedule(info.id)}
                      selected={selectedSchedules.includes(info.id)}
                      drag={drag}
                    />
                    <Spacing key={`${JSON.stringify(info)}-sep`} height={10} />
                  </>
                );
              }}
            />
          </View>
        </View>
      </BackGroundGradient>
      {!editMode && (
        <FloatingPlusButton
          onPress={() =>
            navigation.navigate('TripPlanner/AddSchedule', {
              tripId,
              day: selectedDate,
            })
          }
          bottom={14}
          right={12}
        />
      )}
      {editMode && (
        <View style={{ position: 'absolute', bottom: 14, width: '100%' }}>
          <Button
            disabled={selectedSchedules.length === 0}
            onPress={() => deleteSchedules(selectedSchedules)}
          >
            <Font.Bold type="title1" color="white">
              삭제하기
            </Font.Bold>
          </Button>
        </View>
      )}
    </>
  );
});

export default EditTripPlan;
