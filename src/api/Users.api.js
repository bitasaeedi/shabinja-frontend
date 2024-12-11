import axios from "axios";
import API_URL from "../config/apiConfig";

const baseUrl = API_URL;
const subUrl = "/api/users";
export const searchUsersApi = async (searchData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${baseUrl}${subUrl}/search`,
      searchData,
      {
        headers: {
          token: token, // Add the token to the request header
        },
      }
    );
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

export const searchOneUsersApi = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${baseUrl}${subUrl}/search/one/${id}`,
      {},
      {
        headers: {
          token: token, // Add the token to the request header
        },
      }
    );
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};

export const updateOneUsersApi = async (id, newData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${baseUrl}${subUrl}/update/${id}`,
      newData,
      {
        headers: {
          token: token, // Add the token to the request header
        },
      }
    );
    return response.data; // Assuming your API returns data in the response
  } catch (error) {
    console.log("Error:", error?.response?.data);
    return error?.response?.data;
  }
};
