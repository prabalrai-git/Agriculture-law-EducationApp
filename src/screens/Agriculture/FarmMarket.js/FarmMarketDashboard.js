import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const FarmMarketDashboard = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}>
      <TouchableOpacity
        style={styles.eachMenu}
        onPress={() => navigation.navigate('TopNavigationKrishiBazzar')}>
        <View>
          <Image
            source={require('../../../Assets/FarmImages/market.png')}
            resizeMode="contain"
            style={[
              {width: 44, height: 44, tintColor: 'green', fontWeight: 'bold'},
            ]}
          />
          <Text style={styles.txt}>बजार</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.eachMenu}
        onPress={() =>
          navigation.navigate('TopNavigationKrishiBazzarMag', {
            bajartype: 'mag',
          })
        }>
        <View>
          <Image
            source={require('../../../Assets/FarmImages/mag.png')}
            resizeMode="contain"
            style={[
              {width: 44, height: 44, tintColor: 'green', fontWeight: 'bold'},
            ]}
          />
          <Text style={styles.txt}>माग</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FarmMarketDashboard;

const styles = StyleSheet.create({
  txt: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 5,
  },
  eachMenu: {
    backgroundColor: '#d4d4d4',
    marginHorizontal: 20,
    padding: 18,
    paddingHorizontal: 35,
    borderRadius: 8,
    elevation: 8,
    marginTop: 100,
  },
});
