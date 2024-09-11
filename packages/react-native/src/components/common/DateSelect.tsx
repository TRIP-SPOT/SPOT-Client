import { Font } from 'design-system';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

export interface DateSelectProps {
  date: {
    start: Date;
    end: Date;
  };
  setDate: React.Dispatch<
    React.SetStateAction<{
      start: Date;
      end: Date;
    }>
  >;
  selectionMode?: 'start' | 'end';
  setSelectionMode: React.Dispatch<
    React.SetStateAction<'start' | 'end' | undefined>
  >;
}

const getDisplayDate = (displayDate: Date) => {
  return `${displayDate.getFullYear()}-${displayDate.getMonth() + 1}-${displayDate.getDate()}`;
};

export default function DateSelect({
  date,
  selectionMode,
  setDate,
  setSelectionMode,
}: DateSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <View className="justify-between flex-row flex-1 pr-20">
        <View>
          <Font color="white" type="ui-text">
            From
          </Font>
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
              setSelectionMode('start');
            }}
          >
            <Font color="white" type="body1">
              {getDisplayDate(date.start)}
            </Font>
          </TouchableOpacity>
        </View>
        <View>
          <Font color="white" type="ui-text">
            To
          </Font>
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
              setSelectionMode('end');
            }}
          >
            <Font color="white" type="body1">
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
