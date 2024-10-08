import { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Button, FloatingPlusButton, Font } from 'design-system';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import Header from '@/components/common/Header';
import withSuspense from '@/components/HOC/withSuspense';
import useTripPlanEditDetailQuery, {
  Schedule,
  ScheduleDetail,
} from '@/apis/queries/tripPlan/useTripPlanEditDetailQuery';
import { getDateList, getMinimalDateString, normalizeDate } from '@/utils/date';
import Spacing from '@/components/common/Spacing';
import EditIcon from '@/assets/EditIcon';
import EditPlanTitle from '@/components/editPlan/EditPlanTitle';
import ScheduleBlock from '@/components/editPlan/ScheduleBlock';
import useDeleteSchedule from '@/apis/mutations/useDeleteSchedule';
import MutationLoadingModal from '@/components/common/MutationLoadingModal';
import useChangeScheduleOrder from '@/apis/mutations/useChangeScheduleOrder';

function Background({ children }: { children: React.ReactNode }) {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#FF1919', '#000000']}
      start={{ x: 0, y: -0.5 }}
      end={{ x: 0, y: 0.5 }}
      className="h-full"
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.4)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="h-full"
      >
        <SafeAreaView className="flex-1">
          <NestableScrollContainer
            showsVerticalScrollIndicator={false}
            className="flex-1"
            style={{
              marginTop: headerHeight - insets.top,
            }}
          >
            {children}
          </NestableScrollContainer>
        </SafeAreaView>
      </LinearGradient>
    </LinearGradient>
  );
}

function ScheduleArea({
  editMode,
  selectedSchedules,
  setSelectedSchedules,
  selectedDateSchedules,
  selectedDate,
}: {
  editMode: boolean;
  setSelectedSchedules: React.Dispatch<React.SetStateAction<number[]>>;
  selectedSchedules: number[];
  selectedDateSchedules: Schedule[];
  selectedDate: number;
}) {
  const route = useRoute<StackRouteProps<'TripPlanner/EditPlan'>>();
  const { tripId } = route.params;

  const { mutate: changeOrder, isPending: isChangingOrder } =
    useChangeScheduleOrder(tripId);

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
      <MutationLoadingModal isSubmiting={isChangingOrder} />
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
    </>
  );
}

function AddScheduleButton({
  isShow,
  selectedDate,
}: {
  isShow: boolean;
  selectedDate: number;
}) {
  const route = useRoute<StackRouteProps<'TripPlanner/EditPlan'>>();
  const navigation = useNavigation<StackNavigation<'TripPlanner/EditPlan'>>();
  const { tripId } = route.params;

  return (
    isShow && (
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
    )
  );
}

function DateSelector({
  data,
  selectedDate,
  setSelectedDate,
}: {
  data: ScheduleDetail;
  selectedDate: number;
  setSelectedDate: (value: React.SetStateAction<number>) => void;
}) {
  const Separoator = useCallback(() => <View style={{ width: 10 }} />, []);

  return (
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
          <Font type="body1" color={selectedDate === index ? 'black' : 'white'}>
            {item.day}
          </Font>
          <Spacing height={3} />
          <Font type="body1" color={selectedDate === index ? 'black' : 'white'}>
            {item.date}
          </Font>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={Separoator}
    />
  );
}

function DeleteShceduleButton({
  isShow,
  selectedSchedules,
  onSuccessDelete,
}: {
  isShow: boolean;
  selectedSchedules: number[];
  onSuccessDelete: () => void;
}) {
  const route = useRoute<StackRouteProps<'TripPlanner/EditPlan'>>();
  const { tripId } = route.params;
  const { mutate: deleteSchedules, isPending: isDeleting } = useDeleteSchedule(
    tripId,
    {
      onSuccess: onSuccessDelete,
    },
  );

  return (
    <>
      <MutationLoadingModal isSubmiting={isDeleting} />
      {isShow && (
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
}

const EditTripPlan = withSuspense(() => {
  const route = useRoute<StackRouteProps<'TripPlanner/EditPlan'>>();
  const [selectedDate, setSelectedDate] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [selectedSchedules, setSelectedSchedules] = useState<number[]>([]);
  const { tripId } = route.params;
  const { data } = useTripPlanEditDetailQuery(tripId);

  const onSuccessDelete = () => {
    setSelectedSchedules([]);
    setEditMode(false);
  };

  const selectedDateObj = normalizeDate(data.startDate);
  selectedDateObj.setDate(selectedDateObj.getDate() + selectedDate);

  const selectedDateSchedules = data.locations
    .filter((location) => location.day === selectedDate)
    .sort((a, b) => a.seq - b.seq);

  return (
    <>
      <Background>
        <Header title="일정" />
        <View className="flex-1 p-4">
          <EditPlanTitle
            startDate={data.startDate}
            endDate={data.endDate}
            region={data.region}
            city={data.city}
          />
          <View>
            <DateSelector
              data={data}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
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
            <ScheduleArea
              selectedDate={selectedDate}
              editMode={editMode}
              setSelectedSchedules={setSelectedSchedules}
              selectedDateSchedules={selectedDateSchedules}
              selectedSchedules={selectedSchedules}
            />
          </View>
        </View>
      </Background>
      <AddScheduleButton isShow={!editMode} selectedDate={selectedDate} />
      <DeleteShceduleButton
        isShow={editMode}
        selectedSchedules={selectedSchedules}
        onSuccessDelete={onSuccessDelete}
      />
    </>
  );
});

export default EditTripPlan;
