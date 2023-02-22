import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {GetBajarItemByUserIdApi} from '../../../Services/appServices/agricultureService';
import {width} from '../../../Common/WidthAndHeight';

const OwnItems = ({navigation}) => {
  const [myItems, setMyItems] = useState();
  const [userCode, setUserCode] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userCode');
      if (value !== null) {
        // value previously stored
        // console.log(value, 'this is the value form async storage');
        setUserCode(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    const data = {
      userId: userCode,
    };

    GetBajarItemByUserIdApi(data, res => {
      setMyItems(res);
    });
  });

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text style={{color: 'black', fontSize: 18, margin: 10}}>
        उत्पादनहरु:
      </Text>
      <ScrollView>
        <View style={{marginBottom: 40, flexWrap: 'wrap'}}>
          {myItems?.map(item => {
            // console.log(item);
            return (
              <TouchableOpacity
                style={styles.eachItem}
                key={item.KId}
                onPress={() =>
                  navigation.navigate('ItemFullDescription', {
                    krishiSaleId: item.KId,
                  })
                }>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{
                      uri:
                        'https://lunivacare.ddns.net/Luniva360Agri' +
                        item.ImageFilePath,
                    }}
                  />
                </View>
                <View style={{marginLeft: 10, marginTop: 4}}>
                  <Text style={styles.title}>{item.ItemName}</Text>
                  <Text style={styles.description}>
                    {item.ItemDescription.length > 40
                      ? item.ItemDescription.slice(0, 40) + '...'
                      : item.ItemDescription}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: width * 0.4,
                      marginTop: 0,
                    }}>
                    <Text style={styles.Price}>रु.{item.Price}</Text>
                  </View>
                  <Text style={styles.Quantity}>मात्रा: {item.Quantity}</Text>
                </View>
                <View>
                  <TouchableOpacity style={{padding: 15, height: 60}}>
                    <Image
                      source={require('../../../Assets/FarmImages/writing.png')}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: 'green',
                        // margin: 10,
                        marginLeft: -30,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default OwnItems;

const styles = StyleSheet.create({
  itemNumberTxt: {
    color: 'white',
    fontSize: 14,
    margin: 10,
    alignSelf: 'center',
    backgroundColor: '#01a16c',
    fontWeight: '600',
    padding: 10,
    paddingHorizontal: 11,
    borderRadius: 5,
  },
  itemMainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 100,
  },
  mainContainerEmpty: {
    alignItems: 'center',
  },
  eachItem: {
    width: width * 0.96,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    // alignItems: 'center',
    // elevation: 3,
    borderRadius: 8,
    // paddingHorizontal: 30,
    // paddingVertical: 10,
    // paddingLeft: 8,
    paddingTop: 0,
    margin: 6,
  },
  image: {
    width: width * 0.466,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    height: width * 0.3,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
    marginBottom: 3,
  },
  description: {
    fontSize: 12,
    color: 'grey',
    textAlign: 'left',
    marginRight: 8,
    width: width * 0.3,
  },
  Price: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    left: 0,
  },
  // imageContainer: {
  //   width: width * 0.466,
  //   backgroundColor: 'lightgrey',

  //   paddingTop: 30,
  //   paddingBottom: 10,
  //   borderTopStartRadius: 8,
  //   borderTopEndRadius: 8,
  // },
  Quantity: {
    marginTop: 6,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    width: width * 0.25,
    backgroundColor: '#01a16c',
    paddingHorizontal: 5,
    borderRadius: 6,
  },
});
