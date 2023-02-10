import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {GetSalesDetailsofActiveProductionByUserApi} from '../../../../Services/appServices/agricultureService';

const width = Dimensions.get('window').width;

const BikriList = ({userCode, reload}) => {
  const [bikriList, setBikriList] = useState();

  useEffect(() => {
    const data = {
      userId: userCode,
    };

    GetSalesDetailsofActiveProductionByUserApi(data, res => {
      // console.log(res, 'this is res');
      if (res.length > 0) {
        setBikriList(res);
      }
    });
  }, [userCode, reload]);

  return (
    <View style={styles.mainContainer}>
      {bikriList?.map(item => {
        return (
          <View
            style={styles.eachContainer}
            key={Math.floor(Math.random() * 100000)}>
            <View>
              <View
                style={[
                  styles.lineContainer,
                  {
                    backgroundColor: 'green',
                    padding: 2,

                    borderRadius: 5,
                    // width: 120,
                  },
                ]}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  खरिदकर्ता: {item.VendorName}
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
                  <Text style={styles.eachLineInside}>{item.Quantity}</Text>
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
                  दर: <Text style={styles.eachLineInside}>{item.Rate}</Text>
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
                  कुल बिक्री:{' '}
                  <Text style={styles.eachLineInside}>{item.TotalAmount}</Text>
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
                  प्रवेश मिति:
                  <Text style={styles.eachLineInside}>
                    {item.SalesDate.split('T')[0]}
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

export default BikriList;

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
