import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const EmptyFarmAfterFetch = ({message}) => {
  // console.log(message, 'yo');
  return (
    <View style={{marginTop: 100, alignSelf: 'center'}}>
      <Image
        source={require('../Assets/FarmImages/box.png')}
        style={styles.image}
      />
      <Text style={styles.txt}>{message}</Text>
    </View>
  );
};

export default EmptyFarmAfterFetch;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    tintColor: 'green',
    alignSelf: 'center',
  },
  txt: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    margin: 10,
  },
});
