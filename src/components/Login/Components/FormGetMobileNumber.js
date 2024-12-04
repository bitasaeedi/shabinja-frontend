import React, { useEffect, useCallback, useState } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import MyAlertMui from "../../MyAlertMui/MyAlertMui";
import { ApiCheckAndSms } from "../../../api/LoginApis";

const FormGetMobileNumber = ({ callBack }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();
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

  // ارسال شماره موبایل حهت دریافت پیامک
  const onSubmit = async (data) => {
    setLoading(true);

    var resultCheckSms = {
      // data: {
      //   userName: "09934623142",
      // },
    };
    resultCheckSms = await ApiCheckAndSms({
      UserName: data?.phone,
    });
    // console.log(resultCheckSms, "resultCheckSms");
    setLoading(false);
    if (resultCheckSms?.issuccess) {
      callBack(resultCheckSms);
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
              textAlign: "center", // Centers the text
              width: "100%", // Ensure it takes full width to center properly
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
              required: "لطفا شماره موبایل خود را وارد کنید",
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

          <Box sx={{ mt: 3 }}>
            <Typography
              variant="p"
              color="dark"
              className="d-flex w-100 text-center"
            >
              <Box>
                <Typography component="span">
                  ورود و ثبت‌نام در شبینجا به منزله‌ پذیرفتن
                </Typography>{" "}
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
