import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  TextInput,
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import {useTranslation} from 'react-i18next';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import PhoneInput from 'react-native-phone-number-input';
import {
  InsertUserInfoApi,
  ValidateOTPApi,
} from '../../Services/appServices/loginService';
import {currentDateTime} from '../../Common/CurrentDateTime';
import {useHeaderHeight} from '@react-navigation/elements';

const width = Dimensions.get('window').width;

const Login = ({navigation}) => {
  const height = useHeaderHeight();

  const [userMobileNumber, setUserMobileNumber] = useState(null);

  const [email, setEmail] = useState(null);
  const [confirm, setConfirm] = useState();
  const [otp, setOtp] = useState();
  const [otpError, setOtpError] = useState();
  const [openOTPScreen, setOpenOTPScreen] = useState(false);
  const [registrationId, setRegistrationId] = useState();
  const [errors, setErrors] = useState({});

  const {t, i18n} = useTranslation();

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      //clear setInterval here and go back
    });
  }, []);

  // form validation code

  const handleValidation = (errorMsg, inputFieldName) => {
    setErrors(prevState => ({...prevState, [inputFieldName]: errorMsg}));
  };

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const validate = () => {
    Keyboard.dismiss();
    const emailValidationValue = validateEmail(email);
    let isValid = true;
    if (userMobileNumber === null) {
      handleValidation('कृपया मान्य फोन नम्बर राख्नुहोस्', 'userMobileNumber');
      isValid = false;
    }
    // if (email === null) {
    //   handleValidation('कृपया मान्य इमेल राख्नुहोस्', 'email');
    //   isValid = false;
    // }
    if (!emailValidationValue) {
      handleValidation('कृपया मान्य इमेल राख्नुहोस्', 'email');
      isValid = false;
    }
    if (userMobileNumber === null || userMobileNumber?.length < 10) {
      handleValidation('कृपया मान्य फोन नम्बर राख्नुहोस्', 'userMobileNumber');
      isValid = false;
    }
    // email validation
    // if (
    //   ![
    //     email
    //       ?.toLowerCase()
    //       .match(
    //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //       ),
    //   ]
    // ) {
    //   handleValidation('कृपया मान्य इमेल राख्नुहोस्', 'email');
    //   isValid = false;
    // }
    return isValid;
  };

  // End of VAlidation

  // OTP verification for own server

  const handleGetOTP = () => {
    let isValidated = validate();

    let data = {
      UId: 0,
      Email: email,
      MobileNo: userMobileNumber,
      OTP: 10,
      IsDelivered: true,
      IsUsed: true,
      EntryDate: new Date().toDateString(),
    };

    // console.log(data);

    if (isValidated) {
      // console.log('hello world', isValidated);
      InsertUserInfoApi(data, res => {
        // setOpenOTPScreen(true)
        // console.log("This is data", data);

        // console.log('This is the resfsdf', res);

        if (res) {
          setOpenOTPScreen(true);
          setRegistrationId(res.CreatedId);
        } else {
          // setOpenOTPScreen(true);
          // Alert.alert(
          //   'अलर्ट',
          //   'इमेल र मोबाइल नम्बर पहिले नै प्रणालीमा अवस्थित छ !!',
          //   [
          //     // {
          //     //   text: 'Cancel',
          //     //   onPress: () => console.log('Cancel Pressed'),
          //     //   style: 'cancel',
          //     // },
          //     {
          //       text: 'ठिक छ',
          //       onPress: () => {
          //         setEmail();
          //         // setUserMobileNumber();
          //       },
          //     },
          //   ],
          // );
          setOpenOTPScreen(true);
        }
      });
    } else {
      console.log('enter');
    }
  };

  const confirmOTPForOwnServer = () => {
    let data = {
      registrationId: registrationId,
      otp: otp,
    };

    ValidateOTPApi(data, res => {
      if (res?.length > 0) {
        navigation.navigate('CreateProfile');
        setRegistrationId();
        setOtp();
        setOtpError();
        // setOpenOTPScreen(false);
      } else {
        setOtpError('कृपया सही OTP राख्नुहोस् !');
        navigation.navigate('CreateProfile');
      }
    });
  };

  //OTP verifiction code firebase

  const handleLoginWithPhoneNumber = async () => {
    if (userMobileNumber.length === 10) {
      const smsPhone = '+977 ' + userMobileNumber;

      try {
        const confirmation = await auth().signInWithPhoneNumber(smsPhone);

        if (confirmation) {
          setConfirm(confirmation);
          // console.log(confirmation);
        }
      } catch (error) {
        console.log(`Cannot send sms code to your phone: ${error}`);
      }
    } else {
      Alert.alert('Error', 'Invalid phone number', [
        {
          text: 'OK',
          onPress: () => setUserMobileNumber(''),
        },
      ]);
    }
  };

  const confirmOTP = async () => {
    try {
      const res = await confirm.confirm(otp);
      if (res) {
        navigation.navigate('CreateProfile');
      }
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  //End of OTP verification code firebase

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="position"
      contentContainerStyle={{flex: 1}}
      keyboardVerticalOffset={-150}>
      <StatusBar backgroundColor={global.SecondaryColor} />

      <View style={styles.container}>
        <View style={styles.topview}>
          <ImageBackground
            resizeMode="contain"
            source={require('../../Assets/Images/lunivalogo.png')}
            style={styles.banner}
          />
        </View>

        <View>
          <Text style={styles.txt}>दर्ता गर्नुहोस्</Text>
        </View>

        {openOTPScreen === false ? (
          <>
            {/* <TextInput placeholder={t("Enter your mobile number")} placeholderTextColor="grey" style={styles.mobileInput} keyboardType="numeric" /> */}
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.infoTxt}>
                {t('Enter your mobile number we will send OTP to Verify')}
              </Text>
            </View>
            <PhoneInput
              // ref={phoneInput}
              // defaultValue={value}

              value={userMobileNumber}
              defaultCode="NP"
              layout="first"
              containerStyle={styles.mobileInput}
              textContainerStyle={{paddingVertical: 0}}
              onChangeText={text => setUserMobileNumber(text)}
              // onChangeFormattedText={(text) => {
              //     setFormattedValue(text);
              // }}
              withDarkTheme
              withShadow
              autoFocus={false}
            />
            {errors.userMobileNumber && (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  width: width * 0.85,
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  marginTop: 5,
                }}>
                {errors.userMobileNumber}
              </Text>
            )}
            <View>
              <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder="आफ्नो इमेल राख्नुहोस्"
                placeholderTextColor={'grey'}
                style={{
                  width: width * 0.85,
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  borderColor: 'black',
                  marginTop: 20,
                  backgroundColor: 'white',
                  color: 'black',
                  elevation: 2,
                }}
              />
            </View>

            {errors.email && (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  width: width * 0.85,
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  marginTop: 5,
                }}>
                {errors.email}
              </Text>
            )}
            <View style={styles.loginButton}>
              <TouchableOpacity onPress={() => handleGetOTP()}>
                <Text style={styles.btnTxt}>{t('Get OTP')}</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.infoTxt}>
                तपाईको नम्बर{' '}
                <Text style={{color: 'red', fontSize: 12}}>
                  +977 {userMobileNumber}{' '}
                </Text>{' '}
                पठाइएको OTP प्रविष्ट गर्नुहोस्
              </Text>
            </View>
            <View>
              <OTPInputView
                autoFocusOnLoad={false}
                style={{
                  width: '85%',
                  height: 100,
                  alignSelf: 'center',
                  marginTop: 10,
                }}
                pinCount={6}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}

                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                  // console.log(`Code is ${code}, you are good to go!`);
                  setOtp(code);
                }}
              />
              {otpError && (
                <Text
                  style={{
                    fontSize: 13,
                    color: 'red',
                    // textAlign: 'center',
                    width: width * 0.85,
                    marginLeft: width * 0.1,
                    marginBottom: -15,
                    // marginRight: 'auto',
                    // marginLeft: 'auto',
                  }}>
                  {otpError}
                </Text>
              )}
            </View>

            <View style={styles.loginButton}>
              <TouchableOpacity onPress={() => confirmOTPForOwnServer()}>
                <Text style={styles.btnTxt}>{t('Login')}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
  },
  topview: {
    height: responsiveHeight(25),
    marginBottom: -70,
  },
  banner: {
    width: '100%',
    height: '70%',

    // justifyContent: 'center',
    // alignSelf: 'center',
    // borderBottomWidth: 0.4,
    // borderColor: global.SecondaryColor,
  },
  txt: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
  },
  mobileInput: {
    color: 'black',
    // borderColor: 'black',
    borderWidth: 0,
    width: responsiveWidth(85),
    marginRight: 'auto',
    marginLeft: 'auto',
    // borderRadius: 6,
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: 'green',
    width: responsiveWidth(85),
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 30,
    padding: 9,
    borderRadius: 6,
    borderColor: 'black',
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  underlineStyleBase: {
    width: 50,
    height: 65,
    borderWidth: 1,
    borderBottomWidth: 1,
    color: 'black',
    borderRadius: 8,
    borderColor: 'grey',
  },

  underlineStyleHighLighted: {
    borderColor: '#55e811',
  },
  infoTxt: {
    color: 'grey',
    fontSize: 12,
    marginTop: 10,
    width: 300,
    textAlign: 'center',
  },
});
