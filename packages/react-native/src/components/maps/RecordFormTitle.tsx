import { View } from 'react-native';
import { Font, TextField } from 'design-system';
import useRecordFormState from '@/hooks/useRecordFormState';

const MAX_TITLE_LENGTH = 20;

export default function RecordFormTitle() {
  const { title, handleTitleChange } = useRecordFormState();
  return (
    <View>
      <Font type="body2" color="white">
        여행 제목
      </Font>
      <View className="mt-2">
        <TextField
          value={title}
          onChange={handleTitleChange}
          placeholder="제목"
          maxLength={255}
        />
        <View className="w-full justify-center items-end mt-2.5">
          <Font
            type="ui-text"
            color="white"
          >{`${title.length}/${MAX_TITLE_LENGTH}`}</Font>
        </View>
      </View>
    </View>
  );
}
