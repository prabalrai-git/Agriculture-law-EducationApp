import {View, Text} from 'react-native';
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({
  setDatePickerVisibilityStart,
  setDatePickerVisibilityEnd,
  setDatePickerVisibility,
  setDOB,
  setEndDate,
  setStartDate,
}) => {
  const onDateChange = (e, date) => {
    // console.log(date);
    if (setDOB) {
      setDOB(date);
      setDatePickerVisibility(false);
    }
    if (setEndDate) {
      setEndDate(date);
      setDatePickerVisibilityEnd(false);
    }
    if (setStartDate) {
      setStartDate(date);
      setDatePickerVisibilityStart(false);
    }
  };

  return (
    <View>
      <DateTimePicker mode="date" value={new Date()} onChange={onDateChange} />
    </View>
  );
};

export default DatePicker;
