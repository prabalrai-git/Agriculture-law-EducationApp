import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import React from 'react';
import {height, width} from '../../../../Common/WidthAndHeight';
import {FAB} from 'react-native-paper';
import {useState} from 'react';
import ImagePicker from '../../../../components/ImagePicker';
import {GetListOfQueryByUseridApi} from '../../../../Services/appServices/agricultureService';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';

const Queries = ({navigation}) => {
  const [modalVisibility, setModalVisiblity] = useState(false);
  const [queryList, setQueryList] = useState();
  const [reloadQueries, setReloadQueries] = useState(false);
  const [errors, setErrors] = useState({});

  // form states

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [imageValueQuery, setImageValueQuery] = useState();
  const [userCode, setUserCode] = useState();

  const checkValidation = (title, msg) => {
    setErrors(prev => ({...prev, [title]: msg}));
  };

  const validate = () => {
    let isValid = true;
    if (!title) {
      checkValidation('title', 'required');
      isValid = false;
    }
    if (!description) {
      checkValidation('description', 'required');
      isValid = false;
    }
    if (!imageValueQuery) {
      checkValidation('imageValueQuery', 'फोटो चयन गर्नुहोस्!');
      isValid = false;
    }
    return isValid;
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   console.log('log from imagevalue query', imageValueQuery);
  // }, [imageValueQuery]);

  useEffect(() => {
    const data = {
      userId: userCode,
    };

    GetListOfQueryByUseridApi(data, res => {
      // console.log(res, 'this get res');
      setQueryList(res);
    });
  }, [userCode, reloadQueries]);

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

  const data = [1, 3, 4];

  const onSubmit = async () => {
    // new service with image upload
    const validation = validate();

    if (validation) {
      var formData = new FormData();

      formData.append('qid', 0);
      formData.append('qtitle', title);
      formData.append('quserId', userCode);
      formData.append('qdescription', description);
      formData.append('filePath', {
        uri: imageValueQuery.uri,
        name: imageValueQuery.fileName,
        type: imageValueQuery.type,
      });
      // console.log(
      //   imageValueQuery.uri,
      //   imageValueQuery.fileName,
      //   imageValueQuery.type,
      // );

      try {
        // console.log(formData);
        const response = await axios.post(
          'https://lunivacare.ddns.net/Luniva360Agri/api/luniva360agriapp/InsertUpdateFarmersQueryWithImageFile',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        // console.log(response, '13122222223');
        if (response.data) {
          // console.log(response.data);
          clearAllState();
          setModalVisiblity(false);
          setReloadQueries(!reloadQueries);
          showMessage({
            message: 'सफल',
            description: 'जिज्ञासा पोस्ट गारीयो',
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
        } else {
          console.log('something went wrong');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const clearAllState = () => {
    setTitle();
    setDescription();
    setImageValueQuery();
  };
  const baseUrl = 'https://lunivacare.ddns.net/Luniva360Agri/';

  return (
    <>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisiblity(true)}
        label="नयाँ जिज्ञासा"
        color="white"
      />
      <Text
        style={{color: 'black', margin: 10, fontSize: 18, fontWeight: '500'}}>
        जिज्ञासाहरूको सूची:
      </Text>
      <ScrollView>
        <View style={{marginBottom: 60}}>
          {queryList?.map(item => {
            return (
              <View style={styles.mainContainer} key={item.QId}>
                <TouchableOpacity
                  style={styles.eachQuery}
                  onPress={() => {
                    // console.log(item);

                    navigation.navigate('Comments', {
                      Title: item.QTitle,
                      Description: item.QDescription,
                      ImagePath: item.FilePath,
                      QId: item.QId,
                      userCode: userCode,
                      CommentCount: item.CommentCount,
                    });
                  }}>
                  <View>
                    <Image
                      source={require('../../../../Assets/FarmImages/commentPlain.png')}
                      style={styles.img}
                    />
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                      marginLeft: 10,
                      flexDirection: 'column',
                      marginRight: 40,
                      //   flexWrap: 'wrap',
                    }}>
                    <Text style={styles.titleTxt}>{item.QTitle} </Text>
                    <Text style={styles.descTxt}>{item.QDescription}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibility}
        onRequestClose={() => {
          setModalVisiblity(false);
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
                जिज्ञासा राख्नुहोस्:
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
                  <Text style={styles.label}>शीर्षक:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        paddingTop: 10,
                        paddingRight: 0,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        width: width * 0.78,
                        borderColor: errors.title ? 'red' : 'black',
                      },
                    ]}
                    value={title}
                    onChangeText={text => setTitle(text)}
                    placeholder="शीर्षक राख्नुहोस्"
                    placeholderTextColor={
                      errors.title ? 'red' : 'grey'
                    }></TextInput>
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
                        borderColor: errors.description ? 'red' : 'black',
                        height: 90,
                        textAlignVertical: 'top',
                      },
                    ]}
                    multiline={true}
                    value={description}
                    onChangeText={text => setDescription(text)}
                    placeholder="वर्णन राख्नुहोस्..."
                    placeholderTextColor={
                      errors.description ? 'red' : 'grey'
                    }></TextInput>
                </View>
                <ImagePicker setImageValueQuery={setImageValueQuery} />
                {errors.imageValueQuery && (
                  <Text style={{color: 'red', fontSize: 12, marginLeft: 20}}>
                    {errors.imageValueQuery}
                  </Text>
                )}
              </View>

              <TouchableOpacity style={styles.btnSave} onPress={onSubmit}>
                <Text style={styles.btnTxt}>राख्नुहोस्</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Queries;

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
  mainContainer: {
    flexDirection: 'row',
  },
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
  },
  eachQuery: {
    backgroundColor: 'white',
    width: width * 0.95,
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: 10,
    marginTop: 0,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    padding: 15,
    borderRadius: 5,
    elevation: 3,
  },
  img: {
    width: 40,
    height: 40,
    tintColor: 'green',
  },
  titleTxt: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  descTxt: {
    color: 'black',
    textAlign: 'justify',
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
