import {View, Text} from 'react-native';
import React from 'react';
import Calendar from 'react-native-nepali-date-picker';

const NepaliDatePicker = () => {
  // const returnData = {
  //     setDate
  // }

  return (
    <Calendar
      // defaultDateTimeValue
      value={new Date()} // default value
      visibility={true} // set the visibilty of the component
      onSelect={v => console.log(v)} // on each select by the user to a certain date
      onCancel={v => console.log(v)} // on press cancel thought not required
      //as user can handle is still can be useful as it gives you back the value you pass to it
      onChange={v => console.log(v)} // on press ok
    />
  );
};

export default NepaliDatePicker;
