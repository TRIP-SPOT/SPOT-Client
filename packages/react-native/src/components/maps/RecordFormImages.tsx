import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Font } from 'design-system';
import PlusIcon from '@/assets/PlusIcon';
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
