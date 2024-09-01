import { View } from 'react-native';
import { Font, TextField } from 'design-system';
import useRecordFormState from '@/hooks/useRecordFormState';

export default function RecordFormDescription() {
  const { description, handleDescriptionChange } = useRecordFormState();

  return (
    <View>
      <Font type="body2" color="white">
        짧은 기록
      </Font>
      <View className="mt-2">
        <TextField
          multiline
          numberOfLines={3}
          value={description}
          onChange={handleDescriptionChange}
          placeholder="내용을 작성해주세요."
        />
      </View>
    </View>
  );
}
