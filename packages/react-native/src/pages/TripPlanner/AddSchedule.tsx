import { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Button, CheckBox, Font, TextField } from 'design-system';
import { useRoute } from '@react-navigation/native';
import Header from '@/components/common/Header';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { StackRouteProps } from '@/types/navigation';

export default function AddSchedule() {
  const route = useRoute<StackRouteProps<'TripPlanner/AddSchedule'>>();
  const { tripId } = route.params;
  const [addType, setAddTYpe] = useState<'new' | 'prev'>();
  const [locationName, setLocationName] = useState('');
  const [locationMemo, setLocationMemo] = useState('');

  return (
    <BackGroundGradient withoutScroll>
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
        </View>
      </View>
      <View style={{ position: 'absolute', bottom: 14, width: '100%' }}>
        <Button>
          <Font.Bold type="title1" color="white">
            일정 등록하기
          </Font.Bold>
        </Button>
      </View>
    </BackGroundGradient>
  );
}
