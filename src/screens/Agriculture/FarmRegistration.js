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
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FAB, RadioButton, SegmentedButtons, Switch} from 'react-native-paper';
import CreateProfile from '../Login/CreateProfile';
import {ScrollView} from 'react-native-gesture-handler';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Geolocation from 'react-native-geolocation-service';
import {
  GetFarmListByFarmIdApi,
  GetFarmListByUserCodeApi,
  GetFarmTypeApi,
  InsertUpdateFarmApi,
  InsertUpdateFarmNewApi,
} from '../../Services/appServices/agricultureService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import KhetiGariyekoCha from '../../Common/KhetiGariyekoCha';
import DialogBox from '../../Common/DialogBox';
import {showMessage} from 'react-native-flash-message';
import EmptyFarmAfterFetch from '../../Common/EmptyFarmAfterFetch';
import DropdownComponent from '../../Common/DropdownComponent';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import ImagePicker from '../../components/ImagePicker';
import mime from 'mime';
import {log} from 'react-native-reanimated';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const FarmRegistration = ({navigation, route}) => {
  const differentCss = route.params?.fromBottomNavigation;

  const [modalVisible, setModalVisible] = useState(false);
  const [isCultivated, setIsCultivated] = useState(true);
  const [locationDetails, setLocationDetails] = useState();

  // form data states

  const [fieldName, setFieldName] = useState();
  const [fieldType, setFieldType] = useState();
  const [fieldTypeValue, setFieldTypeValue] = useState();
  const [area, setArea] = useState();
  const [areaType, setAreaType] = useState();
  const [kittaNumber, setKittaNumber] = useState();
  const [place, setPlace] = useState();
  const [fieldOwner, setFieldOwner] = useState();
  const [lalPurjaImage, setLalPurjaImage] = useState();

  // end of form data states

  const [userCode, setUserCode] = React.useState(null);
  const [farmList, setFarmList] = useState(null);
  const [reload, setReload] = useState(true);

  const [errors, setErrors] = useState({});
  const [editingFarmId, setEditingFarmId] = useState();
  const [editingFarm, setEditingFarm] = useState();
  const [dialogBoxVisible, setDialogBoxVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [deletingFarm, setDeletingFarm] = useState();
  const [isFocus, setIsFocus] = useState(false);

  //useEffect for debugging

  // useEffect(() => {
  //   console.log(
  //     lalPurjaImage.uri,
  //     lalPurjaImage.fileName,
  //     lalPurjaImage.type,
  //     'lalPurjaImage type selected',
  //   );
  // }, [lalPurjaImage]);

  useEffect(() => {
    getData();
    // console.log(
    //   editingFarm,
    //   'this is the editing farm........................',
    // );
  }, [editingFarm]);
  const handleValidation = (errorText, inputFieldName) => {
    setErrors(preState => ({...preState, [inputFieldName]: errorText}));
  };

  const validate = () => {
    let isValid = true;
    if (!fieldName && !editingFarm) {
      handleValidation('खेतको नाम राख्नुहोस्', 'fieldName');
      isValid = false;
    }
    if (!fieldTypeValue && !editingFarm) {
      handleValidation('enter field type', 'fieldType');
      isValid = false;
    }
    if (!area && !editingFarm) {
      handleValidation('क्षेत्रफल राख्नुहोस्', 'area');
      isValid = false;
    }
    if (!areaType && !editingFarm) {
      handleValidation('क्षेत्र एकाइ छान्नुहोस्', 'areaType');
      isValid = false;
    }
    if (!kittaNumber && !editingFarm) {
      handleValidation('क्षेत्रफल राख्नुहोस्', 'kittaNumber');
      isValid = false;
    }
    if (!place && !editingFarm) {
      handleValidation('क्षेत्रफल राख्नुहोस्', 'place');
      isValid = false;
    }
    if (!fieldOwner && !editingFarm) {
      handleValidation('क्षेत्रफल राख्नुहोस्', 'fieldOwner');
      isValid = false;
    }

    if (!locationDetails && !editingFarm) {
      handleValidation('स्थान विवरण प्राप्त गर्नुहोस्!', 'locationDetails');
      isValid = false;
    }
    if (!lalPurjaImage && !editingFarm) {
      handleValidation('फोटो चयन गर्नुहोस्!', 'image');
      isValid = false;
    }
    // console.log(errors, 'These are the errors');
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
            // console.log(position);
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

  const clearAllState = () => {
    setFieldName();
    setArea();
    setAreaType();
    setFieldTypeValue();
    setLalPurjaImage();
    setKittaNumber();
    setPlace();
    setFieldOwner();
    setLocationDetails();
    setReload(!reload);
    setErrors({});
    setEditingFarm();
    setEditingFarmId();
  };

  const onSubmit = async () => {
    // let validation = validate();

    // let formData = {
    //   frmId: editingFarmId ? editingFarmId : 0,
    //   frmEstArea: editingFarm ? editingFarm.frmEstArea : area,
    //   FilePath: {
    //     uri: imageFarm,
    //     name: 'test.jpg',
    //     type: 'image/jpeg',
    //   },
    //   frmLat: editingFarm
    //     ? editingFarm.frmLat
    //     : locationDetails?.coords.latitude,
    //   FrmLong: editingFarm
    //     ? editingFarm.frmLong
    //     : locationDetails?.coords.longitude,
    //   frmLocation: editingFarm ? editingFarm.frmLocation : place,
    //   frmAreaUnit: editingFarm ? editingFarm.frmAreaUnit : areaType?.label,
    //   frmAddedDate: editingFarm ? editingFarm.frmAddedDate : new Date(),
    //   frmName: editingFarm ? editingFarm.frmName : fieldName,
    //   frmUserId: userCode,
    //   LandOwner: editingFarm ? editingFarm.LandOwner : fieldOwner,
    //   KittaNumber: editingFarm ? editingFarm.KittaNumber : kittaNumber,
    //   IsCultivated: isCultivated,
    //   IsDeleted: false,
    //   FarmType: 2,
    //   SqId: editingFarm ? editingFarm.SqId : 9,
    // };
    const validation = validate();

    if (validation) {
      var formData = new FormData();

      const newImageUri =
        'file:/' + lalPurjaImage?.uri.split('file:/').join('');

      // console.log(newImageUri, mime.getType(newImageUri), 'yes');

      formData.append('frmId', editingFarmId ? editingFarmId : 0);
      formData.append(
        'frmEstArea',
        editingFarm ? editingFarm.frmEstArea : area,
      );
      formData.append('FilePath', {
        uri: newImageUri,
        name: lalPurjaImage?.fileName,
        type: mime.getType(lalPurjaImage?.uri),
      });
      // console.log(
      //   lalPurjaImage.uri,
      //   lalPurjaImage.fileName,
      //   mime.getType(lalPurjaImage.uri),
      // );
      formData.append(
        'frmLat',
        editingFarm ? editingFarm.frmLat : locationDetails?.coords.latitude,
      );
      formData.append(
        'FrmLong',
        editingFarm ? editingFarm.frmLong : locationDetails?.coords.longitude,
      );
      formData.append(
        'frmLocation',
        editingFarm ? editingFarm.frmLocation : place,
      );
      formData.append(
        'frmAreaUnit',
        editingFarm ? editingFarm.frmAreaUnit : areaType?.label,
      );
      formData.append(
        'frmAddedDate',
        editingFarm ? editingFarm.frmAddedDate : new Date(),
      );
      formData.append('frmName', editingFarm ? editingFarm.frmName : fieldName);
      formData.append('frmUserId', userCode);
      formData.append(
        'LandOwner',
        editingFarm ? editingFarm.LandOwner : fieldOwner,
      );
      formData.append(
        'KittaNumber',
        editingFarm ? editingFarm.KittaNumber : kittaNumber,
      );
      formData.append('IsCultivated', isCultivated);
      formData.append('IsDeleted', false);
      formData.append(
        'FarmType',
        editingFarm ? editingFarm.FarmType : fieldTypeValue?.value,
      );
      formData.append('SqId', 1);

      // console.log(formData);
      try {
        const response = await axios.post(
          'https://lunivacare.ddns.net/Luniva360Agri/api/luniva360agriapp/InsertUpdateFarmWithFile',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (response.data) {
          // console.log(response);
          clearAllState();
          setModalVisible(false);
          showMessage({
            message: 'सफल',
            description: 'नयाँ फार्म थपिएको छ',
            type: 'success',
            color: 'white',
            position: 'bottom',
            statusBarHeight: 40,
            style: {height: 81},
            icon: props => (
              <Image
                source={require('../../Assets/flashMessage/check.png')}
                {...props}
                style={{
                  tintColor: 'white',
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
              />
            ),
            // titleStyle: {textAlign: 'center'},
            // textStyle: {textAlign: 'center'},
          });
        }
      } catch (error) {
        // console.log(error);
        clearAllState();
        setModalVisible(false);
        showMessage({
          message: 'सफल',
          description: 'नयाँ फार्म थपिएको छ',
          type: 'success',
          color: 'white',
          position: 'bottom',
          statusBarHeight: 40,
          style: {height: 81},
          icon: props => (
            <Image
              source={require('../../Assets/flashMessage/check.png')}
              {...props}
              style={{
                tintColor: 'white',
                width: 20,
                height: 20,
                marginRight: 10,
              }}
            />
          ),
          // titleStyle: {textAlign: 'center'},
          // textStyle: {textAlign: 'center'},
        });
      }
    }

    // if (validation) {
    //   // try {
    //   //   InsertUpdateFarmApi(formData, res => {
    //   //     if (res) {
    //   //       setModalVisible(false);
    //   //       setFieldName();
    //   //       setArea();
    //   //       setAreaType();
    //   //       setKittaNumber();
    //   //       setPlace();
    //   //       setFieldOwner();
    //   //       setLocationDetails();
    //   //       setReload(!reload);
    //   //       setErrors({});
    //   //       setEditingFarm();
    //   //       setEditingFarmId();

    //   // } catch (error) {
    //   //   console.log(error);
    //   // }
    // }
  };

  const AreaTypeData = [
    {value: 1, label: 'कठ्ठा'},
    {value: 2, label: 'धुर'},
    {value: 3, label: 'रोपनी'},
    {value: 4, label: 'आना'},
  ];
  useEffect(() => {
    GetFarmTypeApi(res => {
      const data = res.map(item => ({value: item.FId, label: item.FarmType}));
      setFieldType(data);
    });
  }, []);

  useEffect(() => {
    let data = {
      userCode: userCode,
    };

    GetFarmListByUserCodeApi(data, res => {
      setFarmList(res.filter(item => item.IsDeleted === false));
    });
  }, [userCode, reload, dialogBoxVisible]);

  useEffect(() => {
    let data = {
      farmId: editingFarmId,
    };
    GetFarmListByFarmIdApi(data, res => {
      setEditingFarm(res[0]);
    });
  }, [editingFarmId]);

  const onClose = () => {
    setModalVisible(false);
    clearAllState();
  };

  return (
    <>
      <FAB
        icon="plus"
        style={[styles.fab, {bottom: differentCss ? 50 : 10}]}
        onPress={() => setModalVisible(true)}
        label="नयाँ दर्ता "
        color="white"
      />
      <Text
        style={{color: 'black', margin: 10, fontSize: 18, fontWeight: '500'}}>
        दर्ता भएका खेतहरू:
      </Text>

      <ScrollView>
        <View style={{flex: 1}}>
          {farmList?.length === 0 ? (
            <EmptyFarmAfterFetch
              message={` फार्महरू छैनन् !${'\n'} कृपया नयाँ फार्महरू दर्ता गर्नुहोस् !!`}
            />
          ) : (
            <View style={{marginBottom: 100}}>
              {farmList?.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      // console.log(item);
                      navigation.navigate('Bali', {
                        FarmId: item.frmID,
                        FarmName: item.frmName,
                      });
                    }}
                    key={item.frmID}>
                    <View style={styles.farmContainer}>
                      <View style={styles.farmInfo}>
                        <Text style={styles.farmName}>{item.frmName}</Text>
                        <View style={{flexDirection: 'row', marginBottom: 2}}>
                          <Image
                            source={require('../../Assets/FarmImages/land.png')}
                            style={styles.infoImage}
                          />
                          <Text
                            style={{
                              color: 'black',
                              alignSelf: 'center',
                              fontSize: 14,
                              marginLeft: 8,
                            }}>
                            <Text style={{fontWeight: '600'}}>
                              कुल क्षेत्रफल:
                            </Text>{' '}
                            {item.frmEstArea} {item.frmAreaUnit}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                          <Image
                            source={require('../../Assets/FarmImages/location1.png')}
                            style={styles.infoImage}
                          />
                          <Text
                            style={{
                              color: 'black',
                              alignSelf: 'center',
                              fontSize: 14,
                              marginLeft: 8,
                            }}>
                            <Text style={{fontWeight: '600'}}>स्थान:</Text>{' '}
                            {item.frmLocation}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                          <Image
                            source={require('../../Assets/FarmImages/calendar1.png')}
                            style={styles.infoImage}
                          />
                          <Text
                            style={{
                              color: 'black',
                              alignSelf: 'center',
                              fontSize: 14,
                              marginLeft: 8,
                            }}>
                            <Text style={{fontWeight: '600'}}>
                              थपिएको मिति:
                            </Text>{' '}
                            {item.frmAddedDate.split('T')[0]}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                          <Image
                            source={require('../../Assets/Images/businessman.png')}
                            style={styles.infoImage}
                          />
                          <Text
                            style={{
                              color: 'black',
                              alignSelf: 'center',
                              fontSize: 14,
                              marginLeft: 8,
                            }}>
                            <Text style={{fontWeight: '600'}}> जग्गा धनी:</Text>{' '}
                            {item.LandOwner}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                          <Image
                            source={require('../../Assets/Images/kitta.png')}
                            style={styles.infoImage}
                          />
                          <Text
                            style={{
                              color: 'black',
                              alignSelf: 'center',
                              fontSize: 14,
                              marginLeft: 8,
                            }}>
                            <Text style={{fontWeight: '600'}}>
                              {' '}
                              कित्ता नम्बर:
                            </Text>{' '}
                            {item.KittaNumber}
                          </Text>
                        </View>
                        <KhetiGariyekoCha isCultivated={item.IsCultivated} />
                      </View>
                      <View style={styles.actionIconContainer}>
                        <TouchableOpacity
                          style={{height: 40}}
                          onPress={() => {
                            setEditingFarmId(item.frmID);
                            setModalVisible(true);
                          }}>
                          <Image
                            source={require('../../Assets/FarmImages/writing.png')}
                            style={{width: 28, height: 28, tintColor: 'green'}}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{height: 40}}
                          onPress={() => {
                            setDialogBoxVisible(true);
                            setDeletingFarm(item);
                          }}>
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
                      <DialogBox
                        deletingFarm={deletingFarm}
                        setDeletingFarm={setDeletingFarm}
                        dialogBoxVisible={dialogBoxVisible}
                        setDialogBoxVisible={setDialogBoxVisible}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.1)'}}>
            <View
              style={[
                styles.centeredView,
                editingFarm && {height: height * 0.73},
              ]}>
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
                <TouchableOpacity onPress={onClose}>
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
                    onChangeText={text =>
                      editingFarm
                        ? setEditingFarm(prev => {
                            return {...prev, frmName: text};
                          })
                        : setFieldName(text)
                    }
                    value={editingFarm ? editingFarm.frmName : fieldName}
                    placeholder="खेतको नाम राख्नुहोस्"
                    placeholderTextColor={errors.area ? 'red' : 'grey'}
                  />
                  <Text style={styles.label}>खेतको प्रकार:</Text>
                  <Dropdown
                    style={{
                      width: width * 0.79,
                      margin: 6,
                      marginTop: 8,
                      borderColor: errors.fieldType ? 'red' : 'black',
                      borderWidth: 0.6,
                      borderRadius: 5,
                      height: 40,
                    }}
                    placeholderStyle={{
                      color: errors.fieldType ? 'red' : 'grey',
                      fontSize: 14,
                      paddingLeft: 10,
                    }}
                    selectedTextStyle={{
                      color: 'black',
                      paddingLeft: 10,
                    }}
                    inputSearchStyle={{
                      height: 44,
                      fontSize: 16,
                      color: 'black',
                    }}
                    itemTextStyle={{color: 'black'}}
                    data={fieldType}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'चयन गर्नुहोस्' : '...'}
                    searchPlaceholder="कृपया खोज्नुहोस्..."
                    value={editingFarm ? editingFarm.FarmType : fieldTypeValue}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      editingFarm
                        ? setEditingFarm(prev => {
                            return {...prev, FarmType: item};
                          })
                        : setFieldTypeValue(item);
                      setIsFocus(false);
                    }}
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
                            borderColor: errors.area ? 'red' : 'black',
                          },
                        ]}
                        onChangeText={text =>
                          editingFarm
                            ? setEditingFarm(prev => {
                                return {...prev, frmEstArea: text};
                              })
                            : setArea(text)
                        }
                        value={editingFarm ? editingFarm.frmEstArea : area}
                        placeholder="क्षेत्रफल राख्नुहोस्"
                        placeholderTextColor={errors.area ? 'red' : 'grey'}
                        keyboardType="numeric"
                      />
                    </View>
                    <View
                      style={[
                        {flexDirection: 'column', width: width * 0.39},
                        Platform.select({android: {zIndex: 7}}),
                      ]}>
                      <Text style={styles.label}>क्षेत्र एकाइ:</Text>
                      <View>
                        {/* <AutocompleteDropdown
                          onSelectItem={text => setAreaType(text)}
                          initialValue={{
                            id: editingFarm
                              ? AreaType.map(item => {
                                  if (editingFarm.frmAreaUnit === item.title) {
                                    return item.id;
                                  }
                                })
                              : 1,
                          }}
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
                            borderWidth: 0.7,
                            borderColor: 'black',
                            borderRadius: 6,
                          }}
                        /> */}
                        {editingFarm ? (
                          <DropdownComponent
                            areaUnits={AreaTypeData}
                            setAreaType={setAreaType}
                            editingFarm={editingFarm ? editingFarm : null}
                            setEditingFarm={setEditingFarm}
                            editingFarmId={editingFarmId}
                          />
                        ) : (
                          <Dropdown
                            style={{
                              width: width * 0.4,
                              margin: 6,
                              marginTop: 8,
                              borderColor: errors.areaType ? 'red' : 'black',
                              borderWidth: 0.6,
                              borderRadius: 5,
                              height: 40,
                            }}
                            placeholderStyle={{
                              color: errors.areaType ? 'red' : 'grey',
                              fontSize: 14,
                              paddingLeft: 10,
                            }}
                            selectedTextStyle={{
                              color: 'black',
                              paddingLeft: 10,
                            }}
                            inputSearchStyle={{
                              height: 44,
                              fontSize: 16,
                              color: 'black',
                            }}
                            itemTextStyle={{color: 'black'}}
                            data={AreaTypeData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'चयन गर्नुहोस्' : '...'}
                            searchPlaceholder="कृपया खोज्नुहोस्..."
                            value={areaType}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                              setAreaType(item);
                              setIsFocus(false);
                            }}
                          />
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
                            borderColor: errors.kittaNumber ? 'red' : 'black',
                          },
                        ]}
                        onChangeText={text =>
                          editingFarm
                            ? setEditingFarm(prev => {
                                return {...prev, KittaNumber: text};
                              })
                            : setKittaNumber(text)
                        }
                        value={
                          editingFarm ? editingFarm.KittaNumber : kittaNumber
                        }
                        placeholder="कित्ता नम्बर राख्नुहोस्"
                        placeholderTextColor={
                          errors.kittaNumber ? 'red' : 'grey'
                        }
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
                        borderColor: errors.place ? 'red' : 'black',
                      },
                    ]}
                    onChangeText={text =>
                      editingFarm
                        ? setEditingFarm(prev => {
                            return {...prev, frmLocation: text};
                          })
                        : setPlace(text)
                    }
                    value={editingFarm ? editingFarm.frmLocation : place}
                    placeholder="स्थान राख्नुहोस्"
                    placeholderTextColor={errors.place ? 'red' : 'grey'}
                  />
                  <Text style={styles.label}>जग्गा धनीको नाम:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: errors.fieldOwner ? 'red' : 'black',
                      },
                    ]}
                    onChangeText={text =>
                      editingFarm
                        ? setEditingFarm(prev => {
                            return {...prev, LandOwner: text};
                          })
                        : setFieldOwner(text)
                    }
                    value={editingFarm ? editingFarm.LandOwner : fieldOwner}
                    placeholder="जग्गा धनी"
                    placeholderTextColor={errors.fieldOwner ? 'red' : 'grey'}
                  />
                </View>
                {!editingFarm && (
                  <>
                    <ImagePicker setLalPurjaImage={setLalPurjaImage} />
                    {errors.image && (
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 10,
                          marginLeft: 20,
                          marginTop: 5,
                        }}>
                        {errors.image}
                      </Text>
                    )}
                  </>
                )}
                {!editingFarm && (
                  <>
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
                          marginLeft: 30,
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
                            देशान्तर:{' '}
                            {editingFarm
                              ? editingFarm.frmLong
                              : locationDetails.coords.longitude}
                          </Text>
                          <Text style={{color: 'black'}}>
                            अक्षांश:{' '}
                            {editingFarm
                              ? editingFarm.frmLat
                              : locationDetails.coords.latitude}
                          </Text>
                        </View>
                      )}
                    </View>
                    {errors.locationDetails && (
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 10,
                          marginLeft: 20,
                          marginTop: 5,
                        }}>
                        {errors.locationDetails}
                      </Text>
                    )}
                  </>
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
    width: width * 0.28,
    backgroundColor: '#4cbb17',
    zIndex: 100,
  },
  centeredView: {
    // flex: 1,
    width: width * 0.9,
    // height: height * 0.7,
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
    borderRadius: 5,
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
    // marginBottom: 50,
  },
  farmInfo: {
    flexDirection: 'column',
  },
  infoImage: {
    width: 20,
    height: 20,
    tintColor: 'green',
  },
  farmName: {
    color: 'black',
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '500',
  },
  actionIconContainer: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: 'white',
    marginLeft: -1,

    // padding: 16,
    margin: 8,
    color: 'black',
    width: '100%',
  },
  dropdown: {
    height: 40,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 5,
    // paddingHorizontal: 8,
    color: 'black',
  },
  // icon: {
  //   marginRight: 5,
  //   color: 'black',
  // },
  // label: {
  //   position: 'absolute',
  //   backgroundColor: 'white',
  //   left: 22,
  //   top: 8,
  //   zIndex: 999,
  //   paddingHorizontal: 8,
  //   fontSize: 14,
  //   color: 'black',
  // },
  // placeholderStyle: {
  //   fontSize: 14,
  //   color: 'grey',
  //   paddingLeft: 10,
  // },
  // selectedTextStyle: {
  //   fontSize: 14,
  //   color: 'black',
  //   paddingLeft: 10,
  // },

  // inputSearchStyle: {
  //   height: 40,
  //   fontSize: 16,
  //   color: 'black',
  // },
});
