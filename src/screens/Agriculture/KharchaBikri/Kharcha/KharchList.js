import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {GetBaaliKharchaDetailsByUserBaaliIdApi} from '../../../../Services/appServices/agricultureService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {numberWithCommas} from '../../../../Helpers/NumberToMoney';

const width = Dimensions.get('window').width;

const KharchList = ({ProdCropID, baaliId, reload}) => {
  // console.log(ProdCropID, baaliId, 'hello mfmfmfmfmfmfmfmfm');

  const [kharchaList, setKharchaList] = useState();
  const [userCode, setUserCode] = useState();

  useEffect(() => {
    getData();

    const data = {
      userId: userCode,
      prodId: ProdCropID,
      baaliId: baaliId,
    };
    GetBaaliKharchaDetailsByUserBaaliIdApi(data, res => {
      setKharchaList(res);
    });
  }, [userCode, reload]);

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

  return (
    <View style={styles.mainContainer}>
      {kharchaList?.map(item => {
        return (
          <View style={styles.eachContainer} key={item.KharchaDate}>
            <View>
              <View
                style={[
                  styles.lineContainer,
                  {
                    backgroundColor: '#E14C38',
                    padding: 3,
                    // width: 170,
                    borderRadius: 5,
                  },
                ]}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 14, color: 'white'}}>
                  खर्च शीर्षक: {item.KharchaHead}
                </Text>
              </View>
              <View style={styles.lineContainer}>
                <Image
                  source={require('../../../../Assets/FarmImages/count.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: 'green',
                    marginRight: 5,
                  }}
                />
                <Text style={styles.eachLine}>
                  संख्या:{' '}
                  <Text style={styles.eachLineInside}>
                    {item.ResourceAmount}
                  </Text>
                </Text>
              </View>
              <View style={styles.lineContainer}>
                <Image
                  source={require('../../../../Assets/FarmImages/rate.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: 'green',
                    marginRight: 5,
                  }}
                />
                <Text style={styles.eachLine}>
                  दर:{' '}
                  <Text style={styles.eachLineInside}>
                    Rs. {numberWithCommas(item.ResourceRate)}
                  </Text>
                </Text>
              </View>
              <View style={styles.lineContainer}>
                <Image
                  source={require('../../../../Assets/FarmImages/totalAmount.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: 'green',
                    marginRight: 5,
                  }}
                />
                <Text style={styles.eachLine}>
                  कुल खर्च:{' '}
                  <Text style={styles.eachLineInside}>
                    Rs. {numberWithCommas(item.TotalCost)}
                  </Text>
                </Text>
              </View>
              <View style={styles.lineContainer}>
                <Image
                  source={require('../../../../Assets/FarmImages/calendar.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: 'green',
                    marginRight: 5,
                  }}
                />
                <Text style={styles.eachLine}>
                  प्रवेश मिति:{' '}
                  <Text style={styles.eachLineInside}>
                    {item.KharchaNepaliDate}
                  </Text>
                </Text>
              </View>
            </View>

            <View style={styles.actionIconContainer}>
              <TouchableOpacity
                style={{height: 40}}
                onPress={() => {
                  // setEditingFarmId(item.frmID);
                }}>
                <Image
                  source={require('../../../../Assets/FarmImages/writing.png')}
                  style={{width: 28, height: 28, tintColor: 'green'}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{height: 40}} onPress={() => {}}>
                <Image
                  source={require('../../../../Assets/FarmImages/garbage.png')}
                  style={{
                    width: 28,
                    height: 28,
                    tintColor: 'red',
                    marginLeft: 15,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default KharchList;

const styles = StyleSheet.create({
  mainContainer: {
    width: width * 0.95,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'column',
    marginBottom: 100,
  },
  eachContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.95,
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: 10,
    backgroundColor: '#d4d4d4',
    borderRadius: 5,
    padding: 10,
  },
  eachLine: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black',
  },
  eachLineInside: {
    fontWeight: '500',
    fontSize: 12,
    color: 'black',
  },
  lineContainer: {
    marginTop: 6,
    flexDirection: 'row',
  },
  actionIconContainer: {
    flexDirection: 'row',
  },
});
