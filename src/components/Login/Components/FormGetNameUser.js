import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Box,
  Link,
  CircularProgress,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { ApiCheckAndSms, ApiGetTokenShabinja } from "../../../api/LoginApis";
import MyAlertMui from "../../MyAlertMui/MyAlertMui";

const FormGetNameUser = ({
  callBack,
  initialCountdown = 120,
  mobileGettingSms,
}) => {
  const { register, handleSubmit, setValue, setFocus, getValues } = useForm();
  const inputsRef = useRef([]);

  const [countdown, setCountdown] = useState(initialCountdown);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showAlertSetting, setShowAlertSetting] = useState({
    show: false,
    status: "error",
    message: "خطای نامشخص",
  });

  // Start countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsResendEnabled(true); // Enable the "Resend Code" button when countdown reaches zero
    }
  }, [countdown]);

  const handleMangeAlert = (show, status, message) => {
    setShowAlertSetting({
      show: show || false,
      status: status || "error",
      message: message || "خطای نامشخص",
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const code = Object.values(data).join("");
    var resultGetToken = {};
    // resultGetToken = await getProvinceList();
    resultGetToken = await ApiGetTokenShabinja({
      username: mobileGettingSms,
      password: parseFloat(code),
    });
    console.log(resultGetToken, "resultGetToken");
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
      callBack(resultGetToken);
    } else {
    }
    setLoading(false);
  };

  const handleChange = (index, e) => {
    const { value } = e.target;
    if (/^\d$/.test(value)) {
      setValue(`code${index + 1}`, value);
      if (index < 4) {
        setFocus(`code${index + 2}`);
      } else {
        handleSubmit(onSubmit)();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      setFocus(`code${index}`);
    }
  };

  const handleFocus = (index, event) => {
    const values = getValues();
    for (let i = 0; i < index; i++) {
      if (!values[`code${i + 1}`]) {
        event.preventDefault();
        setFocus(`code${i + 1}`);
        return;
      }
    }
  };

  // ارسال محدد کد پیامکی
  const handleResendCode = async () => {
    setIsResendEnabled(false); // Disable the "Resend Code" button again
    var resultCheckSms = await ApiCheckAndSms({
      UserName: mobileGettingSms,
    });
    // console.log(resultCheckSms, "handleResendCode");
    setCountdown(initialCountdown); // Reset the countdown timer
  };

  useEffect(() => {
    setFocus("code1");
  }, [setFocus]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", maxWidth: "400px" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <Grid
          item
          xs={12}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Typography variant="h6" color="dark" sx={{ mt: 2 }}>
            تکمیل اطلاعات پروفایل
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              mt: 1,
              display: "flex", // Flex container to align elements inline
              justifyContent: "center", // Center the content
              textAlign: "center", // Ensures text is centered when wrapped
              width: "100%", // Full width to center content
              flexWrap: "wrap", // Allow text to wrap if necessary
            }}
          ></Typography>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 4, py: 1 }}
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

export default FormGetNameUser;
