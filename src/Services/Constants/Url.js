const API_URL = `https://lunivacare.ddns.net/Luniva360Agri/`;

export const BASE_URL = `${API_URL}api/luniva360agriapp/`;

// Start of Login constants

export const InsertUserInfo = 'InsertUserInfo';

export const ValidateOTP = 'ValidateOTP';

export const InsertUpdatePersonalInfo = `InsertUpdatePersonalInfo`;

// End of Login constants

// Start of Geography constants

export const GetListOfState = 'GetListOfState';

export const GetlistofDisctrictByStateId = 'GetlistofDisctrictByStateId';

export const GetListOfVDCByDistrictId = 'GetListOfVDCByDistrictId';

export const GetListOfDistricts = 'GetListOfDistrict';
// End of Geography constants

// Start of Agriculture constants

export const InsertUpdateFarm = 'InsertUpdateFarm';

export const GetListofUserTypes = 'GetListofUserTypes';

export const GetFarmListByUserCode = 'GetFarmListByUserCode';

export const GetFarmListByFarmId = 'GetFarmListByFarmId';

export const GetAgriType = 'GetAgriType';

export const GetListOfAgroProductByAgriType = 'GetListOfAgroProductByAgriType';

export const InsertUpdateBaaliOfUser = 'InsertUpdateBaaliOfUser';

export const GetBreedOfAgroByAgroId = 'GetBreedOfAgroByAgroId';

export const GetFarmProductionDetailsByFarmId =
  'GetFarmProductionDetailsByFarmId';

export const InsertUpdateSoilValuesByUserId = 'InsertUpdateSoilValuesByUserId';

export const GetSoilValuesByFarmIdAndUserId = 'GetSoilValuesByFarmIdAndUserId';

export const InsertUpdateBaaliKharcha = 'InsertUpdateBaaliKharcha';

export const InsertUpdateProductionSalesDetails =
  'InsertUpdateProductionSalesDetails';

export const GetBaaliKharchaDetailsByUserBaaliId =
  'GetBaaliKharchaDetailsByUserBaaliId';

export const GetAgroKharchHeadByAgriType = 'GetAgroKharchHeadByAgriType';

export const GetSalesDetailsofActiveProductionByUser =
  'GetSalesDetailsofActiveProductionByUser';

export const GetSalesUnitList = 'GetSalesUnitList';

export const InsertUpdateFarmersQuery = 'InsertUpdateFarmersQuery';

export const GetListOfQueryByUserid = 'GetListOfQueryByUserid';

export const InsertUpdateFarmWithFile = 'InsertUpdateFarmWithFile';

export const InsertUpdateFarmersQueryWithImageFile =
  'InsertUpdateFarmersQueryWithImageFile';

export const InsertUpdateCommentsOnQuery = 'InsertUpdateCommentsOnQuery';

export const GetListOfCommentsByQId = 'GetListOfCommentsByQId';

export const GetFarmType = 'GetFarmType';

export const GetBajarItemType = 'GetBajarItemType';

export const GetBajarItemByItemType = 'GetBajarItemByItemType';

export const GetBajarItemByTypeId = 'GetBajarItemByTypeId';

// End of Agriculture constants
