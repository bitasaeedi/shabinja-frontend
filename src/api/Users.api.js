import axios from "axios";
import API_URL from "../config/apiConfig";

const baseUrl = API_URL;

export const UserSearchOneApi = async () => {
  const token = localStorage.getItem("access_token"); 
  // console.log("Token:", token);
  try {
    const response = await axios.get(`${baseUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Return response data
  } catch (error) {
    console.error("Error:", error?.response?.data || error.message);
    // console.log("Token:", token);
    return error?.response?.data;
  }
};
