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

const FormGetCode = ({
  callBack,
  mobileGettingSms,
  handleSetManageFormsSteps,
  handleResendCode,
  countdown,
  isResendEnabled = false,
}) => {
  const { register, handleSubmit, setValue, setFocus, getValues } = useForm();
  const inputsRef = useRef([]);

  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (data) => {
    setLoading(true);
    const code = Object.values(data).join("");
    var resultGetToken = {};
    // resultGetToken = await getProvinceList();
    resultGetToken = await ApiGetTokenShabinja({
      username: mobileGettingSms,
      password: parseFloat(code),
    });
    // console.log(resultGetToken, "resultGetToken");
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
            تایید شماره موبایل
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
          >
            کد 5 رقمی ارسال‌شده به شماره{" "}
            <strong className="px-1 font-weight-bold text-dark">
              {mobileGettingSms}
            </strong>{" "}
            را واردکنید.
          </Typography>

          <Grid
            dir="ltr"
            container
            className="d-flex justify-content-between py-2 "
            sx={{ mt: 2, maxWidth: 360 }}
            spacing={0}
          >
            {[0, 1, 2, 3, 4].map((index) => (
              <Grid
                key={index}
                item
                xs={"auto"}
                className="d-flex justify-content-center align-items-center"
              >
                <TextField
                  {...register(`code${index + 1}`, {
                    required: true,
                    pattern: /^[0-9]$/,
                  })}
                  autoComplete="one-time-code"
                  inputRef={(el) => (inputsRef.current[index] = el)}
                  variant="outlined"
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      fontSize: "20px", // Increase font size
                      // fontWeight: "bold", // Make font bold
                      fontFamily:
                        "'yakanBold','YekanBakhFaNum', Tahoma, Arial, sans-serif",
                    },
                    inputMode: "numeric",
                  }}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onFocus={(e) => handleFocus(index, e)}
                  sx={{
                    width: "55px",
                    height: "40px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                      {
                        display: "none",
                      },
                    "& input[type=number]": {
                      MozAppearance: "textfield",
                    },
                    "@media (max-width: 355px)": {
                      width: "37px", // Further reduce width for very small screens
                      height: "20px", // Further reduce height for very small screens
                      maxHeight: 20,
                      minHeight: 20,
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="text"
              color="primary"
              onClick={() => handleSetManageFormsSteps("stepPassword")}
              size="small"
            >
              ورود با رمز عبور
            </Button>
          </Box>
          <Box sx={{ mt: 2, maxWidth: 400, minWidth: 300 }}>
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
            sx={{ mt: 4, py: 1 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" /> // Spinner when loading
            ) : (
              <Typography variant="h6">ادامه</Typography> // Button text when not loading
            )}
          </Button>
          <Box sx={{ textAlign: "center", mt: 2, mb: 5 }}>
            {isResendEnabled ? (
              <Button
                variant="text"
                color="primary"
                startIcon={<ReplayIcon />}
                onClick={handleResendCode}
                disabled={loading}
              >
                دریافت دوباره کد
              </Button>
            ) : (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: "small" }}
                className="d-flex align-items-center"
              >
                <Typography variant="body2">دریافت دوباره کد تا</Typography>
                <Typography variant="h6" className="mx-1">
                  {countdown}
                </Typography>
                <Typography variant="body2"> ثانیه دیگر</Typography>
              </Typography>
            )}
          </Box>
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

export default FormGetCode;
