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
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";

const FormGetPass = ({ callBack, handleSetManageFormsSteps }) => {
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

  // ارسال پسورد
  const onSubmit = async (data) => {
    setLoading(true);

    // var resultCheckPass = {};
    // resultCheckPass = await ApiCheckAndSms({
    //   password: data?.password,
    // });
    // console.log(resultCheckPass, "resultCheckPass");
    // setLoading(false);
    // if (resultCheckPass?.issuccess) {
    //   callBack(resultCheckPass);
    // } else {
    //   handleMangeAlert(
    //     true,
    //     resultCheckPass?.issuccess,
    //     resultCheckPass?.message
    //   );
    // }
  };

  useEffect(() => {
    // handleSubmit(onSubmit)();
    // setFocus("password");
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
            type={"text"}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ color: "primary", mx: 0, ml: 2 }}
                >
                  <HttpsOutlinedIcon />
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
              onClick={() => handleSetManageFormsSteps("stepCode")}
              size="small"
            >
              ورود با کد یک‌بار مصرف
            </Button>
          </Box>
          <Box sx={{ mt: 1, maxWidth: 400, minWidth: 300 }}>
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
