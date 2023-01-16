import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  React.useEffect(() => {
    removeValue = async () => {
      try {
        await AsyncStorage.removeItem('userCode');
      } catch (e) {
        // remove error
      }

      console.log('Done.');
    };
    // removeValue();
    getData();
  }, []);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userCode');
      if (value !== null) {
        // value previously stored
        setTimeout(
          () => navigation.navigate('BottomNavigation', {screen: 'Dashboard'}),
          3000,
        );
      } else {
        setTimeout(() => navigation.navigate('Login'), 3000);
      }
    } catch (e) {
      // error reading value
      console.log('this is error from sync');
    }
  };

  return (
    <>
      <StatusBar backgroundColor={'white'} />
      <View style={styles.container}>
        {/* <Image source={require('../../Assets/Images/logo1.png')} resizeMode="cover" styles={styles.logo} /> */}
        <Text style={{color: 'black', fontSize: 25, textAlign: 'center'}}>
          Powered By{`\n`}Luniva Technology
        </Text>
      </View>
    </>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: 30,
    width: 30,
  },
});
