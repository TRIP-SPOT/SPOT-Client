import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Font } from 'design-system';
import useRecordFormState from '@/hooks/useRecordFormState';

const getDisplayDate = (displayDate: Date) => {
  return `${displayDate.getFullYear()}-${displayDate.getMonth() + 1}-${displayDate.getDate()}`;
};

export default function RecordFormDatePickers() {
  const { date, setDate, selectionMode, setSelectionMode } =
    useRecordFormState();
  const [open, setOpen] = useState(false);
  return (
    <>
      <View className="justify-evenly flex-row flex-1">
        <View>
          <Font color="black" type="ui-text">
            From
          </Font>
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
              setSelectionMode('start');
            }}
          >
            <Font color="black" type="body1">
              {getDisplayDate(date.start)}
            </Font>
          </TouchableOpacity>
        </View>
        <View>
          <Font color="black" type="ui-text">
            To
          </Font>
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
              setSelectionMode('end');
            }}
          >
            <Font color="black" type="body1">
              {getDisplayDate(date.end)}
            </Font>
          </TouchableOpacity>
        </View>
      </View>
      {selectionMode && (
        <DatePicker
          modal
          open={open}
          date={date[selectionMode]}
          mode="date"
          onConfirm={(selectedDate) => {
            setOpen(false);
            setDate((prev) => ({
              ...prev,
              [selectionMode]: selectedDate,
            }));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
