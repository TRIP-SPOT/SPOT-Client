import { Alert, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Font, FloatingPlusButton } from 'design-system';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import SortIcon from '@/assets/SortIcon';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { LOG_PADDING_X } from '@/components/maps/RecordCard';
import RecordCardList from '@/components/maps/RecordCardList';
import Header from '@/components/common/Header';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import useToggle from '@/hooks/useToggle';
import BottomSheet from '@/components/common/BottomSheet';
import useRecordsQuery, {
  RecordResponse,
} from '@/apis/queries/records/useRecordsQuery';
import withSuspense from '@/components/HOC/withSuspense';
import useRecordMutation from '@/apis/mutations/useRecordMutation';
import useSortByStartDate from '@/hooks/useSortByStartDate';

interface RecordsProps {
  navigation: StackNavigation<'Maps/Record'>;
}

export default withSuspense(function Records({ navigation }: RecordsProps) {
  const route = useRoute<StackRouteProps<'Maps/Record'>>();
  const { data: recordsData } = useRecordsQuery({
    location: route.params.location,
  });
  const { data, toggleSortOrder } = useSortByStartDate({
    defaultData: recordsData,
  });

  const { deleteMutate } = useRecordMutation({
    location: route.params.location,
  });

  const [showBottomSheet, toggleBottomSheet] = useToggle();
  const [selectedRecord, setSelectedRecord] = useState<RecordResponse>();

  const handleOpenOption = (selectedCardData: RecordResponse) => {
    setSelectedRecord(selectedCardData);
    toggleBottomSheet(true);
  };

  const isEmpty = recordsData.length === 0;

  return (
    <View>
      <BackGroundGradient withoutScroll={isEmpty}>
        <Header
          RightActionButton={
            <TouchableOpacity
              onPress={() => toggleSortOrder()}
              className="px-4"
            >
              <SortIcon />
            </TouchableOpacity>
          }
          title={route.params.location}
        />
        {isEmpty ? (
          <View className="flex justify-center flex-1 items-center">
            <Font type="body1" color="white">
              비어있어요
            </Font>
            <Font type="body1" color="white">
              나만의 여행 기록을 채워보세요
            </Font>
          </View>
        ) : (
          <View
            className="relative flex-1 min-h-[100vh]"
            style={{
              paddingLeft: LOG_PADDING_X,
              paddingRight: LOG_PADDING_X,
            }}
          >
            <RecordCardList cards={data} handleOpenOptions={handleOpenOption} />
          </View>
        )}
      </BackGroundGradient>
      <FloatingPlusButton
        onPress={() => {
          navigation.navigate('Maps/PostRecord', {
            location: route.params.location,
          });
        }}
        bottom={16}
        right={16}
      />
      {selectedRecord && (
        <BottomSheet
          isShow={showBottomSheet}
          handleClose={() => toggleBottomSheet(false)}
          snapPoints={['25%']}
        >
          <BottomSheetView
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <View className="flex justify-evenly items-center flex-col gap-2">
              <View className="flex">
                <Font.Bold type="mainTitle" color="black">
                  {selectedRecord.title}
                </Font.Bold>
              </View>
              <View className="flex items-center w-full">
                <TouchableOpacity
                  className="py-2"
                  onPress={() => {
                    toggleBottomSheet(false);
                    navigation.navigate('Maps/ModifyRecord', {
                      location: route.params.location,
                      recordId: selectedRecord.id,
                    });
                  }}
                >
                  <Font.Light type="title1" color="black">
                    수정
                  </Font.Light>
                </TouchableOpacity>
                <View className="w-[90%] h-[0.5px] bg-[#333333]" />
                <TouchableOpacity
                  className="py-2"
                  onPress={() => {
                    Alert.alert('정말 삭제하시겠습니까?', '', [
                      {
                        text: '삭제',
                        onPress: async () => {
                          await deleteMutate({
                            id: selectedRecord.id,
                          });
                          toggleBottomSheet(false);
                        },
                        style: 'destructive',
                      },
                      {
                        text: '취소',
                        onPress: () => toggleBottomSheet(false),
                      },
                    ]);
                  }}
                >
                  <Font.Light type="title1" color="black">
                    삭제
                  </Font.Light>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>
  );
});
