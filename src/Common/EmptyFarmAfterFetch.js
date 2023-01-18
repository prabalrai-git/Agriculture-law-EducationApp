import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const EmptyFarmAfterFetch = () => {
  return (
    <View style={{marginTop: 100}}>
      <Image
        source={require('../Assets/FarmImages/box.png')}
        style={styles.image}
      />
      <Text style={styles.txt}>
        फार्महरू छैनन् !{'\n'} कृपया नयाँ फार्महरू दर्ता गर्नुहोस् !!
      </Text>
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
