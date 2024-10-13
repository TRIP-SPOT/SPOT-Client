import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { Font } from 'design-system';
import Header from '@/components/common/Header';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { RecordFormProvider } from '@/hooks/useRecordFormState';
import RecordPostForm from '@/components/maps/RecordPostForm';
import { BADGE_MAPPER, Region, REVERSE_REGION_MAPPER } from '@/constants/CITY';
import Badge from '@/components/common/Badge';
import { StackNavigation, StackRouteProps } from '@/types/navigation';
import BadgeModal from '@/components/common/BadgeModal';

export default function PostRecord() {
  const [recordModalInfo, setRecordModalInfo] = useState<Region>();
  const region = recordModalInfo && REVERSE_REGION_MAPPER[recordModalInfo];
  const navigate = useNavigation<StackNavigation<'Maps/Record'>>();
  const { params } = useRoute<StackRouteProps<'Maps/PostRecord'>>();

  const closeModal = () => {
    setRecordModalInfo(undefined);
    navigate.navigate('Maps/Record', {
      location: params.location,
    });
  };

  return (
    <BackGroundGradient>
      <Header title="로그 등록" />
      <RecordFormProvider>
        <RecordPostForm setRecordModalInfo={setRecordModalInfo} />
      </RecordFormProvider>
      {recordModalInfo && (
        <BadgeModal visible={Boolean(recordModalInfo)} handleClose={closeModal}>
          <View className="justify-center gap-2 flex-row items-center flex mt-6">
            <Font.Bold type="title1" color="white">
              {region}
            </Font.Bold>
          </View>
          <View className="justify-center items-center">
            <Font type="body1" color="white">
              배지를 1개 획득했습니다.
            </Font>
            <View className="p-4">
              <Badge preventFade location={BADGE_MAPPER[recordModalInfo]} />
            </View>
          </View>
        </BadgeModal>
      )}
    </BackGroundGradient>
  );
}
