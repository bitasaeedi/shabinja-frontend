import React, { useState, useEffect } from "react";
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
} from "../../../../../../api/Users.api";
import { GetShamsiDateDetails } from "../../../../../../components/DateFunctions/DateFunctions";

const FormProfile = () => {
  const [profileImage, setProfileImage] = useState(null);

  const defaultValues = {
    name: "محمد",
    lastName: "محمدی",
    nation: "1234567890",
    sms: "09123456789",
    email: "example@example.com",
    birthday: "1403/03/01",
    password: "",
    passwordrepeat: "",
    aboutMe: "این یک متن تستی برای اینپوت درباره من میباشد",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});

  useEffect(() => {
    // Set default values on component mount

    handleGetUserInfo();
  }, []);

  const handleGetUserInfo = async () => {
    try {
      const userData = await UserSearchOneApi();
      console.log(userData, "userData");
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
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleProfileImageUpload = async () => {
    if (profileImage) {
      const formData = new FormData();
      formData.append("profileImage", profileImage);
    }
  };

  const onSubmit = async (data) => {
    const myData = {
      // sex: data?.sex,
      firstName: data?.name,
      lastName: data?.lastName,
      // userName: data?.userName,
      // password: data?.password,
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

    console.log(data, "onSubmit", myData);
    const result = await UserUpdateApi(myData);
    handleGetUserInfo();
    console.log("result update:", result);
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
                  src={profileImage ? profileImage : ""}
                >
                  م
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
                  // required: "نام الزامی است"
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
                  // required: "نام خانوادگی الزامی است",
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
                  // required: "کد ملی الزامی است"
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
                  // required: "شماره موبایل الزامی است"
                })}
                error={!!errors.sms}
                helperText={errors.sms?.message}
                size="small"
                InputLabelProps={{ shrink: true }}
                // disabled
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
              <TextField
                label="تاریخ تولد"
                fullWidth
                {...register("birthday", {
                  //  required: "تاریخ تولد الزامی است"
                })}
                error={!!errors.birthday}
                helperText={errors.birthday?.message}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </Grid>

            {/* رمز عبور */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <TextField
                label="رمز عبور"
                fullWidth
                {...register("password", {
                  //  required: "  الزامی است"
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                size="small"
                type={"password"}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* تکرار رمز عبور */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
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
            </Grid>

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
                // fullWidth
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
    </Box>
  );
};

export default FormProfile;
