import axios from "axios";
import moment from "moment-jalaali";
import { ConvertShamsiToMiladi } from "../components/DateFunctions/DateFunctions";
import API_URL from "../config/apiConfig";
import SUB_API_URL from "../config/apiConfig";
const baseUrl = API_URL;

//مشاهده لیست رزروهای ثبت شده برای میزبان
export const GetListRequestToReserveApi = async (state = 0) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.get(`${baseUrl}/HostTourOrder/List/${state}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error uploading image:",
      error?.response?.data || error.message
    );
    return error?.response?.data;
  }
};

// تایید میزبان توسط منیزبان
export const AcceptRequestReserveApi = async (guid) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.get(`${baseUrl}/HostTourOrder/Accept/${guid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error uploading image:",
      error?.response?.data || error.message
    );
    return error?.response?.data;
  }
};
