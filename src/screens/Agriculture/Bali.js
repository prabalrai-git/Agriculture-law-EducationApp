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
import React, {useState} from 'react';
import {FAB, Portal, Provider} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import DatePicker from '../../components/DatePicker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Bali = () => {
  const [state, setState] = React.useState({open: false});
  const [DOB, setDOB] = useState(null);
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);
  const [modalVisibility, setModalVisiblitiy] = useState(false);

  const onStateChange = ({open}) => setState({open});

  const {open} = state;
  return (
    <View style={{flex: 1}}>
      <Provider>
        <Text
          style={{color: 'black', margin: 10, fontSize: 18, fontWeight: '500'}}>
          थपिएको बलिहारु:
        </Text>
        <Portal>
          <FAB.Group
            fabStyle={{backgroundColor: '#4cbb17'}}
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

                onPress: () => console.log('Pressed star'),
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
      </Provider>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibility}
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
                  बलि थप्नुहोस्:
                </Text>
                <TouchableOpacity onPress={() => setModalVisiblitiy(false)}>
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
                    <View style={[Platform.select({android: {zIndex: 7}})]}>
                      <AutocompleteDropdown
                        onSelectItem={text => console.log(text)}
                        initialValue={{
                          id: 1,
                        }}
                        dataSet={[
                          {id: 1, title: 'agri'},
                          {id: 2, title: 'animals'},
                        ]}
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
                      />
                    </View>
                  </View>
                  <Text style={styles.label}>बलिको नाम:</Text>
                  <TextInput
                    style={[styles.input]}
                    onChangeText={text =>
                      editingFarm
                        ? setEditingFarm(prev => {
                            return {...prev, frmName: text};
                          })
                        : setFieldName(text)
                    }
                    value={'hello'}
                    placeholder="खेतको नाम राख्नुहोस्"
                    placeholderTextColor="grey"
                  />
                  <Text style={styles.label}>बलिको जाति:</Text>
                  <TextInput
                    style={[styles.input]}
                    onChangeText={text =>
                      editingFarm
                        ? setEditingFarm(prev => {
                            return {...prev, frmName: text};
                          })
                        : setFieldName(text)
                    }
                    value={'hello'}
                    placeholder="खेतको नाम राख्नुहोस्"
                    placeholderTextColor="grey"
                  />
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
                      value={DOB?.toString()}
                      placeholder="जन्ममिति राख्नुहोस्"
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
                      onPress={() => setDatePickerVisibility(true)}>
                      <Image
                        source={require('../../Assets/FarmImages/calendar1.png')}
                        style={{
                          width: 23,
                          height: 23,
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
                </View>

                <TouchableOpacity style={styles.btnSave}>
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
