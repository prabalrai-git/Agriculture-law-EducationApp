import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {
  GetKrishiSaleCommentBySaleIdApi,
  GetUserDetailsWithBajarItemBySaleIdApi,
  InsertUpdateSalesCommentApi,
} from '../../../Services/appServices/agricultureService';
import {useState} from 'react';
import {height, width} from '../../../Common/WidthAndHeight';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {log} from 'react-native-reanimated';
import {numberWithCommas} from '../../../Helpers/NumberToMoney';

const ItemFullDescription = ({route}) => {
  const [itemDetails, setItemDetails] = useState();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [comment, setComment] = useState();
  const [userCode, setUserCode] = useState();
  const [reload, setReload] = useState(false);
  const [commentList, setCommentList] = useState();

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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    const data = {
      krishiSaleId: route.params.krishiSaleId,
    };
    GetUserDetailsWithBajarItemBySaleIdApi(data, res => {
      setItemDetails(res[0]);
    });
  }, []);

  useEffect(() => {
    const data = {
      KrishiSaleId: route.params.krishiSaleId,
    };

    GetKrishiSaleCommentBySaleIdApi(data, res => {
      // console.log(res);
      setCommentList(res);
    });
  }, [reload]);

  const onSubmit = () => {
    const data = {
      CId: 0,
      KrishiSaleId: route.params.krishiSaleId,
      CommentBy: userCode,
      CommentDetails: comment,
      CommentDate: new Date(),
      CommentIsActive: true,
    };

    InsertUpdateSalesCommentApi(data, res => {
      if (res.SuccessMsg) {
        setComment();
        setReload(!reload);
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <View style={{flex: 1, backgroundColor: 'white', marginBottom: 90}}>
          <Image
            style={{
              width: width,
              height: height * 0.38,
              // marginLeft: 'auto',
              // marginRight: 'auto',
              // marginTop: 10,
              // marginBottom: 10,
              // figure out your image aspect ratio
              // aspectRatio: 2 / 1,
            }}
            resizeMode="stretch"
            // resizeMethod="scale"
            source={{
              uri:
                'https://lunivacare.ddns.net/Luniva360Agri' +
                itemDetails?.ImageFilePath,
            }}
            defaultSource={require('../../../Assets/FarmImages/fallbackMarket.jpg')}
          />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#006B05', 'lightgrey']}
            style={styles.linearGradient}>
            <View
              style={{
                width: width * 0.92,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={styles.Price}>
                  Rs. {numberWithCommas(itemDetails?.Price)}
                </Text>

                <Text style={styles.Quantity}>
                  मात्रा: {itemDetails?.Quantity}
                </Text>
              </View>
            </View>
          </LinearGradient>
          <View style={styles.descriptionContainer}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Avatar.Image
                size={50}
                source={require('../../../Assets/FarmImages/profile.jpeg')}
              />
              <View style={{alignSelf: 'center', marginLeft: 8}}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'justify',
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>
                  {itemDetails?.FullName}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'justify',
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>
                  {itemDetails?.MobileNo}
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: 'black',
                textAlign: 'justify',
                width: width * 0.95,
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: 15,

                fontWeight: '400',
              }}>
              {' '}
              {itemDetails?.ItemDescription}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.infoTag}>{itemDetails?.ItemType}</Text>
              <Text style={[styles.infoTag, {backgroundColor: '#4cbb17'}]}>
                {itemDetails?.ItemName}
              </Text>
            </View>
            <View
              style={{
                height: 0.55,
                backgroundColor: 'lightgrey',
                width: width * 0.95,
                marginVertical: 10,
              }}></View>

            <View
              style={{
                backgroundColor: '#F0F0F0',
                padding: 10,
                borderRadius: 6,
              }}>
              <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
                {route.params.bajartype
                  ? 'मागकर्ता जानकारी'
                  : 'उत्पादन जानकारी'}
                :
              </Text>

              {/* <Text
              style={{
                color: 'black',
                textAlign: 'justify',
                fontSize: 15,
                color: 'grey',
              }}>
              <Text style={{fontWeight: '400', color: 'grey'}}>प्रदेश: </Text>
              {itemDetails?.Province}
            </Text> */}
              <View style={{flexDirection: 'row', marginTop: 4}}>
                <Image
                  source={require('../../../Assets/FarmImages/district.png')}
                  style={{
                    // tintColor: 'green',
                    width: 14,
                    height: 14,
                    alignSelf: 'center',
                    marginRight: 6,
                  }}
                />

                <Text
                  style={{
                    color: 'black',
                    textAlign: 'justify',
                    fontWeight: '400',
                    fontSize: 15,
                    // color: 'grey',
                  }}>
                  <Text style={{fontWeight: '500', color: 'black'}}>
                    जिल्ला:{' '}
                  </Text>
                  {itemDetails?.District}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 4}}>
                <Image
                  source={require('../../../Assets/FarmImages/municipality.png')}
                  style={{
                    // tintColor: 'green',
                    width: 14,
                    height: 14,
                    alignSelf: 'center',
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'justify',
                    fontSize: 15,
                    fontWeight: '400',

                    // color: 'grey',
                  }}>
                  <Text style={{fontWeight: '500', color: 'black'}}>
                    नगरपालिका/ गाउँपालिका:{' '}
                  </Text>
                  {itemDetails?.VDCMun}
                </Text>
              </View>
              {/* <Text
              style={{
                color: 'black',
                textAlign: 'justify',
                fontSize: 15,
                color: 'grey',
              }}>
              <Text style={{fontWeight: '400', color: 'grey'}}>
                वार्ड नम्बर:{' '}
              </Text>
              {itemDetails?.WardNo}
            </Text> */}
              <View style={{flexDirection: 'row', marginTop: 4}}>
                <Image
                  source={require('../../../Assets/FarmImages/googleCalendar.png')}
                  style={{
                    // tintColor: 'green',
                    width: 14,
                    height: 14,
                    alignSelf: 'center',
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'justify',
                    fontSize: 15,
                    fontWeight: '400',

                    // color: 'grey',
                  }}>
                  <Text style={{fontWeight: '500', color: 'black'}}>
                    पोस्ट गरिएको मिति:{' '}
                  </Text>
                  {itemDetails?.PostedDate.split('T')[0]}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: width * 0.95,

              marginLeft: 'auto',
              marginRight: 'auto',

              // backgroundColor: 'red',
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisibility(true);
                // console.log('hello');
              }}
              style={{
                backgroundColor: '#F0F0F0',
                padding: 14,
                flexDirection: 'row',
                elevation: 2,
                borderRadius: 5,
              }}>
              <Image
                source={require('../../../Assets/FarmImages/commentPlain.png')}
                style={{
                  tintColor: 'green',
                  width: 20,
                  height: 20,
                  alignSelf: 'center',
                  marginRight: 10,
                }}
              />
              <Text style={{color: 'grey', fontSize: 14}}>
                {commentList?.length} कमेन्ट हेर्नुहोस्...
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibility}
        onRequestClose={() => {
          setModalVisibility(false);
        }}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}}>
          <View
            style={[
              styles.centeredView,
              {height: isKeyboardVisible ? height * 0.64 : height * 0.85},
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
                  fontSize: 18,
                  fontWeight: '500',
                  marginTop: 10,
                }}>
                कमेन्टहरू:
              </Text>
              <TouchableOpacity
                style={{paddingLeft: 10}}
                onPress={() => {
                  setModalVisibility(false);
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
              <View>
                <View style={styles.commentList}>
                  <View style={styles.insideComment}>
                    <ScrollView>
                      {commentList?.map(item => {
                        // console.log(commentList.Commentor);
                        return (
                          <TouchableOpacity
                            key={item.CId}
                            onPress={() => console.log(item)}>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginTop: 10,
                                paddingBottom: 20,
                                marginBottom: 5,
                                borderBottomColor: 'grey',
                                borderBottomWidth: 0.2,
                              }}
                              key={item}>
                              <View style={{}}>
                                <Avatar.Icon size={25} icon="account" />
                              </View>
                              <View
                                style={{
                                  //   alignSelf: 'center',
                                  marginLeft: 10,
                                  flexDirection: 'column',
                                  marginRight: 40,
                                  //   flexWrap: 'wrap',
                                }}>
                                <Text style={styles.titleTxt}>
                                  {item.Commentor}
                                </Text>
                                <Text style={styles.descTxt}>
                                  {item.CommentDetails}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </ScrollView>
            <KeyboardAvoidingView
              style={styles.addCommentContainer}
              // keyboardVerticalOffset={height + 47}
            >
              <Avatar.Icon size={30} icon="account" style={styles.avatar} />
              <TextInput
                style={styles.input}
                onChangeText={text => setComment(text)}
                value={comment}
                placeholder="कमेन्ट थप्नुहोस्..."
                placeholderTextColor={'grey'}></TextInput>
              {comment && (
                <TouchableOpacity
                  style={styles.sendImg}
                  onPress={() => {
                    Keyboard.dismiss();
                    onSubmit();
                  }}>
                  <Image
                    source={require('../../../Assets/FarmImages/sendmessage.png')}
                    style={{width: 25, height: 25}}></Image>
                </TouchableOpacity>
              )}
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ItemFullDescription;

const styles = StyleSheet.create({
  sendImg: {
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
    // backgroundColor: 'red',
    padding: 10,
  },
  addCommentContainer: {
    width: width * 0.93,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    elevation: 1,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  input: {
    height: 35,
    margin: 12,
    borderWidth: 0,
    width: width * 0.7,
    padding: 8,
    fontSize: 14,
    color: 'black',
  },
  titleTxt: {
    color: 'grey',
    fontSize: 12,
    fontWeight: '400',
    // alignSelf: 'center',
    // marginBottom: 2,
  },
  descTxt: {
    color: 'black',
    textAlign: 'justify',

    fontSize: 14,
  },
  avatar: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  commentList: {
    backgroundColor: 'white',
    marginTop: 10,
    width: width,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // padding: 10,
    elevation: 1,
    borderRadius: 5,
    height: height * 0.71,
  },
  insideComment: {
    width: width * 0.9,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: height * 0.7,
  },
  centeredView: {
    // flex: 1,
    width: width * 0.93,

    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 10,
  },
  Price: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    left: 0,
  },

  Quantity: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
    backgroundColor: '#01a16c',
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,

    // borderRadius: 5,
  },
  descriptionContainer: {
    backgroundColor: 'white',
    width: width,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 8,
    paddingTop: 0,
    paddingBottom: 30,
    // height: 500,
    borderRadius: 8,
    marginTop: 10,
  },
  infoTag: {
    backgroundColor: '#4cbb17',
    color: 'white',
    padding: 2,
    paddingHorizontal: 14,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 5,
    fontWeight: '600',
  },
});
