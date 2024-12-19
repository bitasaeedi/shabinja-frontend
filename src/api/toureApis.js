import axios from "axios";
import { ConvertShamsiToMiladi } from "../components/DateFunctions/DateFunctions";
import API_URL from "../config/apiConfig";
import SUB_API_URL from "../config/apiConfig";
const baseUrl = API_URL;

// سرچ استفاده شده در اسلایدر ها
export const HostTourSearchApi = async (searchData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/HostTour/Search`, {
      params: {
        title: searchData?.title,
        start: searchData?.start
          ? ConvertShamsiToMiladi(searchData?.start)
          : "",
        end: searchData?.end ? ConvertShamsiToMiladi(searchData?.end) : "",
        count: searchData?.count,
        Room: searchData?.Room,
        minprice: searchData?.minprice,
        maxprice: searchData?.maxprice,
        skip: searchData?.skip,
        take: searchData?.take || 20,
        sort: searchData?.sort,
        type: searchData?.type,
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
