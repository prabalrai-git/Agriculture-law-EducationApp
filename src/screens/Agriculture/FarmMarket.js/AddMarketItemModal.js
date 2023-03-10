import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React from 'react';
import {width} from '../../../Common/WidthAndHeight';
import ImagePicker from '../../../components/ImagePicker';
import {useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {useState} from 'react';
import {
  GetBajarItemByTypeIdApi,
  GetBajarItemTypeApi,
} from '../../../Services/appServices/agricultureService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

const AddMarketItemModal = ({
  setModalVisiblity,
  modalVisibility,
  setReload,
  reload,
  bajartype,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const [itemTypeList, setItemTypeList] = useState();
  const [itemIdList, setItemIdList] = useState();

  // form states

  const [itemType, setItemType] = useState();
  const [item, setItem] = useState();
  const [quantity, setQuantity] = useState();
  const [lowerPrice, setLowerPrice] = useState();
  const [description, setDescription] = useState();
  const [imageKrishiBazzar, setImageKrishiBazzar] = useState();
  const [unit, setUnit] = useState();
  const [upperPrice, setUpperPrice] = useState();
  const [userCode, setUserCode] = useState();

  const [errors, setErrors] = useState({});

  const handleValidation = (fieldName, error) => {
    setErrors(prevState => ({...prevState, [fieldName]: error}));
  };

  const validate = () => {
    let isValid = true;
    if (!itemType) {
      handleValidation('itemType', 'enter field name');
      isValid = false;
    }
    if (!item) {
      handleValidation('item', 'enter item name');
      isValid = false;
    }
    if (!quantity) {
      handleValidation('quantity', 'enter quantity');
      isValid = false;
    }
    if (!lowerPrice) {
      handleValidation('lowerPrice', 'enter price');
      isValid = false;
    }
    if (!description) {
      handleValidation('description', 'enter description');
      isValid = false;
    }
    if (!unit) {
      handleValidation('unit', 'enter description');
      isValid = false;
    }
    if (!upperPrice) {
      handleValidation('upperPrice', 'enter description');
      isValid = false;
    }
    if (!bajartype && !imageKrishiBazzar) {
      handleValidation('image', '???????????? ????????? ???????????????????????????!');
      isValid = false;
    }
    return isValid;
  };

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

  // useEffect(() => {
  //   console.log(imageKrishiBazzar);
  // }, [imageKrishiBazzar]);

  useEffect(() => {
    GetBajarItemTypeApi(res => {
      const data = res.map(item => ({label: item.ItemType, value: item.TId}));
      setItemTypeList(data);
    });
  }, []);

  useEffect(() => {
    const data = {
      typeId: itemType?.value,
    };

    setItemIdList();

    GetBajarItemByTypeIdApi(data, res => {
      if (res.length > 0) {
        const data = res.map(item => ({
          label: item.ItemName,
          value: item.TId,
        }));
        setItemIdList(data);
      }
    });
  }, [itemType]);

  const clearAllState = () => {
    setDescription();
    setItemType();
    setItem();
    setLowerPrice();
    setUpperPrice();
    setUnit();
    setQuantity();
    setImageKrishiBazzar();
    setErrors({});
  };

  const onSubmit = async () => {
    // new service with image upload

    const imagePath =
      'https://lunivacare.ddns.net/Luniva360Agri//KrishiBajar/49d10767-31e1-48cf-9438-d27d76199f71/49d10767-31e1-48cf-9438-d27d76199f71_22022023134039.jpg';
    const validation = validate();

    if (validation) {
      var formData = new FormData();
      formData.append('kid', 0);
      formData.append('itemtype', itemType?.value);
      formData.append('itemid', item?.value);
      formData.append('quantity', quantity);
      formData.append('price', lowerPrice);
      formData.append('itemdescription', description?.trim());
      formData.append('userid', userCode);
      formData.append('isactive', true);
      formData.append('issold', true);
      formData.append('imagefilepath', {
        uri: imageKrishiBazzar ? imageKrishiBazzar.uri : imagePath,
        name: imageKrishiBazzar ? imageKrishiBazzar.fileName : 'image.jpg',
        type: imageKrishiBazzar ? imageKrishiBazzar.type : 'image/jpeg',
      });
      formData.append('upperprice', 5000);
      formData.append('unit', 'per kg');
      formData.append('bajratype', bajartype ? 2 : 1);

      // console.log(imageKrishiBazzar);
      // console.log(
      //   imageValueQuery.uri,
      //   imageValueQuery.fileName,
      //   imageValueQuery.type,
      // );
      // console.log(validation);

      console.log(formData);

      try {
        const response = await axios.post(
          'https://lunivacare.ddns.net/Luniva360Agri/api/luniva360agriapp/InsertUpdateKrishiBajarItemsQueryWithImageFile',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        // console.log(response, '13122222223');
        if (response.data) {
          console.log(response.data, 'this the response');
          clearAllState();
          setModalVisiblity(false);
          setReload(!reload);
          showMessage({
            message: '?????????',
            description: bajartype ? '????????? ?????????????????? ???' : '????????????????????? ?????????????????? ?????????????????? ???',
            type: 'success',
            color: 'white',
            position: 'bottom',
            statusBarHeight: 40,
            style: {height: 81},
            icon: props => (
              <Image
                source={require('../../../Assets/flashMessage/check.png')}
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
          //  setReloadQueries(!reloadQueries);
        } else {
          console.log('something went wrong');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisibility}
      onRequestClose={() => setModalVisiblity(false)}>
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
              {bajartype ? '????????? ???????????????????????????' : '????????????????????? ???????????????????????????'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                clearAllState();
                setModalVisiblity(false);
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
                width: width * 0.8,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.label}>????????????????????? ?????? ??????????????????:</Text>
                <Dropdown
                  style={{
                    width: width * 0.79,
                    margin: 6,
                    marginTop: 8,
                    borderColor: errors.itemType ? 'red' : 'black',
                    borderWidth: 0.6,
                    borderRadius: 5,
                    height: 40,
                  }}
                  placeholderStyle={{
                    color: errors.itemType ? 'red' : 'grey',
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
                  data={itemTypeList}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? '????????? ???????????????????????????' : '...'}
                  searchPlaceholder="??????????????? ??????????????????????????????..."
                  value={'hello'}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setItemType(item);
                  }}
                />
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.label}>?????????????????????:</Text>
                <Dropdown
                  style={{
                    width: width * 0.79,
                    margin: 6,
                    marginTop: 8,
                    borderColor: errors.item ? 'red' : 'black',
                    borderWidth: 0.6,
                    borderRadius: 5,
                    height: 40,
                  }}
                  placeholderStyle={{
                    color: errors.item ? 'red' : 'grey',
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
                  data={itemIdList}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? '????????? ???????????????????????????' : '...'}
                  searchPlaceholder="??????????????? ??????????????????????????????..."
                  value={'hello'}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setItem(item);
                  }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.label}>??????????????????:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        paddingTop: 10,
                        paddingRight: 0,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        width: width * 0.366,
                        borderColor: errors.quantity ? 'red' : 'black',
                      },
                    ]}
                    value={quantity}
                    keyboardType="numeric"
                    onChangeText={text => setQuantity(text)}
                    placeholder="?????????????????? ??????????????????????????????"
                    placeholderTextColor={
                      errors.quantity ? 'red' : 'grey'
                    }></TextInput>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.label}>????????????:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        paddingTop: 10,
                        paddingRight: 0,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        width: width * 0.366,
                        borderColor: errors.unit ? 'red' : 'black',
                      },
                    ]}
                    value={unit}
                    onChangeText={text => setUnit(text)}
                    placeholder="???????????? ??????????????????????????????"
                    placeholderTextColor={
                      errors.unit ? 'red' : 'grey'
                    }></TextInput>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.label}>??????????????? ???????????????:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        paddingTop: 10,
                        paddingRight: 0,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        width: width * 0.366,
                        borderColor: errors.lowerPrice ? 'red' : 'black',
                      },
                    ]}
                    value={lowerPrice}
                    keyboardType="numeric"
                    onChangeText={text => setLowerPrice(text)}
                    placeholder="??????????????? ??????????????? ??????????????????????????????"
                    placeholderTextColor={
                      errors.lowerPrice ? 'red' : 'grey'
                    }></TextInput>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.label}>???????????????????????? ???????????????:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        paddingTop: 10,
                        paddingRight: 0,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        width: width * 0.366,
                        borderColor: errors.upperPrice ? 'red' : 'black',
                      },
                    ]}
                    value={upperPrice}
                    keyboardType="numeric"
                    onChangeText={text => setUpperPrice(text)}
                    placeholder="???????????????????????? ??????????????? ??????????????????????????????"
                    placeholderTextColor={
                      errors.upperPrice ? 'red' : 'grey'
                    }></TextInput>
                </View>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.label}>???????????????:</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      paddingTop: 10,
                      paddingRight: 10,
                      paddingBottom: 10,
                      paddingLeft: 10,
                      width: width * 0.78,
                      borderColor: errors.description ? 'red' : 'black',
                      height: 90,
                      textAlignVertical: 'top',
                    },
                  ]}
                  multiline={true}
                  value={description}
                  onChangeText={text => setDescription(text)}
                  placeholder="??????????????? ??????????????????????????????..."
                  placeholderTextColor={
                    errors.description ? 'red' : 'grey'
                  }></TextInput>
              </View>
              <ImagePicker setImageKrishiBazzar={setImageKrishiBazzar} />
              {errors.image && (
                <Text style={{color: 'red', fontSize: 12, marginLeft: 20}}>
                  {errors.image}
                </Text>
              )}
            </View>

            <TouchableOpacity style={styles.btnSave} onPress={() => onSubmit()}>
              <Text style={styles.btnTxt}>???????????????????????????</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddMarketItemModal;

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    width: width * 0.85,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 10,
    zIndex: 100,
  },
  label: {
    color: 'black',
    marginLeft: 12,
    fontWeight: '500',
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
