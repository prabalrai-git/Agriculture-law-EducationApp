import {generateUrlEncodedData} from '../../Helpers/GenerateUrlEncodedData';
import {
  GetAgriType,
  GetAgroKharchHeadByAgriType,
  GetBaaliKharchaDetailsByUserBaaliId,
  GetBreedOfAgroByAgroId,
  GetFarmListByFarmId,
  GetFarmListByUserCode,
  GetFarmProductionDetailsByFarmId,
  GetFarmType,
  GetListOfAgroProductByAgriType,
  GetListOfCommentsByQId,
  GetListOfDistricts,
  GetListOfQueryByUserid,
  GetListofUserTypes,
  GetSalesDetailsofActiveProductionByUser,
  GetSalesUnitList,
  GetSoilValuesByFarmIdAndUserId,
  InsertUpdateBaaliKharcha,
  InsertUpdateBaaliOfUser,
  InsertUpdateCommentsOnQuery,
  InsertUpdateFarm,
  InsertUpdateFarmersQuery,
  InsertUpdateFarmersQueryWithImageFile,
  InsertUpdateFarmWithFile,
  InsertUpdateProductionSalesDetails,
  InsertUpdateSoilValuesByUserId,
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
export const InsertUpdateFarmNewApi = async (data, successCallback) => {
  try {
    // let formData = generateUrlEncodedData(data);
    // console.log('This is the data', data);
    let response = await store(InsertUpdateFarmWithFile, data);

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
    const response = await store(`${GetAgriType}?aId=${data.aId}`);
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
    const response = await store(
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
export const InsertUpdateSoilValuesByUserIdApi = async (
  data,
  successCallback,
) => {
  try {
    // let formData = generateUrlEncodedData(data);
    // console.log('This is the data', data);
    let response = await store(InsertUpdateSoilValuesByUserId, data);

    if (response?.status === 200) {
      // console.log('hello guys');
      successCallback(response?.data);
    } else successCallback([]);
  } catch (error) {
    // console.log('errorsssssssssssssssssssssss', error);
    successCallback([]);
  }
};

export const GetBreedOfAgroByAgroIdApi = async (data, successCallback) => {
  try {
    const response = await fetch(`${GetBreedOfAgroByAgroId}?BId=${data.BId}`);

    if (response?.status === 200) {
      successCallback(response?.data?.BreedType);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};
export const GetFarmProductionDetailsByFarmIdApi = async (
  data,
  successCallback,
) => {
  try {
    const response = await fetch(
      `${GetFarmProductionDetailsByFarmId}?farmId=${data.farmId}`,
    );

    if (response?.status === 200) {
      successCallback(response?.data?.FarmList);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};

export const GetSoilValuesByFarmIdAndUserIdApi = async (
  data,
  successCallback,
) => {
  try {
    const response = await fetch(
      `${GetSoilValuesByFarmIdAndUserId}?farmId=${data.farmId}&userCode=${data.userCode}`,
    );

    if (response?.status === 200) {
      successCallback(response?.data?.SoilValue);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};

export const InsertUpdateBaaliKharchaApi = async (data, successCallback) => {
  try {
    // let formData = generateUrlEncodedData(data);
    // console.log('This is the data', data);
    let response = await store(InsertUpdateBaaliKharcha, data);

    if (response?.status === 200) {
      // console.log('hello guys');
      successCallback(response?.data);
    } else successCallback([]);
  } catch (error) {
    // console.log('errorsssssssssssssssssssssss', error);
    successCallback([]);
  }
};

export const InsertUpdateProductionSalesDetailsApi = async (
  data,
  successCallback,
) => {
  try {
    // let formData = generateUrlEncodedData(data);
    // console.log('This is the data', data);
    let response = await store(InsertUpdateProductionSalesDetails, data);

    if (response?.status === 200) {
      // console.log('hello guys');
      successCallback(response?.data);
    } else successCallback([]);
  } catch (error) {
    // console.log('errorsssssssssssssssssssssss', error);
    successCallback([]);
  }
};

export const GetBaaliKharchaDetailsByUserBaaliIdApi = async (
  data,
  successCallback,
) => {
  try {
    const response = await fetch(
      `${GetBaaliKharchaDetailsByUserBaaliId}?userId=${data.userId}&prodId=${data.prodId}&baaliId=${data.baaliId}`,
    );
    if (response?.status === 200) {
      successCallback(response?.data?.Kharcha);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};

export const GetAgroKharchHeadByAgriTypeApi = async (data, successCallback) => {
  try {
    // let formData = generateUrlEncodedData(data);

    let response = await fetch(
      `${GetAgroKharchHeadByAgriType}?typeId=${data.typeId}`,
    );

    if (response?.status === 200) {
      successCallback(response?.data.ExpensesList);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};
export const GetSalesDetailsofActiveProductionByUserApi = async (
  data,
  successCallback,
) => {
  try {
    // let formData = generateUrlEncodedData(data);

    let response = await fetch(
      `${GetSalesDetailsofActiveProductionByUser}?userId=${data.userId}`,
    );

    if (response?.status === 200) {
      successCallback(response?.data.BikriReport);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};
export const GetListOfQueryByUseridApi = async (data, successCallback) => {
  try {
    // let formData = generateUrlEncodedData(data);

    let response = await fetch(
      `${GetListOfQueryByUserid}?userId=${data.userId}`,
    );

    if (response?.status === 200) {
      successCallback(response?.data.QueryList);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};
export const GetSalesUnitListApi = async (data, successCallback) => {
  try {
    // let formData = generateUrlEncodedData(data);

    let response = await fetch(`${GetSalesUnitList}`);

    if (response?.status === 200) {
      successCallback(response?.data.SalesUnit);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};

export const InsertUpdateFarmersQueryApi = async (data, successCallback) => {
  try {
    // let formData = generateUrlEncodedData(data);
    // console.log('This is the data', data);
    let response = await store(InsertUpdateFarmersQuery, data);
    console.log(response);

    if (response?.status === 200) {
      // console.log('hello guys');
      successCallback(response?.data);
    } else successCallback([]);
  } catch (error) {
    // console.log('errorsssssssssssssssssssssss', error);
    successCallback([]);
  }
};
export const InsertUpdateFarmersQueryWithImageFileApi = async (
  data,
  successCallback,
) => {
  try {
    // let formData = generateUrlEncodedData(data);
    // console.log('This is the data', data);
    let response = await store(InsertUpdateFarmersQueryWithImageFile, data);
    console.log(response);

    if (response?.status === 200) {
      // console.log('hello guys');
      successCallback(response?.data);
    } else successCallback([]);
  } catch (error) {
    // console.log('errorsssssssssssssssssssssss', error);
    successCallback([]);
  }
};
export const InsertUpdateCommentsOnQueryApi = async (data, successCallback) => {
  try {
    // let formData = generateUrlEncodedData(data);
    // console.log('This is the data', data);
    let response = await store(InsertUpdateCommentsOnQuery, data);
    console.log(response);

    if (response?.status === 200) {
      // console.log('hello guys');
      successCallback(response?.data);
    } else successCallback([]);
  } catch (error) {
    // console.log('errorsssssssssssssssssssssss', error);
    successCallback([]);
  }
};

export const GetListOfCommentsByQIdApi = async (data, successCallback) => {
  try {
    // let formData = generateUrlEncodedData(data);

    let response = await fetch(
      `${GetListOfCommentsByQId}?queryId=${data.queryId}`,
    );

    if (response?.status === 200) {
      successCallback(response?.data.QueryList);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};

export const GetFarmTypeApi = async successCallback => {
  try {
    // let formData = generateUrlEncodedData(data);

    let response = await fetch(`${GetFarmType}`);

    if (response?.status === 200) {
      successCallback(response?.data.FarmType);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};
