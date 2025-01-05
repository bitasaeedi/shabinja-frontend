import axios from "axios";
import { ConvertShamsiToMiladi } from "../components/DateFunctions/DateFunctions";
import API_URL from "../config/apiConfig";
import SUB_API_URL from "../config/apiConfig";
const baseUrl = API_URL;

// سرچ لیست اقامتگاه ها
export const HostTourSearchApi = async (searchData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${baseUrl}/HostTour/Search`,
      {
        // title: searchData?.title || "",
        start: searchData?.start
          ? ConvertShamsiToMiladi(searchData?.start)
          : "",
        end: searchData?.end ? ConvertShamsiToMiladi(searchData?.end) : "",
        count: searchData?.count || 0,
        Room: searchData?.room || 0,
        minprice: searchData?.minprice || 0,
        maxprice: searchData?.maxprice || 0,
        skip: searchData?.skip || 0,
        take: searchData?.take || 10,
        sort: searchData?.sort || 0, //ترتیب مرتب کردن
        type: searchData?.type || 0,
        // RolItemTourId: searchData?.rolItemTourId || , // آیدی قوانین
        // OtherItemTourId: searchData?.otherItemTourId || [], // آیدی سایر امکانات
        TypeHost: searchData?.typeHost || [], // نوع اقامتگاه
        TypeHostLoc: searchData?.typeHostLoc || [],
        RolItemTour: searchData?.rolItemTour || [],
        OtherItemTour: searchData?.otherItemTour || [],
        Province: searchData?.province || [],
        City: searchData?.city || [],
      },
      {
        headers: {
          token: token, // Add the token to the request header
        },
      }
    );
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// سرچ استان شهر و اقاماتگاه براساس عنوان
export const HostTourSearchTitleApi = async (searchData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/HostTour/SearchTitle`, {
      params: {
        title: searchData?.title,
      },
      headers: {
        token: token, // Add the token to the request header
      },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// مقاصد محبوب
export const FavoritDestinationApi = async (searchData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/ItemHomeShbinja/GetAll`, {
      params: {},
      headers: {
        token: token, // Add the token to the request header
      },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

//  سرچ نوع اقامتگاه
export const GetTypeHostListApi = async (searchData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/TypeHost/TypeHostList`, {
      params: {},
      headers: {
        token: token,
      },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// /    لیست نوع منطقه
export const GetTypeHostLocListApi = async (searchData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/TypeHostLoc/GetAll`, {
      params: {},
      headers: {
        token: token,
      },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// سرچ یک اقامتگاه
export const HostTourSearchOneApi = async (stayCode) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${baseUrl}/HostTour/GetTour/${stayCode}`,
      {},
      {
        headers: {
          token: token, // Add the token to the request header
        },
      }
    );
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};
