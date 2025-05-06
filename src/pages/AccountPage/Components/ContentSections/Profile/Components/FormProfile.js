import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import ClearIcon from "@mui/icons-material/Clear";
import {
  UserSearchOneApi,
  UserUpdateApi,
  UserUpdateImage,
} from "../../../../../../api/Users.api";
import { GetShamsiDateDetails } from "../../../../../../components/DateFunctions/DateFunctions";
import MyAlertMui from "../../../../../../components/MyAlertMui/MyAlertMui";
import { AppContext } from "../../../../../../App";
import { DownloadImageApi } from "../../../../../../api/DownloadImageApi";
import { getValue } from "@testing-library/user-event/dist/utils";
import InputMask from "react-input-mask";

const FormProfile = () => {
  const appContext = useContext(AppContext);
  const [profileImage, setProfileImage] = useState(null);
  const [imageToUploade, setImageToUploade] = useState(null);
  const [showAlertSetting, setShowAlertSetting] = useState({
    show: false,
    status: "error",
    message: "خطای نامشخص",
  });
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({});

  useEffect(() => {
    // Set default values on component mount

    handleGetUserInfo();
  }, []);

  const handleGetUserInfo = async () => {
    try {
      setLoadingForm(true);
      appContext?.handleGetInfoUser();
      const userData = await UserSearchOneApi();
      // console.log(userData, "userData");
      const profile = userData?.data;
      if (profile) {
        const shamsiObject = GetShamsiDateDetails(profile.birthDay);
        setValue("name", profile.firstName || "");
        setValue("lastName", profile.lastName || "");
        setValue("nation", profile.nationalCode || "");
        setValue("sms", profile.mobile || "");
        setValue("email", profile.email || "");
        setValue("birthday", shamsiObject?.fullshamsi || "");
        setValue("aboutMe", profile.aboutMe || ""); // If `aboutMe` exists
        setValue("password", profile.password || "");
        setValue("passwordrepeat", profile.password || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoadingForm(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file

    if (!file) {
      console.error("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const fileData = {
        fileName: file.name, // File name
        extension: `.${file.name.split(".").pop()}`, // File extension
        size: file.size, // File size in bytes
        data: reader.result, // Base64 encoded data
      };

      // console.log(fileData, "fileData"); // Log the fileData object
      setImageToUploade(fileData); // Set the fileData to state or wherever you need it
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file); // Read the file as a Data URL (base64)

    // Preview the selected image
    setProfileImage(URL.createObjectURL(file));
  };

  const handleProfileImageUpload = async () => {
    setLoadingImage(true);
    if (imageToUploade) {
      const myData = {
        image: imageToUploade,
      };
      const result = await UserUpdateImage(myData);
      handleGetUserInfo();

      if (result?.issuccess) {
        handleMangeAlert(
          true,
          "success",
          result?.message || "Image uploaded successfully"
        );
      } else {
        handleMangeAlert(true, "error", result?.message || "Upload failed");
      }
      setImageToUploade(null);
      setProfileImage(null);
    }
    setLoadingImage(false);
  };

  const onSubmit = async (data) => {
    setLoadingForm(true);
    const myData = {
      // sex: data?.sex,
      firstName: data?.name,
      lastName: data?.lastName,
      // userName: data?.userName,
      password: data?.password,
      nationalCode: data?.nation,
      // zipCode: data?.zipCode,
      // fatherName: data?.fatherName,
      // phone: data?.phone,
      mobile: data?.sms,
      email: data?.email,
      birthDay: data?.birthday, // شمسی
      // address: data?.address,
      // certificateId: data?.certificateId,
      // cityId: data?.cityId,
      // methodOfIntroduction: data?.methodOfIntroduction,
    };

    const result = await UserUpdateApi(myData);
    if (result?.issuccess) {
      handleMangeAlert(
        true,
        "success",
        result?.message || "Image uploaded successfully"
      );
    } else {
      handleMangeAlert(true, "error", result?.message || "Upload failed");
    }
    handleGetUserInfo();
    // setLoadingForm(false);
  };

  const handleMangeAlert = (show, status, message) => {
    setShowAlertSetting({
      show,
      status,
      message,
    });
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "100%" },
        mx: "auto",
      }}
    >
      <Typography
        variant="h6"
        align="right"
        gutterBottom
        sx={{
          fontSize: "18px",
          display: { xs: "none", md: "flex" },
        }}
      >
        حساب کاربری
      </Typography>
      <Box
        sx={{
          p: 3,
          // backgroundColor:"#f9f9f9"
        }}
        className="shadow border rounded"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sx={{
                mb: 4,
              }}
            >
              <Box
                sx={{
                  color: "black",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  mx: 0,
                }}
              >
                <Avatar
                  sx={{
                    background: "linear-gradient(135deg, #287dfa, #6a11cb)",
                  }}
                  src={
                    profileImage
                      ? profileImage
                      : appContext?.userInfo?.imageUrl
                      ? DownloadImageApi(appContext?.userInfo?.imageUrl)
                      : ""
                  }
                >
                  {appContext?.userInfo?.name[0]}
                </Avatar>

                <Box
                  sx={{
                    ml: 1,
                  }}
                >
                  {!profileImage && (
                    <Button
                      variant="text"
                      startIcon={<EditIcon />}
                      onClick={() =>
                        document.getElementById("profileImageInput").click()
                      }
                      disabled={loadingImage}
                    >
                      ویرایش تصویر پروفایل
                    </Button>
                  )}
                  <input
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  {profileImage && (
                    <Button
                      variant="text"
                      color="primary"
                      onClick={handleProfileImageUpload}
                      startIcon={<UploadIcon sx={{ fontSize: 12 }} />}
                    >
                      ارسال تصویر
                    </Button>
                  )}
                  {profileImage && (
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => setProfileImage(null)}
                      startIcon={<ClearIcon sx={{ fontSize: 12 }} />}
                    >
                      انصراف
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>

            {/* نام */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <TextField
                label="نام"
                fullWidth
                {...register("name", {
                  required: "نام الزامی است",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* نام خانوادگی */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <TextField
                label="نام خانوادگی"
                fullWidth
                {...register("lastName", {
                  required: "نام خانوادگی الزامی است",
                })}
                InputLabelProps={{ shrink: true }}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                size="small"
              />
            </Grid>

            {/* کد ملی */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <TextField
                label="کد ملی"
                fullWidth
                {...register("nation", {
                  required: "کد ملی الزامی است",
                })}
                error={!!errors.nation}
                helperText={errors.nation?.message}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* شماره موبایل */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <TextField
                label="شماره موبایل"
                fullWidth
                {...register("sms", {
                  required: "شماره موبایل الزامی است",
                })}
                error={!!errors.sms}
                helperText={errors.sms?.message}
                size="small"
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </Grid>

            {/* ایمیل */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <TextField
                label="ایمیل"
                fullWidth
                {...register("email", {
                  // required: "ایمیل الزامی است"
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </Grid>

            {/* تاری تولد */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              {/* <InputMask
                mask="9999/99/99"
                maskChar={null}
                {...register("birthday", {
                  required: "تاریخ تولد الزامی است",
                })}
              > */}
                {/* {() => ( */}
                  <TextField
                    {...register("birthday", {
                      required: "تاریخ تولد الزامی است",
                    })}
                    label="تاریخ تولد"
                    fullWidth
                    error={!!errors.birthday}
                    helperText={errors.birthday?.message}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    // dir="ltr"
                  />
                {/* )} */}
              {/* </InputMask> */}
            </Grid>

            {/* رمز عبور */}
            {/* <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <TextField
                label="رمز عبور جدید(اختیاری)"
                fullWidth
                {...register("password", {
              
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                size="small"
                type={"password"}
                InputLabelProps={{ shrink: true }}
              />
            </Grid> */}

            {/* تکرار رمز عبور */}
            {/* <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <TextField
                label="تکرار رمز عبور"
                fullWidth
                {...register("passwordrepeat", {
                  // required: " الزامی است"
                })}
                error={!!errors.passwordrepeat}
                helperText={errors.passwordrepeat?.message}
                size="small"
                type={"password"}
                InputLabelProps={{ shrink: true }}
              />
            </Grid> */}

            {/* درباره من */}
            <Grid item xs={12} sx={{ py: 3 }}>
              <TextField
                label="درباره من"
                fullWidth
                {...register("aboutMe")}
                size="small"
                multiline
                rows={4}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid
              item
              xs={12}
              sx={{ py: 3 }}
              className="d-flex justify-content-end"
            >
              <Button
                type="submit"
                variant="contained"
                // color="primary"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  width: "auto",
                }}
                disabled={loadingForm}
              >
                ثبت اطلاعات
              </Button>
              {/* <Button
                variant="contained"
                // color="secondary"
                sx={{
                  backgroundColor: "#e9e9e9",
                  color: "black",
                  width: "auto",
                  mx: 2,
                }}
              >
                انصراف
              </Button> */}
            </Grid>
          </Grid>
        </form>
      </Box>

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

export default FormProfile;
