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

const AddMarketItemModal = ({
  setModalVisiblity,
  modalVisibility,
  itemTypeList,
  itemIdList,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisibility}>
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
              उत्पादन थप्नुहोस्:
            </Text>
            <TouchableOpacity
              onPress={() => {
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
                <Text style={styles.label}>उत्पादन को प्रकार:</Text>
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
                  data={itemTypeList}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'चयन गर्नुहोस्' : '...'}
                  searchPlaceholder="कृपया खोज्नुहोस्..."
                  value={'hello'}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    console.log(item);
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
                  value={'yo'}
                  onChangeText={text => console.log(text)}
                  placeholder="शीर्षक राख्नुहोस्"
                  placeholderTextColor="grey"></TextInput> */}
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.label}>उत्पादन:</Text>
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
                  data={itemIdList}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'चयन गर्नुहोस्' : '...'}
                  searchPlaceholder="कृपया खोज्नुहोस्..."
                  value={'hello'}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    console.log(item);
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
                  value={'yo'}
                  onChangeText={text => console.log(text)}
                  placeholder="शीर्षक राख्नुहोस्"
                  placeholderTextColor="grey"></TextInput> */}
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.label}>मात्रा:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        paddingTop: 10,
                        paddingRight: 0,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        width: width * 0.366,
                        borderColor: 'black',
                      },
                    ]}
                    value={'yo'}
                    keyboardType="numeric"
                    onChangeText={text => console.log(text)}
                    placeholder="शीर्षक राख्नुहोस्"
                    placeholderTextColor="grey"></TextInput>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.label}>मूल्य:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        paddingTop: 10,
                        paddingRight: 0,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        width: width * 0.366,
                        borderColor: 'black',
                      },
                    ]}
                    value={'yo'}
                    onChangeText={text => console.log(text)}
                    placeholder="शीर्षक राख्नुहोस्"
                    placeholderTextColor="grey"></TextInput>
                </View>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.label}>वर्णन:</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      paddingTop: 10,
                      paddingRight: 10,
                      paddingBottom: 10,
                      paddingLeft: 10,
                      width: width * 0.78,
                      borderColor: 'black',
                      height: 90,
                      textAlignVertical: 'top',
                    },
                  ]}
                  multiline={true}
                  value={'yo'}
                  onChangeText={text => console.log(text)}
                  placeholder="वर्णन राख्नुहोस्..."
                  placeholderTextColor="grey"></TextInput>
              </View>
              <ImagePicker />
            </View>

            <TouchableOpacity
              style={styles.btnSave}
              onPress={() => console.log('hello')}>
              <Text style={styles.btnTxt}>थप्नुहोस्</Text>
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
