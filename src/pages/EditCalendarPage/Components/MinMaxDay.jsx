import {
  Box,
  TextField,
  Typography,
} from "@mui/material";
import CustomButton from "./CustomButton";
import axios from "axios";
import React, { useContext, useState } from "react";
import { EditCalendarPageContext } from "../EditCalendarPage";
import API_URL from "../../../config/apiConfig";
import { sendChangeRequest } from "./SendChangeRequest";
import MyAlertMui from "../../../components/MyAlertMui/MyAlertMui";

export default function MinMaxDay({miladiDate,staycode,handleClosePopover}) {
  const [loading, setLoading] = useState(false);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [showAlertSetting, setShowAlertSetting] = useState({
    show: false,
    status: "error",
    message: "خطای نامشخص",
  });
  const [validText, setValidText] = useState("");

  // alert
  const handleMangeAlert = (show, status, message) => {
    setShowAlertSetting({
      show,
      status,
      message,
    });
  };


  // api
  const handleChange= async () => {
    if (!(min && !isNaN(Number(min)) && max && !isNaN(Number(max)))) {
      return setValidText("روز  را وارد کنید");
    }

    if (
      !miladiDate ||
      miladiDate.length < 2 ||
      !miladiDate[0] ||
      !miladiDate[1]
    )  {
      return setValidText("بازه تاریخی انتخاب نشده است");
    }

    setValidText("");
    setLoading(true);
//post api
    const result= await sendChangeRequest({
      HostTourGuid: staycode,
      State: 5,
      MinimumBookingDay: min,
      MaximumBookingDay: max,
      Start: miladiDate[0],
      End: miladiDate[1],
    });

    if(result){
      setLoading(false);
      
      setTimeout(() => {
        handleMangeAlert(true, "success", "عملیات با موفقیت انجام شد");
        setTimeout(() => {
          handleClosePopover();
        }, 3000);
      }, 1000);
    }
    else{
      setLoading(false);
      setTimeout(
        () => handleMangeAlert(true, "error", "عملیات با خطا مواجه شد"),
        1000
      );
    }

    // try {
    //   setValidText("");
    //   setLoading(true);
    //   const token = localStorage.getItem("access_token");
    //   const response = await axios.post(
    //     `${baseUrl}/PriceHostTour`,
    //     {
    //       HostTourGuid: staycode,
    //       State: 2,
    //       WeekendPrice: 0,
    //       WeekdayPrice: 0,
    //       AutumPrice: 0,
    //       OtherPrice: 0,
    //       PriceBase: 0,
    //       Start: handleDate(selectedDays[0]),
    //       End: handleDate(selectedDays[1]),
    //       NotAvailable: false,
    //       MonthlyDiscount: 0,
    //       WeeklyDiscount: 0,
    //       InstantBooking: 0,
    //       MinimumBookingDay: min,
    //       MaximumBookingDay: max,
    //       CharterNowDiscount: 1,
    //       CharterOneDayAgoDiscount: 1,
    //       CharterTwoDayAgoDiscount: 2,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );

    //   console.log(response.data);
    //   setLoading(false);
    //   setTimeout(
    //     () => handleMangeAlert(true, "success", "عملیات با موفقیت انجام  شد"),
    //     1000
    //   );
    //   return response.data;
    // } catch (error) {
    //   setLoading(false);
    //   console.log("Error:", error?.response);
    //   setTimeout(
    //     () => handleMangeAlert(true, "error", "عملیات با خطا مواجه شد"),
    //     1000
    //   );
    //   return error?.response?.data;
    // }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
          mt: 3,
          px: 1,
        }}
      >
        <TextField
          label="حداقل"
          variant="outlined"
          fullWidth
          value={min}
          onChange={(e) => {
            setMin(e.target.value);
          }}
        />

        <TextField
          label="حداکثر"
          variant="outlined"
          fullWidth
          value={max}
          onChange={(e) => {
            setMax(e.target.value);
          }}
        />

        <Typography
          color="error"
          sx={{ width: "100%", direction: "ltr" }}
          variant="body2"
        >
          {validText}
        </Typography>

        <CustomButton loading={loading} handleChange={handleChange} />

        {showAlertSetting?.show && (
          <MyAlertMui
            message={showAlertSetting?.message || ""}
            handleClose={() =>
              handleMangeAlert(
                false,
                showAlertSetting?.status,
                showAlertSetting?.message
              )
            }
            status={showAlertSetting?.status}
          />
        )}
      </Box>
    </>
  );
}
