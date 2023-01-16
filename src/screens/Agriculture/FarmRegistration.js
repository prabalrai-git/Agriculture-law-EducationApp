import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FAB, RadioButton, SegmentedButtons, Switch} from 'react-native-paper';
import CreateProfile from '../Login/CreateProfile';
import {ScrollView} from 'react-native-gesture-handler';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Geolocation from 'react-native-geolocation-service';
import {
  GetFarmListByUserCodeApi,
  InsertUpdateFarmApi,
} from '../../Services/appServices/agricultureService';
import {currentDateTime} from '../../Common/CurrentDateTime';
import {set} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const FarmRegistration = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isCultivated, setIsCultivated] = useState(true);
  const [text, onChangeText] = useState();
  const [checked, setChecked] = useState(true);
  const [locationDetails, setLocationDetails] = useState();

  // form data states

  const [fieldName, setFieldName] = useState();
  const [area, setArea] = useState();
  const [areaType, setAreaType] = useState();
  const [kittaNumber, setKittaNumber] = useState();
  const [place, setPlace] = useState();
  const [fieldOwner, setFieldOwner] = useState();

  // end of form data states

  const [userCode, setUserCode] = React.useState(null);
  const [farmList, setFarmList] = useState();
  const [reload, setReload] = useState(true);

  const [errors, setErrors] = useState({});
  const [editingFarmId, setEditingFarmId] = useState();
  const [editingFarm, setEditingFarm] = useState();

  useEffect(() => {
    getData();
  }, []);
  const handleValidation = (errorText, inputFieldName) => {
    setErrors(preState => ({...preState, [inputFieldName]: errorText}));
  };

  const validate = () => {
    let isValid = true;
    if (!fieldName) {
      handleValidation('खेतको नाम राख्नुहोस्', 'fieldName');
      isValid = false;
    }
    if (!area) {
      handleValidation('क्षेत्रफल राख्नुहोस्', 'area');
      isValid = false;
    }
    if (!areaType) {
      handleValidation('क्षेत्र एकाइ छान्नुहोस्', 'areaType');
      isValid = false;
    }
    if (!kittaNumber) {
      handleValidation('क्षेत्रफल राख्नुहोस्', 'kittaNumber');
      isValid = false;
    }
    if (!place) {
      handleValidation('क्षेत्रफल राख्नुहोस्', 'place');
      isValid = false;
    }
    if (!fieldOwner) {
      handleValidation('क्षेत्रफल राख्नुहोस्', 'fieldOwner');
      isValid = false;
    }

    if (!locationDetails) {
      handleValidation('स्थान विवरण प्राप्त गर्नुहोस्', 'locationDetails');
      isValid = false;
    }
    return isValid;
  };

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

  const data = [1, 1, 1];

  const AreaType = [
    {id: 1, title: 'कठ्ठा'},
    {id: 2, title: 'धुर'},
    {id: 3, title: 'रोपनी'},
    {id: 4, title: 'आना'},
  ];

  const onToggleCultivationSwitch = () => {
    setIsCultivated(!isCultivated);
  };

  const onLocationClick = async () => {
    setLocationDetails();
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocationDetails(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = () => {
    let validation = validate();

    let formData = {
      frmId: editingFarmId ? editingFarmId : 0,
      frmEstArea: area,
      frmLocation: place,
      frmLat: locationDetails?.coords.latitude,
      FrmLong: locationDetails?.coords.longitude,
      frmUserId: userCode,
      frmAddedDate: new Date(),
      frmName: fieldName,
      SqId: 9,
      frmAreaUnit: areaType?.title,
      IsDeleted: false,
      KittaNumber: kittaNumber,
      LandOwner: fieldOwner,
      IsCultivated: isCultivated,
    };
    // console.log('This is the data', formData);

    if (validation) {
      try {
        InsertUpdateFarmApi(formData, res => {
          if (res) {
            setModalVisible(false);
            setFieldName();
            setArea();
            setAreaType();
            setKittaNumber();
            setPlace();
            setFieldOwner();
            setLocationDetails();
            setReload(!reload);
            setErrors({});
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    let data = {
      userCode: userCode,
    };

    GetFarmListByUserCodeApi(data, res => {
      setFarmList(res);
    });
  }, [userCode, reload]);

  return (
    <>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        label="नयाँ दर्ता गर्नुहोस्"
        color="white"
      />
      <Text style={{color: 'black', margin: 10, fontSize: 18}}>
        दर्ता भएका फार्महरू
      </Text>
      <ScrollView>
        {farmList?.map(item => {
          return (
            <View style={styles.farmContainer} key={item.frmID}>
              <View style={styles.farmInfo}>
                <Text style={styles.farmName}>{item.frmName}</Text>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Image
                    source={require('../../Assets/FarmImages/land.png')}
                    style={styles.infoImage}
                  />
                  <Text
                    style={{
                      color: 'black',
                      alignSelf: 'center',
                      fontSize: 16,
                      marginLeft: 8,
                    }}>
                    {item.frmEstArea} {item.frmAreaUnit}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Image
                    source={require('../../Assets/FarmImages/location.png')}
                    style={styles.infoImage}
                  />
                  <Text
                    style={{
                      color: 'black',
                      alignSelf: 'center',
                      fontSize: 16,
                      marginLeft: 8,
                    }}>
                    {item.frmLocation}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Image
                    source={require('../../Assets/FarmImages/calendar.png')}
                    style={styles.infoImage}
                  />
                  <Text
                    style={{
                      color: 'black',
                      alignSelf: 'center',
                      fontSize: 16,
                      marginLeft: 8,
                    }}>
                    {item.frmAddedDate}
                  </Text>
                </View>
              </View>
              <View style={styles.actionIconContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setEditingFarmId(item.frmID);
                    setModalVisible(true);
                  }}>
                  <Image
                    source={require('../../Assets/FarmImages/writing.png')}
                    style={{width: 28, height: 28, tintColor: 'green'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={e => console.log(e)}>
                  <Image
                    source={require('../../Assets/FarmImages/garbage.png')}
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
      </ScrollView>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}}>
            <View style={styles.centeredView}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.8,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '500',
                    marginTop: 10,
                  }}>
                  {editingFarmId ? 'खेत सम्पादन' : 'खेत थप्नुहोस्:'}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Image
                    source={require('../../Assets/FarmImages/close.png')}
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: 'red',
                      margin: 6,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View
                  style={{
                    width: width * 0.8,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 10,
                  }}>
                  <Text style={styles.label}>खेतको नाम:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {borderColor: errors.fieldName ? 'red' : 'black'},
                    ]}
                    onChangeText={text => setFieldName(text)}
                    value={editingFarmId ? 'prabal farm' : fieldName}
                    placeholder="खेतको नाम राख्नुहोस्"
                    placeholderTextColor={errors.fieldName ? 'red' : 'grey'}
                  />
                  <View style={{flexDirection: 'row', width: width * 0.78}}>
                    <View
                      style={{flexDirection: 'column', width: width * 0.39}}>
                      <Text style={styles.label}>क्षेत्रफल:</Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            width: width * 0.36,
                            borderColor: errors.fieldName ? 'red' : 'black',
                          },
                        ]}
                        onChangeText={text => setArea(text)}
                        value={area}
                        placeholder="क्षेत्रफल राख्नुहोस्"
                        placeholderTextColor={errors.fieldName ? 'red' : 'grey'}
                        keyboardType="numeric"
                      />
                    </View>
                    <View
                      style={{flexDirection: 'column', width: width * 0.39}}>
                      <Text style={styles.label}>क्षेत्र एकाइ:</Text>
                      <View>
                        <AutocompleteDropdown
                          onSelectItem={text => setAreaType(text)}
                          dataSet={AreaType}
                          textInputProps={{
                            style: {
                              color: 'black',
                              paddingLeft: 18,

                              // borderRadius: 10,
                            },
                          }}
                          containerStyle={{
                            width: width * 0.38,
                            marginLeft: 12,
                            marginTop: 6,
                            //   borderWidth: 0.7,
                            //   borderColor: 'black',
                            //   borderRadius: 6,
                          }}
                        />
                        {errors.areaType && (
                          <Text
                            style={{
                              color: 'red',
                              fontSize: 10,
                              textAlign: 'center',
                            }}>
                            {errors.areaType}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', width: width * 0.78}}>
                    <View
                      style={{flexDirection: 'column', width: width * 0.39}}>
                      <Text style={styles.label}>कित्ता नम्बर:</Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            width: width * 0.36,
                            borderColor: errors.fieldName ? 'red' : 'black',
                          },
                        ]}
                        onChangeText={text => setKittaNumber(text)}
                        value={kittaNumber}
                        placeholder="कित्ता नम्बर राख्नुहोस्"
                        placeholderTextColor={errors.fieldName ? 'red' : 'grey'}
                        keyboardType="numeric"
                      />
                    </View>
                    <View
                      style={{flexDirection: 'column', width: width * 0.39}}>
                      <Text style={styles.label}>खेती गरिएको ?</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginLeft: 15,
                          marginTop: 10,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              color: 'black',
                              alignSelf: 'center',
                              fontSize: 16,
                            }}>
                            छ
                          </Text>
                          <RadioButton
                            color="green"
                            value={true}
                            status={
                              isCultivated === true ? 'checked' : 'unchecked'
                            }
                            onPress={() => setIsCultivated(true)}
                          />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              color: 'black',
                              alignSelf: 'center',
                              fontSize: 16,
                            }}>
                            छैन
                          </Text>

                          <RadioButton
                            color="green"
                            value={false}
                            status={
                              isCultivated === false ? 'checked' : 'unchecked'
                            }
                            onPress={() => setIsCultivated(false)}
                          />
                        </View>
                      </View>
                    </View>
                  </View>

                  <Text style={styles.label}>स्थान:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: errors.fieldName ? 'red' : 'black',
                      },
                    ]}
                    onChangeText={text => setPlace(text)}
                    value={place}
                    placeholder="स्थान राख्नुहोस्"
                    placeholderTextColor={errors.fieldName ? 'red' : 'grey'}
                  />
                  <Text style={styles.label}>जग्गा धनीको नाम:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: errors.fieldName ? 'red' : 'black',
                      },
                    ]}
                    onChangeText={text => setFieldOwner(text)}
                    value={fieldOwner}
                    placeholder="जग्गा धनी"
                    placeholderTextColor={errors.fieldName ? 'red' : 'grey'}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={onLocationClick}
                    style={{
                      alignSelf: 'flex-start',
                      borderColor: 'black',
                      borderWidth: 0.5,
                      flexDirection: 'row',
                      padding: 6,
                      borderRadius: 5,
                      marginLeft: 20,
                      backgroundColor: 'white',
                      marginTop: 10,
                      elevation: 5,
                    }}>
                    <Image
                      source={require('../../Assets/FarmImages/map.png')}
                      style={{width: 25, height: 25}}
                    />
                    <Text
                      style={{
                        color: 'black',
                        alignSelf: 'center',
                        marginLeft: 5,
                      }}>
                      स्थान प्राप्त गर्नुहोस्
                    </Text>
                  </TouchableOpacity>
                  {locationDetails && (
                    <View style={{alignSelf: 'center', marginLeft: 15}}>
                      <Text style={{color: 'black'}}>
                        देशान्तर: {locationDetails.coords.longitude}
                      </Text>
                      <Text style={{color: 'black'}}>
                        अक्षांश: {locationDetails.coords.latitude}
                      </Text>
                    </View>
                  )}
                </View>
                {errors.locationDetails && (
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 10,
                      marginLeft: 30,
                      marginTop: 5,
                    }}>
                    {errors.locationDetails}
                  </Text>
                )}

                <TouchableOpacity style={styles.btnSave} onPress={onSubmit}>
                  <Text style={styles.btnTxt}>
                    {editingFarmId ? 'सम्पादन' : 'थप्नुहोस'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default FarmRegistration;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 25,
    right: 0,
    bottom: 0,
    width: width * 0.34,
    backgroundColor: '#4cbb17',
    zIndex: 100,
  },
  centeredView: {
    // flex: 1,
    width: width * 0.85,
    height: height * 0.7,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 10,
  },
  input: {
    height: 40,
    margin: 8,
    borderWidth: 0.5,
    padding: 10,
    color: 'black',
    borderRadius: 10,
    width: width * 0.78,
  },
  label: {
    color: 'black',
    marginLeft: 12,
    fontWeight: '600',
  },
  btnContainer: {
    flexDirection: 'row',
    width: width * 0.85,
  },
  btnSave: {
    width: width * 0.74,
    backgroundColor: 'green',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    marginBottom: 40,
    marginTop: 20,
  },
  btnCancel: {
    width: width * 0.425,
    backgroundColor: 'red',
    padding: 10,
    borderBottomLeftRadius: 10,
  },
  btnTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  farmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.97,
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: 10,
    backgroundColor: '#d4d4d4',
    borderRadius: 5,
    padding: 10,
  },
  farmInfo: {
    flexDirection: 'column',
  },
  infoImage: {
    width: 30,
    height: 30,
    tintColor: 'green',
  },
  farmName: {
    color: 'black',
    fontSize: 18,
    marginBottom: 8,
  },
  actionIconContainer: {
    flexDirection: 'row',
  },
});
