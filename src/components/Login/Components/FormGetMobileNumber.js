import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Button,
  Box,
  Link,
  CircularProgress,
} from "@mui/material";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import MyAlertMui from "../../MyAlertMui/MyAlertMui";
import { ApiCheckAndSms } from "../../../api/LoginApis";
import axios from "axios";
import API_URL from "../../../config/apiConfig";
const baseUrl = API_URL;

const FormGetMobileNumber = ({ callBack, getPhoneNumber }) => {
  //کال بک بررسی می کنه اگر شماره فرستاده شده باشه میره صحفه بعد
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  //alert
  const [showAlertSetting, setShowAlertSetting] = useState({
    show: false,
    status: "error",
    message: "خطای نامشخص",
  });

  const handleMangeAlert = (show, status, message) => {
    setShowAlertSetting({
      show: show || false,
      status: status || "error",
      message: message || "خطای نامشخص",
    });
  };

  const checkMobileNumber = async (phone) => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        `${baseUrl}/user/exist/${phone}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("my number", response?.data);
      let step =
        response?.data?.issuccess === true ? "stepPassword" : "stepCode";
      return step; // Return the step value
    } catch (error) {
      console.error("Error :", error?.response?.data || error.message);
      return error?.response?.data;
    }
  };
  // ارسال شماره موبایل حهت دریافت پیامک
  const onSubmit = async (data) => {
    getPhoneNumber(data?.phone);
    const step = await checkMobileNumber(data?.phone);
    console.log("step", step);
    if (step === "stepPassword") {
      callBack(data?.phone, "stepPassword");
    }
    else if(step === "stepCode"){
      onSubmit2(data?.phone)
    }
      
  };

  // handle set code
  const onSubmit2 = async (number) => {
    var resultCheckSms = {};
    resultCheckSms = await ApiCheckAndSms({
      UserName: number,
    });

    console.log("resultCheckSms", resultCheckSms);

    if (resultCheckSms?.data?.isActive === false) {
      console.log("حساب کاربری غیر فغال");
      handleMangeAlert(true, "error", "حساب کاربری شما غیر فعال است ");
    } else if (resultCheckSms?.issuccess) {
      callBack(resultCheckSms, "stepCode");
    } else {
      handleMangeAlert(
        true,
        resultCheckSms?.issuccess,
        resultCheckSms?.message
      );
    }
  };

  useEffect(() => {
    handleSubmit(onSubmit)();
    setFocus("phone");
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Grid
          item
          xs={12}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Typography variant="h6" color="dark" sx={{ mt: 2 }}>
            ورود یا ثبت‌نام
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              mt: 1,
              textAlign: "center",
              width: "100%",
            }}
          >
            برای ورود به شبینجا شماره همراه خود را وارد کنید.
          </Typography>

          <TextField
            fullWidth
            autoFocus
            variant="outlined"
            placeholder="09*********"
            {...register("phone", {
              required: true, //"لطفا شماره موبایل خود را وارد کنید",
              pattern: {
                value: /^09\d{9}$/,
                message: "شماره موبایل باید با 09 شروع شده و 11 رقم باشد",
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ color: "primary", mx: 0, ml: 2 }}
                >
                  <AppShortcutIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              input: { direction: "rtl", textAlign: "right" },
              mt: 3,
            }}
          />

          <Box sx={{ mt: 3, maxWidth: 400, minWidth: 300 }}>
            <Typography
              variant="body2"
              color="textSecondary"
              className="d-flex w-100 text-center"
              sx={{
                textAlign: "center",
              }}
            >
              <Box sx={{}} className=" w-100">
                <Typography
                  component="body2"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  ورود و ثبت‌نام در شبینجا به منزله‌ پذیرفتن
                </Typography>{" "}
                <br />
                <Link
                  href="#"
                  color="primary.light"
                  underline="hover"
                  target="_blank"
                  rel="noopener"
                >
                  قوانین و مقررات
                </Link>{" "}
                و{" "}
                <Link
                  href="#"
                  color="primary.light"
                  underline="hover"
                  target="_blank"
                  rel="noopener"
                >
                  قوانین حریم خصوصی
                </Link>{" "}
                می‌باشد.
              </Box>
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mb: 5, mt: 4, py: 1 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" /> // Spinner when loading
            ) : (
              <Typography variant="h6">ادامه</Typography> // Button text when not loading
            )}
          </Button>
        </Grid>
      </form>

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
    </>
  );
};

export default FormGetMobileNumber;
