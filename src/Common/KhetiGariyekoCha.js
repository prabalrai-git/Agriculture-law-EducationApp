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
    padding: 3,
    borderRadius: 10,
    width: 90,
    marginTop: 3,
  },
  isCultivatedFalse: {
    backgroundColor: '#fca120',
    padding: 3,
    borderRadius: 10,
    width: 90,
    marginTop: 3,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
