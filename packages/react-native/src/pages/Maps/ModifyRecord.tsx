import { useRoute } from '@react-navigation/native';
import useRecordDetailQuery from '@/apis/queries/records/useRecordDetailQuery';
import Header from '@/components/common/Header';
import withSuspense from '@/components/HOC/withSuspense';
import RecordModifyForm from '@/components/maps/RecordModifyForm';
import { RecordFormProvider } from '@/hooks/useRecordFormState';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { StackRouteProps } from '@/types/navigation';

export default withSuspense(function ModifyLog() {
  const route = useRoute<StackRouteProps<'Maps/ModifyRecord'>>();
  const { recordDetail } = useRecordDetailQuery({
    recordId: route.params.recordId,
  });

  return (
    <BackGroundGradient>
      <Header title="로그 수정" />
      <RecordFormProvider defaultProps={recordDetail}>
        <RecordModifyForm />
      </RecordFormProvider>
    </BackGroundGradient>
  );
});
