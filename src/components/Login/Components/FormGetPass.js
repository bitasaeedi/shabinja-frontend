import React, { useContext, useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MyAlertMui from "../../MyAlertMui/MyAlertMui";
import { ApiCheckAndSms, ApiGetTokenShabinja } from "../../../api/LoginApis";
import { LoginFormContext } from "../LoginForm";

const FormGetPass = ({
  callBack,
  handleSetManageFormsSteps,
  mobileGettingSms,
}) => {
  const { phoneNumber, handleSetCountDown } = useContext(LoginFormContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

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

  // ارسال پسورد
  const onSubmit = async (data) => {
    setLoading(true);
    var resultGetToken = {};
    resultGetToken = await ApiGetTokenShabinja({
      username: phoneNumber,
      password: data?.pass,
      otp: false,
    });
    // console.log(mobileGettingSms, data?.pass, "resultGetToken");
    handleMangeAlert(true, resultGetToken?.issuccess, resultGetToken?.message);
    if (resultGetToken?.issuccess === true) {
      // ذخیره اطلاهات در توکت برای استفاده در api ها
      const { access_token, expires_in, refresh_token, role, guid, id } =
        resultGetToken?.data;

      // محاسبه زمان انقضای توکن
      const expirationTime = new Date().getTime() + expires_in * 1000; // `expires_in` برحسب ثانیه است
      // ذخیره‌سازی اطلاعات در localStorage
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expires_in", expirationTime);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("role", role);
      localStorage.setItem("guid", guid);
      localStorage.setItem("user_id", id);
      callBack(resultGetToken, "finish");
    }
    setLoading(false);
  };

  const onSubmit2 = async (data) => {
    setDisableBtn(true);
    var resultCheckSms = {};
    resultCheckSms = await ApiCheckAndSms({
      UserName: phoneNumber,
    });
    setDisableBtn(false);
    console.log("resultCheckSms", resultCheckSms);

    if (resultCheckSms?.data?.isActive === false) {
      console.log("حساب کاربری غیر فغال");
      handleMangeAlert(true, "error", "حساب کاربری شما غیر فعال است ");

    } else if (resultCheckSms?.issuccess) {

      if (resultCheckSms?.statuscode === 0) {
        handleSetCountDown(120);
      }
      callBack(resultCheckSms, "stepCode");
      
    } else {
      handleMangeAlert(
        true,
        resultCheckSms?.issuccess,
        resultCheckSms?.message
      );
    }
  };

  useEffect(() => {}, []);

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
            ورود با رمز عبور
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              mt: 1,
              textAlign: "center", // Centers the text
              width: "100%", // Ensure it takes full width to center properly
            }}
          >
            برای ورود به شبینجا رمز عبور خود را وارد کنید.
          </Typography>

          <TextField
            fullWidth
            autoFocus
            variant="outlined"
            placeholder="رمز عبور خود را وارد نمایید"
            {...register("pass", {
              required: true, //"لطفا شماره موبایل خود را وارد کنید",
            })}
            // type={"password"}
            type={showPassword ? "text" : "password"}
            InputProps={{
              // startAdornment: (
              //   <InputAdornment
              //     position="start"
              //     sx={{ color: "primary", mx: 0 }}
              //   >
              //     <HttpsOutlinedIcon />
              //   </InputAdornment>
              // ),
              endAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ color: "primary", mx: 0, ml: 2 }}
                >
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="start"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              input: { direction: "rtl", textAlign: "right" },
              mt: 3,
            }}
          />
          <Box sx={{ mt: 1 }}>
            <Button
              variant="text"
              color="primary"
              onClick={() => onSubmit2()}
              size="small"
              disabled={disableBtn}
            >
              ورود با کد یک‌بار مصرف
            </Button>
          </Box>

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
                <Typography variant="body1">
                  ورود و ثبت‌نام در شبینجا
                </Typography>
                <Typography
                  component="body2"
                  sx={{
                    textAlign: "center",
                    display: "inline-block",
                  }}
                >
                  به منزله‌ پذیرفتن
                </Typography>{" "}
                <Link
                  href="https://shabinja.com/about"
                  color="primary.light"
                  underline="hover"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    display: "inline-block",
                  }}
                >
                  قوانین و مقررات
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
              <Typography variant="h6">تایید</Typography> // Button text when not loading
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

export default FormGetPass;
