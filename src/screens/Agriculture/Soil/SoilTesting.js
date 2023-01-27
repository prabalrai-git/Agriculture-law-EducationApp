import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect} from 'react';
import {FAB} from 'react-native-paper';
import {useState} from 'react';
import DatePicker from '../../../components/DatePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GetSoilValuesByFarmIdAndUserIdApi,
  InsertUpdateSoilValuesByUserIdApi,
} from '../../../Services/appServices/agricultureService';
import TestedSoilDisplay from './TestedSoilDisplay';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SoilTesting = ({route}) => {
  const {FarmId, FarmName} = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [datePickerVisibilitySoil, setDatePickerVisibilitySoil] =
    useState(false);

  const [soilTestLists, setSoilTestLists] = useState();
  const [reloadPage, setReloadPage] = useState(false);
  const [errors, setErrors] = useState({});

  // form states
  const [ph, setPh] = useState();
  const [moisture, setMoisture] = useState();
  const [nitrogen, setNitrogen] = useState();
  const [phosphorous, setPhosphorous] = useState();
  const [potassium, setPotassium] = useState();
  const [minerals, setMinerals] = useState();
  const [miscProperties, setMiscProperties] = useState();
  const [testDate, setTestDate] = useState();
  const [userCode, setUserCode] = useState();

  const handleValidation = (errorText, inputFieldName) => {
    setErrors(preState => ({...preState, [inputFieldName]: errorText}));
  };

  const validate = () => {
    let isValidated = true;

    if (!ph) {
      handleValidation('इनपुट मान राख्नुहोस्', 'ph');
      isValidated = false;
    }
    if (!moisture) {
      handleValidation('इनपुट मान राख्नुहोस्', 'moisture');
      isValidated = false;
    }
    if (!phosphorous) {
      handleValidation('इनपुट मान राख्नुहोस्', 'phosphorous');
      isValidated = false;
    }
    if (!potassium) {
      handleValidation('इनपुट मान राख्नुहोस्', 'potassium');
      isValidated = false;
    }
    if (!miscProperties) {
      handleValidation('इनपुट मान राख्नुहोस्', 'miscProperties');
      isValidated = false;
    }
    if (!testDate) {
      handleValidation('इनपुट मान राख्नुहोस्', 'testDate');
      isValidated = false;
    }
    if (!minerals) {
      handleValidation('इनपुट मान राख्नुहोस्', 'minerals');
      isValidated = false;
    }
    if (!nitrogen) {
      handleValidation('इनपुट मान राख्नुहोस्', 'nitrogen');
      isValidated = false;
    }
    return isValidated;
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const data = {
      farmId: FarmId,
      userCode: userCode,
    };

    GetSoilValuesByFarmIdAndUserIdApi(data, res => {
      if (res.length > 0) {
        const deleteFiltered = res.filter(item => item.IsDeleted !== false);

        setSoilTestLists(deleteFiltered);
      }
    });
  }, [userCode, reloadPage]);
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
      console.log('this is error from sync');
    }
  };

  const clearAllStates = () => {
    setMoisture();
    setNitrogen();
    setMinerals();
    setPotassium();
    setMiscProperties();
    setPhosphorous();
    setTestDate();
    setPh();
    setErrors({});
  };

  const onSubmit = () => {
    let Validation = validate();

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
      IsDeleted: false,
    };
    console.log(data);
    if (Validation) {
      InsertUpdateSoilValuesByUserIdApi(data, res => {
        if (res.SuccessMsg) {
          clearAllStates();
          setReloadPage(!reloadPage);
          setModalVisible(false);
        }
      });
    }
  };

  return (
    <>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        label="नयाँ परीक्षण"
        color="white"
      />
      <Text
        style={{
          color: 'white',
          // margin: 10,
          marginBottom: 10,
          fontSize: 16,
          fontWeight: '500',
          backgroundColor: '#4cbb17',
          width: width,
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: 10,
          // textAlign: 'center',
          // borderRadius: 5,
        }}>
        खेतको नाम: {FarmName}
      </Text>
      <Text
        style={{
          color: 'black',
          margin: 10,
          marginTop: 10,
          fontSize: 18,
          fontWeight: '500',
        }}>
        परीक्षण परिणामहरू:
      </Text>

      <TestedSoilDisplay FarmName={FarmName} soilTestLists={soilTestLists} />

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}}>
            <View style={[styles.centeredView]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.85,
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
                  माटो परीक्षण:
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    clearAllStates();
                    setModalVisible(false);
                  }}>
                  <Image
                    source={require('../../../Assets/FarmImages/close.png')}
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
                    width: width * 0.9,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: width * 0.88,
                      justifyContent: 'space-around',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: width * 0.42,
                        marginLeft: -8,
                      }}>
                      <Text style={styles.label}>पि.एच:</Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            width: width * 0.42,
                            borderColor: errors?.ph ? 'red' : 'black',
                          },
                        ]}
                        onChangeText={text => setPh(text)}
                        value={ph}
                        placeholder="पि.एच राख्नुहोस्.."
                        placeholderTextColor={errors?.ph ? 'red' : 'grey'}
                        keyboardType="numeric"
                      />
                    </View>
                    <View
                      style={{flexDirection: 'column', width: width * 0.42}}>
                      <Text style={styles.label}>चिस्यान:</Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            width: width * 0.41,
                            borderColor: errors?.moisture ? 'red' : 'black',
                          },
                        ]}
                        onChangeText={text => setMoisture(text)}
                        value={moisture}
                        placeholder="चिस्यान राख्नुहोस्.."
                        placeholderTextColor={errors?.moisture ? 'red' : 'grey'}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: width * 0.86,
                      flexWrap: 'wrap',
                      justifyContent: 'space-around',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: width * 0.28,
                      }}>
                      <Text style={styles.label}>नाइट्रोजन:</Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            width: width * 0.28,
                            borderColor: errors?.nitrogen ? 'red' : 'black',
                          },
                        ]}
                        onChangeText={text => setNitrogen(text)}
                        value={nitrogen}
                        placeholder="नाइट्रोजन.."
                        placeholderTextColor={errors?.nitrogen ? 'red' : 'grey'}
                        keyboardType="numeric"
                      />
                    </View>
                    <View
                      style={{flexDirection: 'column', width: width * 0.28}}>
                      <Text style={styles.label}>फस्फोरस:</Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            width: width * 0.28,
                            borderColor: errors?.phosphorous ? 'red' : 'black',
                          },
                        ]}
                        onChangeText={text => setPhosphorous(text)}
                        value={phosphorous}
                        placeholder="फस्फोरस.."
                        placeholderTextColor={
                          errors?.phosphorous ? 'red' : 'grey'
                        }
                        keyboardType="numeric"
                      />
                    </View>
                    <View
                      style={{flexDirection: 'column', width: width * 0.28}}>
                      <Text style={styles.label}>पोटासियम:</Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            width: width * 0.28,
                            borderColor: errors?.potassium ? 'red' : 'black',
                          },
                        ]}
                        onChangeText={text => setPotassium(text)}
                        value={potassium}
                        placeholder="पोटासियम.."
                        placeholderTextColor={
                          errors?.potassium ? 'red' : 'grey'
                        }
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', width: width * 0.9}}>
                    <View
                      style={{flexDirection: 'column', width: width * 0.86}}>
                      <Text style={styles.label}>खनिजहरू:</Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            width: width * 0.86,
                            borderColor: errors?.minerals ? 'red' : 'black',
                          },
                        ]}
                        onChangeText={text => setMinerals(text)}
                        value={minerals}
                        placeholder="खनिजहरू राख्नुहोस्.."
                        placeholderTextColor={errors?.minerals ? 'red' : 'grey'}
                      />
                    </View>
                  </View>

                  <Text style={styles.label}>अन्य गुणहरू:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: errors?.miscProperties ? 'red' : 'black',

                        width: width * 0.86,
                      },
                    ]}
                    onChangeText={text => setMiscProperties(text)}
                    value={miscProperties}
                    placeholder="अन्य गुणहरू राख्नुहोस्.."
                    placeholderTextColor={
                      errors?.miscProperties ? 'red' : 'grey'
                    }
                  />
                  <Text style={styles.label}>परीक्षण मिति:</Text>
                  <View style={{width: width * 0.86, flexDirection: 'row'}}>
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
                          width: width * 0.76,
                          borderColor: errors?.testDate ? 'red' : 'black',
                        },
                      ]}
                      value={testDate?.toDateString()}
                      placeholder="परीक्षण मिति राख्नुहोस्.."
                      placeholderTextColor={errors?.testDate ? 'red' : 'grey'}
                    />
                    <TouchableOpacity
                      style={{
                        alignSelf: 'center',
                        marginLeft: -4,
                        padding: 4,
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 6,
                        // marginTop: -8,
                      }}
                      onPress={() => setDatePickerVisibilitySoil(true)}>
                      <Image
                        source={require('../../../Assets/FarmImages/calendar1.png')}
                        style={{
                          width: 23,
                          height: 23,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  {datePickerVisibilitySoil && (
                    <DatePicker
                      setTestDate={setTestDate}
                      setDatePickerVisibilitySoil={setDatePickerVisibilitySoil}
                    />
                  )}
                </View>

                <TouchableOpacity style={styles.btnSave} onPress={onSubmit}>
                  <Text style={styles.btnTxt}>थप्नुहोस</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      </View>
    </>
  );
};

export default SoilTesting;

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
    width: width * 0.9,
    height: height * 0.65,
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
  btnSave: {
    width: width * 0.86,
    backgroundColor: 'green',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    marginBottom: 40,
    marginTop: 20,
  },
  btnTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
