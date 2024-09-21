import useRecordFormState from '@/hooks/useRecordFormState';
import DateSelect from '../common/DateSelect';

export default function RecordFormDatePickers() {
  const { date, setDate } = useRecordFormState();

  return <DateSelect date={date} setDate={setDate} />;
}
