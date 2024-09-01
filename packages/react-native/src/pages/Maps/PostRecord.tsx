import Header from '@/components/common/Header';
import BackGroundGradient from '@/layouts/BackGroundGradient';
import { RecordFormProvider } from '@/hooks/useRecordFormState';
import RecordPostForm from '@/components/maps/RecordPostForm';

export default function PostRecord() {
  return (
    <BackGroundGradient>
      <Header title="로그 등록" />
      <RecordFormProvider>
        <RecordPostForm />
      </RecordFormProvider>
    </BackGroundGradient>
  );
}
