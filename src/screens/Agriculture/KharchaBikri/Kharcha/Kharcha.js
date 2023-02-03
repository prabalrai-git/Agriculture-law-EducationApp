import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect} from 'react';
import {FAB, Portal, Provider} from 'react-native-paper';
import {useState} from 'react';
import KharchList from './KharchList';
import DatePicker from '../../../../components/DatePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GetAgroKharchHeadByAgriTypeApi,
  InsertUpdateBaaliKharchaApi,
} from '../../../../Services/appServices/agricultureService';
import {Dropdown} from 'react-native-element-dropdown';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Kharcha = ({route}) => {
  const {ProdCropID, baaliId} = route.params;

  // console.log(ProdFarmID, 'hey oh');
  // const {ProdCropID, ProdFarmID} = route.params;
  const [modalVisibility, setModalVisiblity] = useState(false);
  const [dateVisibilityKharcha, setDateVisibilityKharcha] = useState(false);
  const [userCode, setUserCode] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [expenseList, setExpenseList] = useState();

  // form states
  const [expenseTitle, setExpenseTitle] = useState();
  const [quantity, setQuantity] = useState();
  const [unit, setUnit] = useState();
  const [rate, setRate] = useState();
  const [entryDateKharcha, setEntryDateKharcha] = useState();
  const [reload, setReload] = useState(false);
  const [state, setState] = useState({open: false});
  const onStateChange = ({open}) => setState({open});
  const {open} = state;

  useEffect(() => {
    getData();

    let data = {
      typeId: 1,
    };
    GetAgroKharchHeadByAgriTypeApi(data, res => {
      if (res?.length > 0) {
        const data = res.map(item => ({
          value: item.KharchaId,
          label: item.KharchaHead,
        }));
        setExpenseList(data);
      }
    });
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

  const clearAllState = () => {
    setEntryDateKharcha();
    setExpenseTitle();
    setUnit();
    setRate();
    setQuantity();
  };

  const OnSubmit = () => {
    let data = {
      FarmKharchaId: 0,
      FarmuserId: userCode,
      FarmProdId: ProdCropID,
      AgroKharchaHeadId: expenseTitle,
      ResourceAmount: quantity,
      ResourceRate: rate,
      TotalCost: quantity * rate,
      KharchaDate: entryDateKharcha,
      KharchaNepaliDate: entryDateKharcha,
      ProdOrSale: 10,
      SqId: 11,
      KUnit: unit,
      IsDeleted: false,
    };

    // console.log(data);

    InsertUpdateBaaliKharchaApi(data, res => {
      // console.log(res);
      if (res.SuccessMsg) {
        clearAllState();
        setModalVisiblity(false);
        setReload(!reload);

        showMessage({
          message: 'सफल',
          description: 'नयाँ खर्च थपिएको छ',
          type: 'success',
          color: 'white',
          position: 'bottom',
          statusBarHeight: 40,
          style: {height: 81},
          icon: props => (
            <Image
              source={require('../../../../Assets/flashMessage/check.png')}
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
    });
  };

  return (
    <View style={{flex: 1}}>
      <Provider>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            margin: 10,
            fontWeight: '500',
            marginBottom: 0,
          }}>
          खर्च सूची:
        </Text>
        <ScrollView>
          <KharchList
            ProdCropID={ProdCropID}
            baaliId={baaliId}
            reload={reload}
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
                  label: 'खर्च थप्नुहोस्',
                  onPress: () => setModalVisiblity(true),
                },
                {
                  icon: 'notebook-multiple',
                  style: {backgroundColor: 'green'},

                  label: 'रिपोर्टहरू',
                  color: 'white',
                  labelTextColor: 'white',

                  onPress: () => console.log('hello'),
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
                  खर्च थप्नुहोस्:
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisiblity(false);
                    clearAllState();
                  }}>
                  <Image
                    source={require('../../../../Assets/FarmImages/close.png')}
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
                    <Text style={styles.label}>खर्च शीर्षक:</Text>
                    <Dropdown
                      style={{
                        width: width * 0.79,
                        margin: 6,
                        marginTop: 8,
                        borderColor: 'black',
                        borderWidth: 0.6,
                        borderRadius: 5,
                        height: 40,
                      }}
                      placeholderStyle={{
                        color: 'grey',
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
                      data={expenseList}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? 'चयन गर्नुहोस्' : '...'}
                      searchPlaceholder="खोज्नुहोस्..."
                      value={'hello'}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setExpenseTitle(item.value);
                        setIsFocus(false);
                      }}
                    />
                    {/* <TextInput
                      style={[
                        styles.input,
                        {
                          paddingTop: 10,
                          paddingRight: 0,
                          paddingBottom: 10,
                          paddingLeft: 10,
                          width: width * 0.78,
                          borderColor: 'black',
                        },
                      ]}
                      onChangeText={text => setExpenseTitle(text)}
                      value={expenseTitle}
                      placeholder="खर्च शीर्षक राख्नुहोस्"
                      placeholderTextColor="grey"></TextInput> */}
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Text style={styles.label}>संख्या:</Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            paddingTop: 10,
                            paddingRight: 0,
                            paddingBottom: 10,
                            paddingLeft: 10,
                            width: width * 0.37,
                            borderColor: 'black',
                          },
                        ]}
                        value={quantity}
                        onChangeText={text => setQuantity(text)}
                        keyboardType="numeric"
                        placeholder="संख्या राख्नुहोस्"
                        placeholderTextColor="grey"></TextInput>
                    </View>
                    <View>
                      <Text style={styles.label}>एकाइ:</Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            paddingTop: 10,
                            paddingRight: 0,
                            paddingBottom: 10,
                            paddingLeft: 10,
                            width: width * 0.37,
                            borderColor: 'black',
                          },
                        ]}
                        value={unit}
                        onChangeText={text => setUnit(text)}
                        placeholder="एकाइ राख्नुहोस्"
                        placeholderTextColor="grey"></TextInput>
                    </View>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.label}>दर:</Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          paddingTop: 10,
                          paddingRight: 0,
                          paddingBottom: 10,
                          paddingLeft: 10,
                          width: width * 0.78,
                          borderColor: 'black',
                        },
                      ]}
                      value={rate}
                      onChangeText={text => setRate(text)}
                      placeholder="दर राख्नुहोस्"
                      keyboardType="numeric"
                      placeholderTextColor="grey"></TextInput>
                  </View>

                  <Text style={styles.label}>मिति:</Text>
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
                      value={entryDateKharcha?.toDateString()}
                      onChangeText={text => setEntryDateKharcha(text)}
                      placeholder="मिति राख्नुहोस्"
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
                      onPress={() => setDateVisibilityKharcha(true)}>
                      <Image
                        source={require('../../../../Assets/FarmImages/calendar1.png')}
                        style={{
                          width: 23,
                          height: 23,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  {dateVisibilityKharcha && (
                    <DatePicker
                      setEntryDateKharcha={setEntryDateKharcha}
                      setDateVisibilityKharcha={setDateVisibilityKharcha}
                    />
                  )}
                </View>

                <TouchableOpacity style={styles.btnSave} onPress={OnSubmit}>
                  <Text style={styles.btnTxt}>थप्नुहोस</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Kharcha;
const styles = StyleSheet.create({
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
  label: {
    color: 'black',
    marginLeft: 12,
    fontWeight: '600',
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
  btnTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
