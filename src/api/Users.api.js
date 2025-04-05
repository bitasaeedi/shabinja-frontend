import axios from "axios";
import { ConvertShamsiToMiladi } from "../components/DateFunctions/DateFunctions";
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

export const UserUpdateApi = async (data) => {
  const token = localStorage.getItem("access_token");
  console.log("birthDay:", ConvertShamsiToMiladi(data?.birthDay));
  try {
    const response = await axios.post(
      `${baseUrl}/profile/Update`,
      {
        sex: 0,
        firstName: data?.firstName, //
        lastName: data?.lastName,
        userName: data?.mobile,
        // password:  null,
        nationalCode: data?.nationalCode,
        // zipCode: "1234564567",
        // fatherName: "1234156",
        phone: data?.mobile,
        mobile: data?.mobile,
        email: data?.email || null,
        birthDay: ConvertShamsiToMiladi(data?.birthDay),
        // address: "12312",
        // certificateId: "1123",
        cityId: 429,
        provinceId: 1,
        image: data?.image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Return response data
  } catch (error) {
    console.error("Error:", error?.response?.data || error.message);
    // console.log("Token:", token);
    return error?.response?.data;
  }
};


export const UserUpdateImage = async (data) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(
      `${baseUrl}/profile/UpdateImage`,
      {
        image: data?.image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Return response data
  } catch (error) {
    console.error("Error:", error?.response?.data || error.message);
    // console.log("Token:", token);
    return error?.response?.data;
  }
};

