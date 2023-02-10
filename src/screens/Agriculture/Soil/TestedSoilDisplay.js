import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';

const width = Dimensions.get('window').width;

const TestedSoilDisplay = props => {
  const {FarmName, soilTestLists} = props;

  const onDeletePressed = () => {
    const data = {
      FdId: 0,
      FarmId: FarmId,
      SoilPhValue: ph,
      SoilNitrogen: nitrogen,
      SoilPhosphorous: phosphorous,
      SoilPotassium: potassium,
      SoilMoisture: moisture,
      SoilMinerals: minerals,
      SoilMisProperty: miscProperties,
      TestDate: testDate?.toDateString(),
      SUserId: userCode,
      Istested: true,
      SqId: 13,
      IsDeleted: true,
    };
    // console.log(data);
    InsertUpdateSoilValuesByUserIdApi(data, res => {
      if (res.SuccessMsg) {
        clearAllStates();
        setModalVisible(false);
      }
    });
  };

  return (
    <ScrollView>
      <View style={{flexDirection: 'column', marginBottom: 40}}>
        {soilTestLists &&
          soilTestLists.map(item => {
            return (
              <View
                style={{
                  backgroundColor: '#d4d4d4',
                  width: width * 0.95,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderRadius: 6,
                  padding: 10,
                  paddingTop: 5,
                  paddingBottom: 20,
                  marginBottom: 10,
                }}
                key={item.FdId}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: width * 0.8,
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}>
                    <View
                      style={{
                        width: width * 0.7,
                        flexDirection: 'row',
                        //   justifyContent: 'space-around',
                        //   marginLeft: -20,
                      }}>
                      <View style={{flexDirection: 'column'}}>
                        {/* <View style={styles.eachContainer}>
                        <Text
                          style={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: 14,
                          }}>
                          खेतको नाम:{' '}
                          <Text style={{fontWeight: '500', fontSize: 14}}>
                            {FarmName}
                          </Text>
                        </Text>
                      </View> */}
                        <View style={styles.eachContainer}>
                          <Text
                            style={{
                              color: 'black',
                              fontWeight: 'bold',
                              fontSize: 14,
                            }}>
                            पि.एच:{' '}
                            <Text style={{fontWeight: '500', fontSize: 14}}>
                              {item.SoilPhValue}
                            </Text>
                          </Text>
                        </View>
                        <View
                          style={[
                            {
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              // marginLeft: -20,
                            },
                            styles.eachContainer,
                          ]}>
                          {/* <Image
                    source={require('../../..//Assets/FarmImages/moisturizing.png')}
                    style={[styles.infoImage, {marginRight: 5}]}
                  /> */}

                          <Text
                            style={{
                              color: 'black',
                              fontWeight: 'bold',
                              fontSize: 14,
                            }}>
                            चिस्यान:{' '}
                            <Text style={{fontWeight: '500', fontSize: 14}}>
                              {item.SoilMoisture}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        //   justifyContent: 'space-around',
                        //   marginTop: 15,

                        //   marginLeft: -10,
                        //   width: width * 0.67,
                        //   marginLeft: 'auto',
                        //   marginRigth: 'auto',
                      }}>
                      <View
                        style={[{flexDirection: 'row'}, styles.eachContainer]}>
                        {/* <Image
                  style={styles.infoImage}
                  source={require('../../../Assets/FarmImages/calendar1.png')}
                /> */}
                        <Text
                          style={[
                            styles.txt,
                            {color: 'black', fontSize: 14, fontWeight: 'bold'},
                          ]}>
                          परीक्षण मिति:{' '}
                          <Text style={{fontWeight: '500', fontSize: 14}}>
                            {item.TestDate.split('T')[0]}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        {
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          //   marginTop: 15,
                          //   marginLeft: -10,
                          width: '100%',
                        },
                        styles.eachContainer,
                      ]}>
                      <View
                        style={[
                          styles.infoCard,
                          {backgroundColor: '#fa5b3d', alignSelf: 'center'},
                        ]}>
                        <Text style={styles.txt}>
                          नाइट्रोजन:{item.SoilNitrogen}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.infoCard,
                          {backgroundColor: 'skyblue', alignSelf: 'center'},
                        ]}>
                        <Text style={styles.txt}>
                          फस्फोरस:{item.SoilPhosphorous}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.infoCard,
                          {backgroundColor: '#584a82', alignSelf: 'center'},
                        ]}>
                        <Text style={styles.txt}>
                          पोटासियम:{item.SoilPotassium}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.actionIconContainer}>
                    {/* <TouchableOpacity
              style={{height: 40}}
              onPress={() => {
                console.log('hello wolrd');
              }}>
              <Image
                source={require('../../../Assets/FarmImages/writing.png')}
                style={{width: 28, height: 28, tintColor: 'green'}}
              />
            </TouchableOpacity> */}
                    <TouchableOpacity
                      style={{height: 40}}
                      onPress={() => {
                        console.log('hello world');
                      }}>
                      <Image
                        source={require('../../../Assets/FarmImages/garbage.png')}
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
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default TestedSoilDisplay;

const styles = StyleSheet.create({
  actionIconContainer: {
    flexDirection: 'row',
  },
  infoImage: {
    width: 20,
    height: 20,
    tintColor: 'green',
  },
  infoCard: {
    width: width * 0.25,
    borderRadius: 10,
    backgroundColor: 'green',
    padding: 5,
  },
  txt: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  eachContainer: {
    marginTop: 10,
  },
});
