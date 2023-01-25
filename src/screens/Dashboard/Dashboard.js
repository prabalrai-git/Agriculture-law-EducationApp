import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChangeLanguage from '../../components/ChangeLanguage';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReanimatedCarousel from '../../components/ReanimatedCarousel';
import '../../../global';
import DataCards from '../../Common/DataCards';
import {useRoute} from '@react-navigation/native';

const width = Dimensions.get('window').width;

const Dashboard = ({navigation}) => {
  const [routeName, setRouteName] = useState();

  const route = useRoute();
  // setTimeout(() => {
  //     navigation.reset({
  //         index: 1,
  //         routes: [{ name: 'Dashboard' }],
  //     });
  // }, );

  useEffect(() => {
    setRouteName(route.name);

    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      // navigation.pop(1);
      if (routeName === 'Dashboard') {
        const backAction = () => {
          console.log(route.name, 'helloe');
          Alert.alert('', 'एपबाट बाहिर निस्कन चाहनुहुन्छ?', [
            {
              text: 'चाहन्न',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'चाहन्छु', onPress: () => BackHandler.exitApp()},
          ]);
          return true;
        };
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
        return () => backHandler.remove();
      }
      // clear setInterval here and go back
      console.log('preventing');
    });
  }, []);

  const ServicesData = [
    {
      id: 1,
      image: require('../../Assets/Images/tractor.png'),
      title: 'कृषि',
      navigationPath: 'Agriculture',
    },
    {
      id: 2,
      image: require('../../Assets/Images/reading.png'),
      title: 'शिक्षा',
      navigationPath: 'Education',
    },
    {
      id: 3,
      image: require('../../Assets/Images/compliant.png'),
      title: 'कानुन',
      navigationPath: 'Law',
    },
    // {
    //   id: 4,
    //   image: require('../../Assets/FarmImages/Soil.png'),
    //   title: 'माटो परीक्षण',
    //   navigationPath: 'Dashboard',
    // },
    // {
    //   id: 5,
    //   image: require('../../Assets/FarmImages/JTA.png'),
    //   title: 'JTA संचार',
    //   navigationPath: 'Dashboard',
    // },
    // {
    //   id: 6,
    //   image: require('../../Assets/FarmImages/Expenses.png'),
    //   title: 'खर्च ट्र्याकिङ',
    //   navigationPath: 'Dashboard',
    // },
  ];

  return (
    <View>
      <StatusBar backgroundColor={'darkgreen'} />
      {/* Start of header */}
      <View style={styles.topbar}>
        <View style={{flexDirection: 'row', marginLeft: -30}}>
          <Image
            source={require('../../Assets/Images/logo1.png')}
            style={{
              resizeMode: 'contain',
              width: 35,
              height: 35,
              alignSelf: 'center',
              marginRight: 5,
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: 'white',
              alignSelf: 'center',
            }}>
            LUNIVA TECH
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: width * 0.22,
            justifyContent: 'space-around',
            right: -30,
          }}>
          <TouchableOpacity>
            <Avatar.Image
              size={25}
              source={require('../../Assets/Images/avatar.png')}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Image
              source={require('../../Assets/Images/notification.png')}
              resizeMode="contain"
              style={[
                {width: 22, height: 22, tintColor: 'white', fontWeight: 'bold'},
                styles.notification,
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View style={{marginBottom: 150}}>
          <ReanimatedCarousel />
          <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <DataCards />
            <View style={styles.services}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: '500',
                  marginLeft: 15,
                }}>
                हाम्रा सेवाहरू
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                  width: width * 0.95,
                }}>
                {ServicesData.map(item => {
                  return (
                    <TouchableOpacity
                      style={styles.serviceContainer}
                      key={item.id}
                      onPress={() => navigation.navigate(item.navigationPath)}>
                      <View>
                        <View style={styles.serviceImage}>
                          <Image
                            source={item.image}
                            resizeMode="contain"
                            style={[
                              {
                                width: 45,
                                height: 45,
                                tintColor: global.SecondaryColor,
                                fontWeight: 'bold',
                              },
                            ]}
                          />
                        </View>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 16,
                            marginTop: 10,
                            textAlign: 'center',
                          }}>
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
          {/* <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={styles.services}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: '500',
                  marginLeft: 15,
                }}>
                हाम्रा सेवाहरू
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                {ServicesData.map(item => {
                  return (
                    <TouchableOpacity
                      style={styles.serviceContainer}
                      key={item.id}
                      onPress={() => navigation.navigate(item.navigationPath)}>
                      <View>
                        <View style={styles.serviceImage}>
                          <Image
                            source={item.image}
                            resizeMode="contain"
                            style={[
                              {
                                width: 45,
                                height: 45,
                                tintColor: global.SecondaryColor,
                                fontWeight: 'bold',
                              },
                            ]}
                          />
                        </View>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 16,
                            marginTop: 10,
                            textAlign: 'center',
                          }}>
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View> */}
        </View>
      </ScrollView>
      {/* End of Body */}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  topbar: {
    backgroundColor: global.SecondaryColor,
    height: 50,
    justifyContent: 'space-around',
    flexDirection: 'row',
    elevation: 2,
    alignItems: 'center',
    // borderBottomEndRadius: 10,
    // borderBottomLeftRadius: 10
  },
  avatar: {
    margin: 12,
    elevation: 2,
  },

  notification: {
    marginTop: 14,
  },
  services: {
    width: width * 0.95,
    flexWrap: 'wrap',
    padding: 6,
    backgroundColor: 'white',
    borderRadius: 6,
    marginTop: 20,
    elevation: 2,
  },
  serviceContainer: {
    width: width * 0.23,
    margin: 15,
    // backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    // paddingRight: 25,
    // paddingLeft: 25
  },
  serviceImage: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 10,
  },
});
