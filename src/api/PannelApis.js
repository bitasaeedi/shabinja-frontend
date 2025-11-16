import axios from "axios";
import API_URL from "../config/apiConfig";
const baseUrl = API_URL;

//مشاهده لیست رزروهای ثبت شده برای میزبان
export const GetListRequestToReserveApi = async (state = [0]) => {
  console.log("panel states" , state);
  
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.post(
      `${baseUrl}/HostTourOrder/List`,
      {
        states:state
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

    const response = await axios.get(
      `${baseUrl}/HostTourOrder/Accept/${guid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error uploading image:",
      error?.response?.data || error.message
    );
    return error?.response?.data;
  }
};

// رد درخواست
export const RejectRequestReserveApi = async (guid) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.get(
      `${baseUrl}/HostTourOrder/Reject/${guid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error uploading image:",
      error?.response?.data || error.message
    );
    return error?.response?.data;
  }
};

// حذف درخواست
export const DeleteRequestReserveApi = async (guid) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.post(
      `${baseUrl}/HostTourOrder/Delete/${guid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error, "DeleteRequestReserveApi");
    return error?.response?.data;
  }
};

//  زمان باقیمانده
export const ExpirationTimeReserveApi = async (guid) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.get(
      `${baseUrl}/HostTourOrder/ExpirationTime/${guid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error, "DeleteRequestReserveApi");
    return error?.response?.data;
  }
};

// دریافت لینک پرداخت
export const GetLinkPayReserveApi = async (guid) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.get(
      `${baseUrl}/HostTourOrder/Payment/${guid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error, "DeleteRequestReserveApi");
    return error?.response?.data;
  }
};
