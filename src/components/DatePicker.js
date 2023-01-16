import {View, Text} from 'react-native';
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({setDatePickerVisibility, setDOB}) => {
  const onDateChange = (e, date) => {
    console.log(date);
    setDOB(date);
    setDatePickerVisibility(false);
  };

  return (
    <View>
      <DateTimePicker mode="date" value={new Date()} onChange={onDateChange} />
    </View>
  );
};

export default DatePicker;
