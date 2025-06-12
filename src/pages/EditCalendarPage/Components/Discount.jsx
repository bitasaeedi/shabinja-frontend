import {
  Box,
  TextField,
  Typography,
} from "@mui/material";
import CustomButton from "./CustomButton";
import React, { useState } from "react";
import MyAlertMui from "../../../components/MyAlertMui/MyAlertMui";
import { sendChangeRequest } from "./SendChangeRequest";


export default function Discount({miladiDate,staycode,handleClosePopover}) {
  const [loading, setLoading] = useState(false);
  const [monthlyDiscount, setMonthlyDiscount] = useState("");
  const [weeklyDiscount, setWeeklyDiscount] = useState("");
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
  const handleChange = async () => {
    if (
      !(
        monthlyDiscount &&
        !isNaN(Number(monthlyDiscount)) &&
        weeklyDiscount &&
        !isNaN(Number(weeklyDiscount))
      )
    ) {
      return setValidText("قیمت  را وارد کنید");
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
      State: 2,
      MonthlyDiscount: monthlyDiscount,
      WeeklyDiscount: weeklyDiscount,
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
    //       MonthlyDiscount: monthlyDiscount,
    //       WeeklyDiscount: weeklyDiscount,
    //       InstantBooking: 0,
    //       MinimumBookingDay: 1,
    //       MaximumBookingDay: 1,
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
          label="هفتگی"
          variant="outlined"
          fullWidth
          value={monthlyDiscount}
          onChange={(e) => {
            setMonthlyDiscount(e.target.value);
          }}
        />

        <TextField
          label="ماهانه"
          variant="outlined"
          fullWidth
          value={weeklyDiscount}
          onChange={(e) => {
            setWeeklyDiscount(e.target.value);
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

        {/* show alert */}
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
