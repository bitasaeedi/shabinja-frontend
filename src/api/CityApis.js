import axios from "axios";
import API_URL from "../config/apiConfig";
import SUB_API_URL from "../config/apiConfig";
const baseUrl = API_URL;

export const getProvinceList = async (searchData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/Province/ProvinceList`, {
      // params: searchData,
      // headers: {
      //   token: token, // Add the token to the request header
      // },
    });
    console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.error("Error searching for Userss:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const getCityListByProvinceId = async (searchData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/Province/ProvinceList`, {
      // params: searchData,
      // headers: {
      //   token: token, // Add the token to the request header
      // },
    });
    console.log(response, "response");
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.error("Error searching for Userss:", error);
    throw error; // Re-throw the error for further handling
  }
};
