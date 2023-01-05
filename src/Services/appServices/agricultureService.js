import { GetListOfDistricts } from "../Constants/Url";
import { fetch } from "../Utils/httpUtil";



export const getListOfDistricts = async (successCallback) => {

    try {
        const response = await fetch(GetListOfDistricts);
        if (response?.status === 200) {
            successCallback(response?.data.DistrictList);
        } else successCallback([]);
    } catch (error) {
        successCallback([])
    }
};