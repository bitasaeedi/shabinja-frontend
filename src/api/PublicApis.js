import axios from "axios";
import API_URL from "../config/apiConfig";
import SUB_API_URL from "../config/apiConfig";
const baseUrl = API_URL;

// فضای اقامتگاه
export const GetAccommodationSpace = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/AccommodationSpace/GetAll`, {
      params: {
        // title: searchData?.title,
      },
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

// لیست قوانین
export const GetRollesList = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/RolItemTour/RolItemTourList`, {
      params: {
        // title: searchData?.title,
      },
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

// سایر امکانات
export const GetOtherItemTourList = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${baseUrl}/OtherItemTour/OtherItemTourList`,
      {
        params: {
          // title: searchData?.title,
        },
        headers: {
          token: token,
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

// استان ها
export const getProvinceList = async (searchData) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${baseUrl}/Province/ProvinceList`, {
      // params: searchData,
      // headers: {
      //   token: token, // Add the token to the request header
      // },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// شهرهای براساس ای دی استان
export const getCityListByProvinceId = async (provinceId) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(
      `${baseUrl}/city/ListByProvinceId/${provinceId}`,
      {
        // headers: {
        //   token: token, // Add the token to the request header
        // },
      }
    );
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

//  لیست عنوان اسلایدر ها
export const GetListTitleSlidersApi = async (searchData) => {
  try {
    const response = await axios.get(`${baseUrl}/ListForHome/GetAll`, {
      // params: searchData,
      // headers: {
      //   token: token, // Add the token to the request header
      // },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

// لیست کامنت ها درباره سایت
export const GetCommentsAboutSiteApi = async (searchData) => {
  try {
    const response = await axios.get(`${baseUrl}/HostTour/ListCommentsTourUserAllForHome`, {
      // params: searchData,
      // headers: {
      //   token: token, // Add the token to the request header
      // },
    });
    // console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};
