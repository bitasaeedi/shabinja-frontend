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

    // If state is 1001 (expired), fetch both 1001 and 4
    if (state === 1001) {
      const response1 = await axios.get(`${baseUrl}/HostTourOrder/List/1001`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const response2 = await axios.get(`${baseUrl}/HostTourOrder/List/4`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Combine the results from both API calls
      const combinedData = {
        ...response1.data,
        data: [...(response1.data?.data || []), ...(response2.data?.data || [])]
      };

      return combinedData;
    }

    // For other states, use the original logic
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
