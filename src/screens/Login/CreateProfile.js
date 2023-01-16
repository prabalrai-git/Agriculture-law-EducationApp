import {
  View,
  Text,
  TextInput,
  StyleSheet,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {RadioButton, SegmentedButtons} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {
  getListOfDistricts,
  GetListofUserTypesApi,
} from '../../Services/appServices/agricultureService';
import {
  getlistofDisctrictByStateIdApi,
  getListOfStatesApi,
  getListOfVDCByDistrictIdApi,
} from '../../Services/appServices/geographyService';
import NepaliDatePicker from '../../components/NepaliDatePicker';
import DatePicker from '../../components/DatePicker';
import {InsertUpdatePersonalInfoApi} from '../../Services/appServices/loginService';
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('window').width;

const CreateProfile = ({navigation}) => {
  const [text, onChangeText] = useState();
  const [number, onChangeNumber] = useState(null);
  const [cameraImage, setCameraImage] = useState();
  const [galleryImage, setGalleryImage] = useState();
  const [value, setValue] = React.useState('');

  const [stateList, setStateList] = useState();
  const [districtsList, setDistrictsList] = useState();
  const [municipalityList, setMunicipalityList] = useState();
  const [professionType, setProfessionType] = useState();
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);

  // form states
  const [DOB, setDOB] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [password, setPassword] = useState(null);
  const [reEnteredPassword, setReEnteredPassword] = useState(null);
  const [gender, setGender] = useState();
  const [state, setState] = useState(null);
  const [district, setDistrict] = useState(null);
  const [municipality, setMunicipality] = useState();
  const [ward, setWard] = useState(null);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [citizenshipNumber, setCitizenshipNumber] = useState(null);
  // end of form states
  const [errors, setErrors] = useState({});

  const handleValidation = (errorMsg, inputFieldName) => {
    setErrors(perviousData => ({...perviousData, [inputFieldName]: errorMsg}));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (fullName === null || undefined) {
      handleValidation('please enter full name', 'fullname');
      isValid = false;
    }
    if (password === null || undefined) {
      handleValidation('please enter password', 'password');
      isValid = false;
    }
    if (!gender) {
      handleValidation('कृपया लिङ्ग प्रविष्ट गर्नुहोस्', 'gender');
      isValid = false;
    }
    if (DOB === null || undefined) {
      handleValidation('please enter DOB', 'DOB');
      isValid = false;
    }
    if (state === null || undefined) {
      handleValidation('कृपया प्रान्त प्रविष्ट गर्नुहोस्', 'state');
      isValid = false;
    }
    if (district === null || undefined) {
      handleValidation('कृपया जिल्ला प्रविष्ट गर्नुहोस्', 'district');
      isValid = false;
    }
    if (!municipality) {
      handleValidation('कृपया नगरपालिका प्रवेश गर्नुहोस्', 'municipality');
      isValid = false;
    }
    if (ward === null || undefined) {
      handleValidation('कृपया वार्ड नम्बर प्रविष्ट गर्नुहोस्', 'ward');
      isValid = false;
    }
    if (!selectedProfession) {
      handleValidation(
        'कृपया पेशा प्रकार प्रविष्ट गर्नुहोस्',
        'selectedProfession',
      );
      isValid = false;
    }
    if (citizenshipNumber === null || undefined) {
      handleValidation('please enter citizenshipNumber', 'citizenshipNumber');
      console.log(errors);
      isValid = false;
    }
    return isValid;
  };

  useEffect(() => {
    // getListOfDistricts((res) => {
    //     console.log(res, 'this is res');
    //     const data = res.map(item => ({ id: item.DID, title: item.District }))
    //     // console.log(data);
    //     setDistricts(data)
    // })

    getListOfStatesApi(res => {
      if (res) {
        const data = res.map(item => ({
          id: item.StateId,
          title: item.StateName,
        }));
        setStateList(data);
      }
    });
    GetListofUserTypesApi(res => {
      console.log('This is profession tp', res);
      if (res) {
        const data = res.map(item => ({
          id: item.MId,
          title: item.MemType,
        }));
        setProfessionType(data);
      }
    });
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      //clear setInterval here and go back
    });
  }, []);

  const onSelectState = item => {
    if (item) {
      setDistrictsList();
      const data = {
        stateId: item.id,
      };
      getlistofDisctrictByStateIdApi(data, res => {
        if (res) {
          const data = res.map(item => ({
            id: item.DId,
            title: item.District,
          }));
          setDistrictsList(data);
        }
      });
      setState(item.title);
    }
  };
  const onSelectDistrict = item => {
    if (item) {
      setMunicipalityList();
      const data = {
        districtId: item.id,
      };
      getListOfVDCByDistrictIdApi(data, res => {
        if (res) {
          const data = res.map(item => ({
            id: item.VdcID,
            title: item.Name,
          }));
          setMunicipalityList(data);
        }
      });
      setDistrict(item.title);
    }
  };

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
    // console.log('pressed')
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted == PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      // console.log("this is the uri", result.assets[0].uri);
      setCameraImage(result.assets[0].uri);
      setGalleryImage();
    }
  };
  const openGallery = async () => {
    // console.log('pressed')

    const result = await launchImageLibrary(options);
    setGalleryImage(result.assets[0].uri);
    setCameraImage();
  };

  const storeDataToAsyncStorage = async value => {
    try {
      await AsyncStorage.setItem('userCode', value);
    } catch (e) {
      // saving error
      console.log('error saving');
    }
  };

  const onFormSubmit = () => {
    let validation = validate();
    console.log(errors.fullname, ';;;;;;;;;;;;;;;;;;;;');
    let data = {
      PId: 0,
      PCode: 'e35db3d0-7de6-4231-a6b8-21f568e988c3',
      FullName: fullName,
      Sex: gender,
      Age: 10,
      DateofBirth: DOB,
      MobileNo: 9818158171,
      EmailId: 'praalrai17@gmail.com',
      District: district,
      VDCMun: municipality,
      WardNo: ward,
      ProfessionType: selectedProfession,
      EntryDate: new Date(),
      UserId: 14,
      Tole: 'sample string 15',
      Country: 'Nepal',
      Province: state,
      CitizenshipNo: citizenshipNumber,
      NationalId: citizenshipNumber,
      UsrPassword: password,
    };
    if (validation) {
      InsertUpdatePersonalInfoApi(data, res => {
        try {
          if (res?.GuId[0]?.PCode) {
            console.log(res.GuId[0].PCode);
            storeDataToAsyncStorage(res.GuId[0].PCode);
            navigation.navigate('BottomNavigation');
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  };

  return (
    <ScrollView>
      <View>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            margin: 18,
            fontSize: 24,
            fontWeight: 'bold',
          }}>
          प्रोफाइल सिर्जना{' '}
        </Text>
      </View>

      <View>
        <View style={styles.eachContainer}>
          <Text style={styles.label}>पुरा नाम:</Text>
          <View>
            <TextInput
              style={[
                styles.input,
                {borderColor: errors.fullname ? 'red' : 'black'},
              ]}
              onChangeText={text => setFullName(text)}
              value={fullName}
              placeholder="आफ्नो नाम राख्नुहोस्"
              placeholderTextColor={errors.fullname ? 'red' : 'grey'}
            />
            {/* {errors.fullname && (
              <Text style={styles.errorTxt}>{errors.fullname}</Text>
            )} */}
          </View>
        </View>
        <View style={styles.eachContainer}>
          <Text style={styles.label}>पासवर्ड:</Text>
          <TextInput
            style={[
              styles.input,
              {borderColor: errors.password ? 'red' : 'black'},
            ]}
            onChangeText={text => setPassword(text)}
            value={password}
            placeholder="आफ्नो पासवर्ड राख्नुहोस्"
            placeholderTextColor={errors.password ? 'red' : 'grey'}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.eachContainer}>
          <Text style={styles.label}>पुन: पासवर्ड:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setReEnteredPassword(text)}
            value={reEnteredPassword}
            placeholder="पुन: पासवर्ड राख्नुहोस्"
            placeholderTextColor="grey"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.eachContainer}>
          <Text style={styles.label}>लिङ्ग:</Text>
          <View>
            <AutocompleteDropdown
              onSelectItem={text => setGender(text?.title)}
              dataSet={[
                {id: 1, title: 'पुरुष'},
                {id: 2, title: 'महिला'},
                {id: 3, title: 'अन्य'},
              ]}
              textInputProps={{
                style: {
                  color: 'black',
                  paddingLeft: 18,
                },
              }}
              containerStyle={{width: width * 0.73, marginBottom: 8}}
            />
            {errors.gender && (
              <Text style={styles.errorTxt}>{errors.gender}</Text>
            )}
          </View>
        </View>
        <View style={styles.eachContainer}>
          <Text style={styles.label}>जन्म मिति:</Text>

          <TextInput
            editable={false}
            selectTextOnFocus={false}
            style={[
              styles.input,
              {
                paddingTop: 10,
                paddingRight: 0,
                paddingBottom: 10,
                paddingLeft: 10,
                width: width * 0.5,
                borderColor: errors.DOB ? 'red' : 'black',
              },
            ]}
            value={DOB?.toString()}
            placeholder="जन्ममिति राख्नुहोस्"
            placeholderTextColor={errors.DOB ? 'red' : 'grey'}
          />
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginLeft: 15,
              padding: 4,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 6,
            }}
            onPress={() => setDatePickerVisibility(true)}>
            <Image
              source={require('../../Assets/FarmImages/calendarClick.png')}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </TouchableOpacity>
        </View>
        {datePickerVisibility && (
          <DatePicker
            setDOB={setDOB}
            setDatePickerVisibility={setDatePickerVisibility}
          />
        )}

        <View
          style={{
            flexDirection: 'row',
            width: width * 0.96,
            marginRight: 'auto',
            marginLeft: 'auto',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View
            style={{
              backgroundColor: 'grey',
              height: 2,
              width: width * 0.3,
            }}></View>
          <Text
            style={{
              color: 'black',
              marginTop: 1,
              fontSize: 16,
              fontWeight: '500',
              margin: 5,
            }}>
            ठेगाना
          </Text>
          <View
            style={{
              backgroundColor: 'grey',
              height: 2,
              width: width * 0.54,
            }}></View>
        </View>

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <View style={{flexDirection: 'column', flexWrap: 'wrap'}}>
            <Text style={styles.label}>प्रदेश:</Text>
            <View>
              <AutocompleteDropdown
                onSelectItem={text => onSelectState(text)}
                dataSet={stateList}
                textInputProps={{
                  style: {
                    color: 'black',
                    paddingLeft: 18,
                  },
                }}
                containerStyle={{width: width * 0.458, margin: 8}}
              />
              {errors.state && (
                <Text style={styles.errorTxt}>{errors.state}</Text>
              )}
            </View>
          </View>

          <View style={{flexDirection: 'column', flexWrap: 'wrap'}}>
            <Text style={styles.label}>जिल्ला:</Text>
            {/* <TextInput
                            style={[styles.input, { width: width * 0.458 }]}
                            onChangeText={onChangeText}
                            value={text}
                            placeholderTextColor="grey"

                        /> */}
            <View>
              <AutocompleteDropdown
                onSelectItem={item => onSelectDistrict(item)}
                dataSet={districtsList}
                textInputProps={{
                  style: {
                    color: 'black',
                    paddingLeft: 18,
                  },
                }}
                containerStyle={{
                  width: width * 0.458,
                  margin: 8,
                }}
              />
              {errors.district && (
                <Text style={styles.errorTxt}>{errors.district}</Text>
              )}
            </View>
          </View>

          <View style={{flexDirection: 'column', flexWrap: 'wrap'}}>
            <Text
              style={[
                styles.label,
                {marginTop: 5, width: 200, textAlign: 'center'},
              ]}>
              नगरपालिका/ गाउँपालिका:
            </Text>
            <View>
              <AutocompleteDropdown
                onSelectItem={text => setMunicipality(text?.title)}
                dataSet={municipalityList}
                textInputProps={{
                  style: {
                    color: 'black',
                    paddingLeft: 18,
                    // borderRadius: 10,
                  },
                }}
                containerStyle={{
                  width: width * 0.458,
                  margin: 8,
                }}
              />
              {errors.municipality && (
                <Text style={styles.errorTxt}>{errors.municipality}</Text>
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              flexWrap: 'wrap',
              alignSelf: 'center',
            }}>
            <Text style={[styles.label, {marginTop: 5}]}>वडा:</Text>
            <View>
              <TextInput
                style={[
                  styles.input,
                  {
                    width: width * 0.458,
                    marginTop: 3,
                    borderRadius: 5,
                    backgroundColor: '#e5ecf2',
                    borderWidth: 0,
                  },
                ]}
                onChangeText={text => setWard(text)}
                value={ward}
                placeholderTextColor="grey"
                keyboardType="numeric"
              />
              {errors.ward && (
                <Text style={styles.errorTxt}>{errors.ward}</Text>
              )}
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'grey',
              height: 2,
              width: width * 0.95,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: 10,
              marginTop: 15,
            }}></View>
        </View>
        <View style={styles.eachContainer}>
          <Text style={styles.label}>पेशाको प्रकार:</Text>
          <View>
            <AutocompleteDropdown
              onSelectItem={text => setSelectedProfession(text?.id)}
              dataSet={professionType}
              textInputProps={{
                style: {
                  color: 'black',
                  paddingLeft: 18,
                },
              }}
              containerStyle={{width: width * 0.73, marginBottom: 8}}
            />
            {errors.selectedProfession && (
              <Text style={styles.errorTxt}>{errors.selectedProfession}</Text>
            )}
          </View>
        </View>
        <View style={styles.eachContainer}>
          <Text style={styles.label}>नागरिकता नम्बर:</Text>
          <TextInput
            style={[
              styles.input,
              {borderColor: errors.citizenshipNumber ? 'red' : 'black'},
            ]}
            onChangeText={num => setCitizenshipNumber(num)}
            value={citizenshipNumber}
            placeholder="आफ्नो नागरिकता नम्बर राख्नुहोस्"
            placeholderTextColor={errors.citizenshipNumber ? 'red' : 'grey'}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.eachContainer, {marginTop: 10}]}>
          <Text style={styles.label}>फोटो अपलोड:</Text>

          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            style={{marginTop: 10, width: 250, marginLeft: 12}}
            buttons={[
              {
                value: 'gallery',
                label: 'Gallery',
                onPress: openGallery,
                icon: 'image-multiple',
              },
              {
                value: 'camera',
                label: 'Camera',
                onPress: openCamera,
                icon: 'camera',
              },
            ]}
          />
        </View>
        {(galleryImage || cameraImage) && (
          <Image
            source={{uri: galleryImage ? galleryImage : cameraImage}}
            style={styles.image}
          />
        )}
        <TouchableOpacity style={styles.btn} onPress={onFormSubmit}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 18,
            }}>
            सिर्जना
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateProfile;
const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 8,
    borderWidth: 0.5,
    padding: 10,
    color: 'black',
    borderRadius: 10,
    width: width * 0.73,
  },
  label: {
    color: 'black',
    // marginLeft: 12,
    width: width * 0.2,
    alignSelf: 'center',
  },
  eachContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: width * 0.95,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 6,
  },
  image: {
    width: 45,
    height: 45,
    margin: 10,
    borderRadius: 6,
    marginLeft: 14,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  btn: {
    backgroundColor: 'green',
    width: width * 0.95,
    padding: 8,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    marginBottom: 50,
  },
  errorTxt: {
    color: 'red',
    fontSize: 10,
    textAlign: 'center',
  },
});
