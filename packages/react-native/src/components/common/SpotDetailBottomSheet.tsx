import { Dimensions, View } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Font } from 'design-system';
import useSpotDetailQuery from '@/apis/queries/spot/useSpotDetailQuery';
import DetailMap from '@/pages/Detail/DetailMap';
import BottomSheet from './BottomSheet';

const { width: fullWidth } = Dimensions.get('window');
const BOTTOM_SHEET_PADDING = 10;

interface MySpotBottomSheetProps {
  selectedDetailSpotId?: number;
  onClose: () => void;
}

export default function SpotDetailBottomSheet({
  selectedDetailSpotId,
  onClose,
}: MySpotBottomSheetProps) {
  const { data } = useSpotDetailQuery({ id: selectedDetailSpotId });

  return (
    <BottomSheet
      snapPoints={['99%']}
      handleClose={onClose}
      isShow={Boolean(selectedDetailSpotId)}
    >
      <BottomSheetScrollView
        style={{
          flex: 1,
          padding: BOTTOM_SHEET_PADDING,
        }}
      >
        <View className="flex justify-start gap-3 pb-4">
          <View className="flex justify-start items-center">
            <Font type="mainTitle" color="black">
              {data?.title}
            </Font>
          </View>
          <View className="bg-[#191919] rounded-lg p-4">
            <Font color="white" type="body2">
              주소
            </Font>
            <Font.Bold color="white" type="body2">
              {data?.addr1} {data?.addr2}
            </Font.Bold>
          </View>
          <View>
            <DetailMap
              width={fullWidth - BOTTOM_SHEET_PADDING * 2}
              longitude={data?.longitude}
              latitude={data?.latitude}
            />
          </View>

          <View className="bg-[#191919] rounded-lg p-4">
            <Font color="white" type="body2">
              상세 정보
            </Font>
            <Font.Bold color="white" type="body2">
              {data?.overview}
            </Font.Bold>
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
