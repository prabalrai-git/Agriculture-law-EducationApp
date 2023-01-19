import {generateUrlEncodedData} from '../../Helpers/GenerateUrlEncodedData';
import {
  GetAgriType,
  GetFarmListByFarmId,
  GetFarmListByUserCode,
  GetListOfAgroProductByAgriType,
  GetListOfDistricts,
  GetListofUserTypes,
  InsertUpdateBaaliOfUser,
  InsertUpdateFarm,
} from '../Constants/Url';
import {fetch, store} from '../Utils/httpUtil';

export const getListOfDistricts = async successCallback => {
  try {
    const response = await fetch(GetListOfDistricts);
    if (response?.status === 200) {
      successCallback(response?.data.DistrictList);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};

export const InsertUpdateFarmApi = async (data, successCallback) => {
  try {
    // let formData = generateUrlEncodedData(data);
    // console.log('This is the data', data);
    let response = await store(InsertUpdateFarm, data);

    if (response?.status === 200) {
      // console.log('hello guys');
      successCallback(response?.data);
    } else successCallback([]);
  } catch (error) {
    // console.log('errorsssssssssssssssssssssss', error);
    successCallback([]);
  }
};

export const GetListofUserTypesApi = async successCallback => {
  try {
    const response = await fetch(GetListofUserTypes);
    if (response?.status === 200) {
      successCallback(response?.data.UsertypeList);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};

export const GetFarmListByUserCodeApi = async (data, successCallback) => {
  try {
    const response = await fetch(
      `${GetFarmListByUserCode}?userCode=${data.userCode}`,
    );
    if (response?.status === 200) {
      successCallback(response?.data?.FarmList);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};

export const GetFarmListByFarmIdApi = async (data, successCallback) => {
  try {
    const response = await fetch(
      `${GetFarmListByFarmId}?farmId=${data.farmId}`,
    );
    if (response?.status === 200) {
      successCallback(response?.data?.FarmList);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};
export const GetAgriTypeApi = async (data, successCallback) => {
  try {
    const response = await fetch(`${GetAgriType}?aId=${data.aId}`);
    if (response?.status === 200) {
      successCallback(response?.data?.AgriTypes);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};
export const GetListOfAgroProductByAgriTypeApi = async (
  data,
  successCallback,
) => {
  try {
    const response = await fetch(
      `${GetListOfAgroProductByAgriType}?agritypeId=${data.agritypeId}`,
    );
    if (response?.status === 200) {
      successCallback(response?.data?.ProductList);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};

export const InsertUpdateBaaliOfUserApi = async (data, successCallback) => {
  try {
    // let formData = generateUrlEncodedData(data);
    // console.log('This is the data', data);
    let response = await store(InsertUpdateBaaliOfUser, data);

    if (response?.status === 200) {
      // console.log('hello guys');
      successCallback(response?.data);
    } else successCallback([]);
  } catch (error) {
    // console.log('errorsssssssssssssssssssssss', error);
    successCallback([]);
  }
};
