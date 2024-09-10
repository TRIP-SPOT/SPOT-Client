import { Dimensions, View } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Font } from 'design-system';
import useSpotDetailQuery from '@/apis/queries/spot/useSpotDetailQuery';
import DetailMap from '@/pages/Detail/DetailMap';
import BottomSheet from '../common/BottomSheet';

const { width: fullWidth } = Dimensions.get('window');
const BOTTOM_SHEET_PADDING = 10;

interface MySpotBottomSheetProps {
  selectedDetailSpotId?: number;
  onClose: () => void;
}

export default function MySpotDetailBottomSheet({
  selectedDetailSpotId,
  onClose,
}: MySpotBottomSheetProps) {
  const { data } = useSpotDetailQuery({ id: selectedDetailSpotId });

  return (
    <BottomSheet
      snapPoints={['90%']}
      handleClose={onClose}
      isShow={Boolean(selectedDetailSpotId)}
    >
      <BottomSheetView
        style={{
          flex: 1,
          padding: BOTTOM_SHEET_PADDING,
          gap: 12,
        }}
      >
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
            {data?.address}
          </Font.Bold>
        </View>
        <View>
          <DetailMap width={fullWidth - BOTTOM_SHEET_PADDING * 2} />
        </View>

        <View className="bg-[#191919] rounded-lg p-4">
          <Font color="white" type="body2">
            내용타이틀
          </Font>
          <Font.Bold color="white" type="body2">
            {data?.content}
          </Font.Bold>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
