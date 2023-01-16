import {
  InsertUpdatePersonalInfo,
  InsertUserInfo,
  ValidateOTP,
} from '../Constants/Url';
import {fetch, store} from '../Utils/httpUtil';

// Posts Form data and sends OTP to the phone number provided

export const InsertUserInfoApi = async (data, successCallback) => {
  try {
    // let formData = GenerateUrlEncodedData(data)
    let response = await store(InsertUserInfo, data);
    // console.log('This is response fro service', response);
    if (response?.status === 200) {
      successCallback(response?.data);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};

export const ValidateOTPApi = async (data, successCallback) => {
  try {
    const response = await fetch(
      `${ValidateOTP}?registrationId=${data.registrationId}&otp=${data.otp}`,
    );
    if (response?.status === 200) {
      successCallback(response?.data?.validOTP);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};

export const InsertUpdatePersonalInfoApi = async (data, successCallback) => {
  try {
    // let formData = GenerateUrlEncodedData(data)
    let response = await store(InsertUpdatePersonalInfo, data);
    // console.log('This is response fro service', response);
    if (response?.status === 200) {
      successCallback(response?.data);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};
