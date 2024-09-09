import { TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Font, FloatingPlusButton } from 'design-system';
import SortIcon from '@/assets/SortIcon';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { LOG_PADDING_X } from '@/components/maps/RecordCard';
import RecordCardList, { MockCardData } from '@/components/maps/RecordCardList';
import Header from '@/components/common/Header';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import useBottomSheet from '@/hooks/useBottomSheet';

interface RecordsProps {
  navigation: StackNavigation<'Maps/Record'>;
}

export default function Records({ navigation }: RecordsProps) {
  const { BottomSheet, showBottonSheet } = useBottomSheet();

  const [selectedRecord, setSelectedRecord] = useState<MockCardData>();
  const sort = () => {
    // TODO: 실제 구현 필요(현재 UI없음)
  };

  const route = useRoute<StackRouteProps<'Maps/Record'>>();

  const handleClickCard = (selectedCardData: MockCardData) => {
    showBottonSheet();
    setSelectedRecord(selectedCardData);
  };

  return (
    <View>
      <BackGroundGradient>
        <Header
          RightActionButton={
            <TouchableOpacity onPress={sort} className="px-4">
              <SortIcon />
            </TouchableOpacity>
          }
          title={route.params.location}
        />
        <View
          className="relative flex-1 min-h-[100vh]"
          style={{
            paddingLeft: LOG_PADDING_X,
            paddingRight: LOG_PADDING_X,
          }}
        >
          <RecordCardList handleOpenOptions={handleClickCard} />
        </View>
      </BackGroundGradient>
      <FloatingPlusButton
        onPress={() =>
          navigation.navigate('Maps/PostRecord', {
            location: route.params.location,
          })
        }
        bottom={16}
        right={16}
      />
      {selectedRecord && (
        <BottomSheet isShow={Boolean(selectedRecord)}>
          <View className="flex justify-evenly items-center mt-2 flex-col gap-4">
            <View className="flex">
              <Font.Bold type="mainTitle" color="black">
                {selectedRecord.title}
              </Font.Bold>
            </View>
            <View className="flex items-center w-full ">
              <TouchableOpacity
                className="py-2"
                onPress={() =>
                  navigation.navigate('Maps/ModifyRecord', {
                    location: route.params.location,
                    recordId: selectedRecord.id,
                  })
                }
              >
                <Font.Light type="title1" color="black">
                  수정
                </Font.Light>
              </TouchableOpacity>
              <View className="w-[90%] h-[0.5px] bg-[#333333]" />
              <TouchableOpacity className="py-2">
                <Font.Light type="title1" color="black">
                  삭제
                </Font.Light>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      )}
    </View>
  );
}
