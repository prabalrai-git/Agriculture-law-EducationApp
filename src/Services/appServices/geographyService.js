import {
  GetlistofDisctrictByStateId,
  GetListOfState,
  GetListOfVDCByDistrictId,
} from '../Constants/Url';
import {fetch} from '../Utils/httpUtil';

export const getListOfStatesApi = async successCallback => {
  try {
    const response = await fetch(GetListOfState);
    if (response?.status === 200) {
      successCallback(response?.data.StateList);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};

export const getlistofDisctrictByStateIdApi = async (data, successCallback) => {
  try {
    const response = await fetch(
      `${GetlistofDisctrictByStateId}?stateId=${data.stateId}`,
    );
    if (response?.status === 200) {
      successCallback(response?.data?.District);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};
export const getListOfVDCByDistrictIdApi = async (data, successCallback) => {
  try {
    const response = await fetch(
      `${GetListOfVDCByDistrictId}?districtId=${data.districtId}`,
    );
    if (response?.status === 200) {
      successCallback(response?.data?.VDCList);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};
