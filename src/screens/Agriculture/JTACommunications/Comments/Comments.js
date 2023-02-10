import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import {height, width} from '../../../../Common/WidthAndHeight';
import {Avatar} from 'react-native-paper';
import {useState} from 'react';
import {useEffect} from 'react';
import {
  GetListOfCommentsByQIdApi,
  GetPersonalDetailsByUserIdApi,
  InsertUpdateCommentsOnQueryApi,
} from '../../../../Services/appServices/agricultureService';
import {log} from 'react-native-reanimated';

const Comments = ({route}) => {
  const {Description, Title, ImagePath, QId, userCode, CommentCount} =
    route.params;

  const [modalVisibility, setModalVisiblity] = useState(false);
  const [personalDetails, setPersonalDetails] = useState();

  const [comment, setComment] = useState();

  const [commentList, setCommentList] = useState();
  const [reload, setReload] = useState(false);

  const data = [1, 2, 4, 5, 6, 7, 89, 10, 11, 12, 13, 15, 19, 12, 12, 12];
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
      usercode: userCode,
    };

    GetPersonalDetailsByUserIdApi(data, res => {
      setPersonalDetails(res[0]);
    });
  }, [userCode]);

  useEffect(() => {
    const data = {
      queryId: QId,
    };

    GetListOfCommentsByQIdApi(data, res => {
      // console.log(res);
      setCommentList(res);
    });
  }, [reload]);

  const onSubmit = () => {
    const data = {
      CId: 0,
      QusId: QId,
      Commentor: userCode,
      Comment: comment,
      CommentDate: new Date(),
      CIsValid: true,
    };
    setComment();
    // console.log(data);

    InsertUpdateCommentsOnQueryApi(data, res => {
      // console.log(res, 'this is res');
      setReload(!reload);
    });
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={{height: height * 0.4}}>
        <Image
          source={{
            uri: ImagePath,
          }}
          resizeMode="stretch"
          style={{
            width: width,
            height: height * 0.4,
            // marginTop: 10,
            // marginLeft: 'auto',
            // marginRight: 'auto',
            // borderRadius: 5,
          }}
        />
      </View>

      <View
        style={{
          alignSelf: 'center',
          width: width,
          marginLeft: 'auto',
          marginRight: 'auto',
          flexDirection: 'column',
          marginTop: 10,
          //   backgroundColor: 'red',
          padding: 10,
          borderRadius: 5,

          //   flexWrap: 'wrap',
        }}>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <Avatar.Icon size={20} icon="account" style={{marginRight: 5}} />
          <Text style={{color: 'grey'}}>{personalDetails?.FullName}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.titleTxt, {fontSize: 16, fontWeight: 'bold'}]}>
            {/* <Text
              style={[
                styles.descTxt,
                {
                  fontSize: 16,
                  color: 'black',
                  fontWeight: '500',
                },
              ]}>
              शीर्षक:
            </Text>{' '} */}
            {Title}
          </Text>
        </View>
        <Text style={[styles.descTxt, {fontSize: 16, color: 'black'}]}>
          {/* <Text
            style={[
              styles.descTxt,
              {fontSize: 16, color: 'black', fontWeight: '500'},
            ]}>
            विवरण:
          </Text>{' '} */}
          {Description}
        </Text>
      </View>
      <View
        style={{width: width * 0.95, marginLeft: 'auto', marginRight: 'auto'}}>
        <TouchableOpacity
          onPress={() => {
            setModalVisiblity(true);
          }}
          style={{
            backgroundColor: 'white',
            padding: 14,
            flexDirection: 'row',
            borderRadius: 5,
            elevation: 2,
          }}>
          <Image
            source={require('../../../../Assets/FarmImages/commentPlain.png')}
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibility}
        onRequestClose={() => {
          setModalVisiblity(false);
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
                  setModalVisiblity(false);
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
              {/* <View
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
                        borderColor: 'black',
                      },
                    ]}
                    value={'hello'}
                    onChangeText={text => console.log(text)}
                    placeholder="शीर्षक राख्नुहोस्"
                    placeholderTextColor="grey"></TextInput>
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
                    value={'description'}
                    onChangeText={text => console.log(text)}
                    placeholder="वर्णन राख्नुहोस्..."
                    placeholderTextColor="grey"></TextInput>
                </View>
              </View> */}
              <View>
                <View style={styles.commentList}>
                  {/* <Text
                    style={{
                      color: 'black',
                      marginBottom: 3,
                      fontWeight: '500',
                      fontSize: 16,
                      paddingLeft: 10,
                      paddingTop: 10,
                    }}>
                    टिप्पणीहरू
                  </Text> */}
                  <View style={styles.insideComment}>
                    <ScrollView>
                      {commentList?.map(item => {
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
                                <Avatar.Icon size={24} icon="account" />
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
                                  {item.CommentorName}
                                </Text>
                                <Text style={styles.descTxt}>
                                  {item.Comment}
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
              <Avatar.Icon size={28} icon="account" style={styles.avatar} />
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
                    source={require('../../../../Assets/FarmImages/sendmessage.png')}
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

export default Comments;

const styles = StyleSheet.create({
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
  input: {
    height: 35,
    margin: 12,
    borderWidth: 0,
    width: width * 0.7,
    padding: 8,
    fontSize: 14,
    color: 'black',
  },
  avatar: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  sendImg: {
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
    // backgroundColor: 'red',
    padding: 10,
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
  titleTxt: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    // marginBottom: 2,
  },
  descTxt: {
    color: 'black',
    textAlign: 'justify',
    color: 'grey',
    fontSize: 14,
  },
});
