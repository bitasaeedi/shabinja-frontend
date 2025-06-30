import axios from "axios";
import moment from "moment-jalaali";
import { ConvertShamsiToMiladi } from "../components/DateFunctions/DateFunctions";
import API_URL from "../config/apiConfig";
import SUB_API_URL from "../config/apiConfig";
const baseUrl = API_URL;


export const ListRequestReserveApi = async (state) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${baseUrl}/HostTourOrder/List/${state}`, {
      params: {},
      headers: {
        token: token,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};
