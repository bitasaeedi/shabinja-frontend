import axios from "axios";
import API_URL from "../../../config/apiConfig";
const baseUrl = API_URL;

export  const sendChangeRequest = async (data) => {

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${baseUrl}/PriceHostTour`,
        {
          HostTourGuid: data?.HostTourGuid ,
          State: data?.State ,
          WeekendPrice: data?.WeekendPrice || 0,
          WeekdayPrice: data?.WeekdayPrice || 0,
          AutumPrice: data?.AutumPrice || 0,
          OtherPrice: data?.OtherPrice || 0,
          PriceBase: data?.PriceBase || 0,
          Start: data?.Start || 0,
          End: data?.End || 0,
          NotAvailable: data?.NotAvailable || false,
          MonthlyDiscount: data?.MonthlyDiscount || 0,
          WeeklyDiscount: data?.WeeklyDiscount || 0,
          InstantBooking: data?.InstantBooking || 0,
          MinimumBookingDay: data?.MinimumBookingDay || 0,
          MaximumBookingDay: data?.MaximumBookingDay || 0,
          CharterNowDiscount: data?.CharterNowDiscount || 0,
          CharterOneDayAgoDiscount: data?.CharterOneDayAgoDiscount || 0,
          CharterTwoDayAgoDiscount: data?.CharterTwoDayAgoDiscount || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch (error) {
      console.log(error?.response);
      
      return false;
    }
  };