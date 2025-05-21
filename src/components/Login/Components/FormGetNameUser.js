import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import MyAlertMui from "../../MyAlertMui/MyAlertMui";
import { UserUpdateApi } from "../../../api/Users.api";

const FormGetNameUser = ({ handleSetManageFormsSteps, mobileGettingSms }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
    try {
      const myData = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        mobile: mobileGettingSms,
        // nationalCode: "0000000000",
      };
      const result = await UserUpdateApi(myData);
      console.log(result, "User data:", myData);
      // Here you would typically send data to your API
      if (result?.issuccess) {
        handleSetManageFormsSteps("finish");
      } else {
        handleMangeAlert(true, "error", "خطا در ثبت اطلاعات");
      }
    } catch (error) {
      handleMangeAlert(true, "error", "خطا در ثبت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "400px",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: 8,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Typography
          variant="h6"
          color="dark"
          sx={{ mb: 3, textAlign: "center" }}
        >
          تکمیل اطلاعات پروفایل
        </Typography>
        {/* First Name Field */}
        <TextField
          fullWidth
          label="نام"
          variant="outlined"
          sx={{ mb: 4 }}
          {...register("firstName", {
            required: "وارد کردن نام الزامی است",
            minLength: {
              value: 2,
              message: "نام باید حداقل ۲ حرف باشد",
            },
          })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />

        {/* Last Name Field */}
        <TextField
          fullWidth
          label="نام خانوادگی"
          variant="outlined"
          sx={{ mb: 5 }}
          {...register("lastName", {
            required: "وارد کردن نام خانوادگی الزامی است",
            minLength: {
              value: 2,
              message: "نام خانوادگی باید حداقل ۲ حرف باشد",
            },
          })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <Typography variant="h6">ثبت اطلاعات</Typography>
          )}
        </Button>
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
    </Box>
  );
};

export default FormGetNameUser;
