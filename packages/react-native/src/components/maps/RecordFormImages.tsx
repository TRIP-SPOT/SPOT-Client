import useRecordFormState from '@/hooks/useRecordFormState';
import ImageSelect from '../common/ImageSelect';

interface RecordFormImagesProps {
  handlePressAddPhoto: () => Promise<unknown>;
}

export default function RecordFormImages({
  handlePressAddPhoto,
}: RecordFormImagesProps) {
  const { images } = useRecordFormState();
  return (
    <ImageSelect image={images} handlePressAddPhoto={handlePressAddPhoto} />
  );
}
