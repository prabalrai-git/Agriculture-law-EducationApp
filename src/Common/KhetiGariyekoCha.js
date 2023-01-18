import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const KhetiGariyekoCha = ({isCultivated}) => {
  return isCultivated ? (
    <View style={styles.isCultivatedTrue}>
      <Text style={styles.text}>खेती गरिएको</Text>
    </View>
  ) : (
    <View style={styles.isCultivatedFalse}>
      <Text style={styles.text}>खेती गरेको छैन</Text>
    </View>
  );
};

export default KhetiGariyekoCha;

const styles = StyleSheet.create({
  isCultivatedTrue: {
    backgroundColor: 'green',
    padding: 6,
    borderRadius: 20,
    width: 110,
    marginTop: 3,
  },
  isCultivatedFalse: {
    backgroundColor: '#fca120',
    padding: 6,
    borderRadius: 20,
    width: 110,
    marginTop: 3,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
