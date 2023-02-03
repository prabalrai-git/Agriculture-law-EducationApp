import {View, Text} from 'react-native';
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({
  setDatePickerVisibilityStart,
  setDatePickerVisibilityEnd,
  setDatePickerVisibility,
  setDatePickerVisibilitySoil,
  setDOB,
  setEndDate,
  setStartDate,
  setEditingProduct,
  editingProduct,
  setTestDate,
  setEntryDate,
  setDateVisibilityBikri,
  setEntryDateKharcha,
  setDateVisibilityKharcha,
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
      // console.log('This also ran');
    }
    if (setStartDate) {
      setStartDate(date);
      setDatePickerVisibilityStart(false);
    }
    if (setEditingProduct && editingProduct) {
      // console.log(date, 'running');
      setEditingProduct(prev => ({...prev, ProdEndDate: date}));
      setDatePickerVisibilityEnd(false);
    }
    if (setTestDate) {
      setDatePickerVisibilitySoil(false);
      setTestDate(date);
    }
    if (setEntryDate) {
      setDateVisibilityBikri(false);
      setEntryDate(date);
    }
    if (setEntryDateKharcha) {
      setEntryDateKharcha(date);
      setDateVisibilityKharcha(false);
    }
  };

  return (
    <View>
      <DateTimePicker mode="date" value={new Date()} onChange={onDateChange} />
    </View>
  );
};

export default DatePicker;
