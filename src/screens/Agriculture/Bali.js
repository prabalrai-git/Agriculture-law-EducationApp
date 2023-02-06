import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FAB, Portal, Provider} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import DatePicker from '../../components/DatePicker';
import {
  GetAgriTypeApi,
  GetBreedOfAgroByAgroIdApi,
  GetListOfAgroProductByAgriTypeApi,
  InsertUpdateBaaliOfUserApi,
} from '../../Services/appServices/agricultureService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import BaliList from './BaliList';
import DropdownComponent from '../../Common/DropdownComponent';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Bali = ({route, navigation}) => {
  const {FarmId, FarmName} = route.params;

  // console.log('this is farm name', FarmName);

  const [state, setState] = React.useState({open: false});
  const [datePickerVisibilityStart, setDatePickerVisibilityStart] =
    useState(false);
  const [datePickerVisibilityEnd, setDatePickerVisibilityEnd] = useState(false);
  const [modalVisibility, setModalVisiblitiy] = useState(false);
  const [userCode, setUserCode] = useState();
  const [errors, setErrors] = useState({});
  const [reloadList, setReloadList] = useState(false);
  const [editingProduct, setEditingProduct] = useState();
  const [reloadForEdit, setReloadForEdit] = useState(false);
  const [editChecker, setEditChecker] = useState(false);

  // Dropdown state

  const [agriType, setAgriType] = useState();
  const [baliType, setBaliType] = useState();
  const [breedType, setBreedType] = useState();

  // Dropdown state on editingProduct

  // const [editAgriType, setEditAgriType] = useState();
  const [editBaliType, setEditBaliType] = useState();
  const [editBreedType, setEditBreedType] = useState();
  const [newState, setNewState] = useState([]);

  // form states
  const [farmTypeId, setFarmTypeId] = useState(); // As Bali prakar in the form
  const [cropId, setCropId] = useState();
  const [breedId, setBreedId] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  // edit states

  useEffect(() => {
    // console.log(editingProduct);

    if (editingProduct) {
      const Productdata = {
        agritypeId: editingProduct?.ProdFarmTypeID,
      };
      GetListOfAgroProductByAgriTypeApi(Productdata, res => {
        setEditBaliType();
        if (res?.length > 0) {
          const data = res.map(item => ({
            value: item.cropID,
            label: item.cropName,
          }));
          setEditBaliType(data);
          // console.log(data, 'this is bali type');
        }
      });
      const Breeddata = {
        BId: editingProduct?.ProdCropID,
      };
      GetBreedOfAgroByAgroIdApi(Breeddata, res => {
        setBreedType();
        if (res?.length > 0) {
          const data = res.map(item => ({
            value: item.BId,
            label: item.BreedType,
          }));
          setEditBreedType(data);
          // console.log(data, 'this is bree type');
        }
      });
    }
  }, [editingProduct]);

  const onStateChange = ({open}) => setState({open});
  const {open} = state;

  useEffect(() => {
    const data = {
      aId: 0,
    };

    GetAgriTypeApi(data, res => {
      // console.log(res.length, 'this is res');
      if (res.length > 0) {
        const data = res.map(item => ({
          value: item.CtypID,
          label: item.CTypName,
        }));
        setAgriType(data);
      }
    });
    getData();
  }, [modalVisibility]);

  const handleValidation = (errorText, inputFieldName) => {
    setErrors(preState => ({...preState, [inputFieldName]: errorText}));
  };

  const validate = () => {
    let isValid = true;
    if (!farmTypeId && !editingProduct) {
      handleValidation('बालीको प्रकार राख्नुहोस्', 'AgriType');
      isValid = false;
    }
    if (!cropId && !editingProduct) {
      handleValidation('बालीको नाम राख्नुहोस्', 'AgriName');
      isValid = false;
    }
    if (!breedId && !editingProduct) {
      handleValidation('बालीको जाति छान्नुहोस्', 'AgriBreed');
      isValid = false;
    }
    if (!endDate && !editingProduct) {
      handleValidation('मिति राख्नुहोस्', 'AgriDate');
      isValid = false;
    }

    return isValid;
  };

  const onSelectAgriType = text => {
    setFarmTypeId(text?.value);
    const data = {
      agritypeId: text?.value,
    };
    GetListOfAgroProductByAgriTypeApi(data, res => {
      setBaliType();
      if (res?.length > 0) {
        const data = res.map(item => ({
          value: item.cropID,
          label: item.cropName,
        }));
        // console.log(data, 'this ist he agri type');
        setBaliType(data);
      }
    });
  };

  const onSelectBaliType = text => {
    setCropId(text?.value);
    const data = {
      BId: text?.value,
    };
    GetBreedOfAgroByAgroIdApi(data, res => {
      setBreedType();
      if (res?.length > 0) {
        const data = res.map(item => ({
          value: item.BId,
          label: item.BreedType,
        }));
        setBreedType(data);
        // console.log(data, 'this is the data');
      }
    });
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

  // useEffect(() => {
  //   console.log(
  //     editBreedType,
  //     'editBalitType1111111111111111111111111111111111111111',
  //     editBaliType,
  //     'Theses are edit b ali type and breed ttpevcxvxcvxcvx',
  //     newState,
  //   );
  // }, [modalVisibility]);

  const onSelectAgriTypeForEdit = editingProduct => {
    const data = {
      agritypeId: editingProduct?.ProdFarmTypeID,
    };
    GetListOfAgroProductByAgriTypeApi(data, res => {
      setEditBaliType();
      if (res?.length > 0) {
        const data = res.map(item => ({
          value: item.cropID,
          label: item.cropName,
        }));
        setEditBaliType(data);
      }
    });
  };
  const onSelectBaliTypeForEdit = editingProduct => {
    // console.log(editingProduct, 'editingProduct form the function');
    const data = {
      BId: editingProduct?.ProdCropID,
    };
    // console.log('this is BId', data);
    GetBreedOfAgroByAgroIdApi(data, res => {
      // setEditBreedType();
      // console.log(res, 'resssss form the function');
      if (res?.length > 0) {
        const data = res.map(item => ({
          value: item.BId,
          label: item.BreedType,
        }));
        // console.log(data, 'data form teh function............');
        setEditBreedType(data);
        setNewState(data);
      }
    });
  };

  useEffect(() => {
    // onSelectBaliTypeForEdit(editingProduct);
    // onSelectAgriTypeForEdit(editingProduct);
    // console.log(editingProduct, 'This is the editing product details');
  }, [reloadForEdit]);

  // post the from data

  const onSubmit = () => {
    let isValidated = validate();
    const data = {
      prodId: editingProduct ? editingProduct.ProdID : 0,
      prodFarmID: editingProduct ? editingProduct.ProdFarmID : FarmId,
      prodCropID: editingProduct ? editingProduct.ProdCropID : cropId,
      prodFarmTypeId: editingProduct
        ? editingProduct.ProdFarmTypeID
        : farmTypeId,
      prodStartDate: editingProduct
        ? editingProduct.ProdStartDate
        : new Date().toDateString(),
      prodEndDate: editingProduct
        ? editingProduct.ProdEndDate
        : endDate?.toDateString(),
      prodStatus: editingProduct ? editingProduct.ProdStatus : 7,
      SqId: 8,
      BreedId: editingProduct ? editingProduct.BreedId : breedId,
      PuserId: editingProduct ? editingProduct.Puserid : userCode,
      IsDeleted: false,
    };

    // console.log(data, 'editingData');
    if (isValidated) {
      InsertUpdateBaaliOfUserApi(data, res => {
        if (res.SuccessMsg === true) {
          setReloadList(!reloadList);
          setEditingProduct();
          setEditBaliType();
          setEditBreedType();
          setBreedId();
          setCropId();
          setEndDate();
          setAgriType();
          setFarmTypeId();
          setErrors({});
          setEditChecker(false);
          showMessage({
            message: 'सफल',
            description: 'नयाँ बाली थपिएको छ',
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
          setModalVisiblitiy(false);
        }
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <Provider>
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
            marginTop: 0,
            fontSize: 18,
            fontWeight: '500',
          }}>
          थपिएको बालीहरु:
        </Text>
        <ScrollView>
          <BaliList
            FarmId={FarmId}
            reloadList={reloadList}
            setModalVisiblitiy={setModalVisiblitiy}
            setEditingProduct={setEditingProduct}
            setReloadForEdit={setReloadForEdit}
            reloadForEdit={reloadForEdit}
            setEditChecker={setEditChecker}
            FarmName={FarmName}
          />
        </ScrollView>

        <View
          style={{
            position: 'absolute',

            right: 0,
            bottom: 0,
            zIndex: 10,
            margin: 0,
            padding: 0,
          }}>
          <Portal>
            <FAB.Group
              fabStyle={{
                backgroundColor: '#4cbb17',
              }}
              open={open}
              visible
              backdropColor="rgba(0,0,0,0.3)"
              icon={open ? 'close' : 'menu'}
              actions={[
                {
                  icon: 'plus',
                  color: 'white',
                  style: {backgroundColor: 'green'},
                  labelTextColor: 'white',
                  label: 'नयाँ बलि',
                  onPress: () => setModalVisiblitiy(true),
                },
                {
                  icon: 'test-tube',
                  style: {backgroundColor: 'green'},

                  label: 'माटो परीक्षण',
                  color: 'white',
                  labelTextColor: 'white',

                  onPress: () =>
                    navigation.navigate('SoilTesting', {
                      FarmId: FarmId,
                      FarmName: FarmName,
                    }),
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
        </View>
      </Provider>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibility}>
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
                  {editingProduct ? 'बलि सम्पादन' : 'बलि थप्नुहोस्:'}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisiblitiy(false);
                    setErrors({});
                    setEditingProduct();
                    setEditChecker(false);
                    setEditBaliType();
                    setEditBreedType();
                    setAgriType();
                  }}>
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
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.label}>बलिको प्रकार:</Text>
                    <View style={[Platform.select({android: {zIndex: 10}})]}>
                      {/* <AutocompleteDropdown
                        onSelectItem={text => onSelectAgriType(text)}
                        initialValue={{
                          id: editingProduct
                            ? editingProduct.ProdFarmTypeID
                            : '',
                        }}
                        dataSet={agriType}
                        textInputProps={{
                          style: {
                            color: 'black',
                            paddingLeft: 18,

                            // borderRadius: 10,
                          },
                        }}
                        containerStyle={{
                          width: width * 0.78,
                          marginLeft: 8,
                          marginTop: 6,
                          borderWidth: 0.7,
                          borderColor: 'black',
                          borderRadius: 6,
                        }}
                      /> */}
                      <DropdownComponent
                        agriType={agriType}
                        onSelectAgriType={onSelectAgriType}
                        editingProduct={editingProduct}
                        setEditingProduct={setEditingProduct}
                      />

                      {errors.AgriType && (
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 10,
                            marginLeft: 15,
                            marginBottom: 5,
                          }}>
                          {errors.AgriType}
                        </Text>
                      )}
                    </View>
                  </View>

                  <Text style={styles.label}>बलिको नाम:</Text>
                  <View style={[Platform.select({android: {zIndex: 7}})]}>
                    {/* <AutocompleteDropdown
                      onSelectItem={text => onSelectBaliType(text)}
                      initialValue={{
                        id: editingProduct ? 1 : '',
                      }}
                      dataSet={editBaliType ? editBaliType : baliType}
                      textInputProps={{
                        style: {
                          color: 'black',
                          paddingLeft: 18,

                          // borderRadius: 10,
                        },
                      }}
                      containerStyle={{
                        width: width * 0.78,
                        marginLeft: 8,
                        marginTop: 6,
                        borderWidth: 0.7,
                        borderColor: 'black',
                        borderRadius: 6,
                      }}
                    /> */}
                    <DropdownComponent
                      baliType={baliType}
                      onSelectBaliType={onSelectBaliType}
                      editingProduct={editingProduct}
                      setEditingProduct={setEditingProduct}
                      editBaliType={editBaliType}
                      editChecker={editChecker}
                    />
                    {errors.AgriName && (
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 10,
                          marginLeft: 15,
                          marginBottom: 5,
                        }}>
                        {errors.AgriName}
                      </Text>
                    )}
                  </View>
                  <Text style={styles.label}>बलिको जाति:</Text>
                  <View style={[Platform.select({android: {zIndex: 6}})]}>
                    {/* <AutocompleteDropdown
                      onSelectItem={text => setBreedId(text?.id)}
                      initialValue={{
                        id: editingProduct ? editingProduct.BreedId : '',
                      }}
                      dataSet={editBreedType ? editBreedType : breedType}
                      textInputProps={{
                        style: {
                          color: 'black',
                          paddingLeft: 18,

                          // borderRadius: 10,
                        },
                      }}
                      containerStyle={{
                        width: width * 0.78,
                        marginLeft: 8,
                        marginTop: 6,
                        borderWidth: 0.7,
                        borderColor: 'black',
                        borderRadius: 6,
                      }}
                    /> */}
                    <DropdownComponent
                      breedType={breedType}
                      editingProduct={editingProduct}
                      setEditingProduct={setEditingProduct}
                      editBreedType={editBreedType}
                      setBreedId={setBreedId}
                      editChecker={editChecker}
                    />
                    {errors.AgriBreed && (
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 10,
                          marginLeft: 15,
                          marginBottom: 5,
                        }}>
                        {errors.AgriBreed}
                      </Text>
                    )}
                  </View>
                  {/* <Text style={styles.label}>उत्पादन सुरु मिति:</Text>
                  <View style={{width: width * 0.84, flexDirection: 'row'}}>
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
                          width: width * 0.69,
                          borderColor: 'black',
                        },
                      ]}
                      value={startDate?.toString()}
                      placeholder="उत्पादन सुरु मिति राख्नुहोस्"
                      placeholderTextColor="grey"
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
                      onPress={() => setDatePickerVisibilityStart(true)}>
                      <Image
                        source={require('../../Assets/FarmImages/calendar1.png')}
                        style={{
                          width: 23,
                          height: 23,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  {datePickerVisibilityStart && (
                    <DatePicker
                      setStartDate={setStartDate}
                      setDatePickerVisibilityStart={
                        setDatePickerVisibilityStart
                      }
                    />
                  )} */}
                  <Text style={styles.label}>उत्पादन समाप्ति मिति:</Text>
                  <View style={{width: width * 0.84, flexDirection: 'row'}}>
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
                          width: width * 0.7,
                          borderColor: 'black',
                          marginLeft: -1,
                        },
                      ]}
                      value={
                        editingProduct
                          ? editingProduct.ProdEndDate
                          : endDate?.toDateString()
                      }
                      placeholder="उत्पादन समाप्ति मिति राख्नुहोस्"
                      placeholderTextColor="grey"
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
                      onPress={() => setDatePickerVisibilityEnd(true)}>
                      <Image
                        source={require('../../Assets/FarmImages/calendar1.png')}
                        style={{
                          width: 23,
                          height: 23,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  {datePickerVisibilityEnd && (
                    <DatePicker
                      editingProduct={editingProduct}
                      setEditingProduct={setEditingProduct}
                      setEndDate={editingProduct ? null : setEndDate}
                      setDatePickerVisibilityEnd={setDatePickerVisibilityEnd}
                    />
                  )}
                  {errors.AgriDate && (
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 10,
                        marginLeft: 15,
                        marginBottom: 5,
                      }}>
                      {errors.AgriDate}
                    </Text>
                  )}
                </View>

                <TouchableOpacity style={styles.btnSave} onPress={onSubmit}>
                  <Text style={styles.btnTxt}>
                    {editingProduct ? 'सम्पादन' : 'थप्नुहोस'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Bali;

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
    width: width * 0.85,
    height: height * 0.55,
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
    fontWeight: 'bold',
  },
  actionIconContainer: {
    flexDirection: 'row',
  },
});
