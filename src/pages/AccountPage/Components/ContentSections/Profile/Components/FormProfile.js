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
import { UserSearchOneApi } from "../../../../../../api/Users.api";

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
  } = useForm({ defaultValues });

  useEffect(() => {
    // Set default values on component mount
    for (let key in defaultValues) {
      setValue(key, defaultValues[key]);
    }
    handleGetUserInfo();
  }, [setValue]);

  const handleGetUserInfo = async () => {
    const userData = await UserSearchOneApi();
    console.log("userData", userData);
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

      try {
        // Replace with your API endpoint
        const response = await fetch("/api/upload-profile-image", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const onSubmit = (data) => {
    console.log(data);
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
                    background: 'linear-gradient(135deg, #287dfa, #6a11cb)',
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
                {...register("name", { required: "نام الزامی است" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                size="small"
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
                {...register("nation", { required: "کد ملی الزامی است" })}
                error={!!errors.nation}
                helperText={errors.nation?.message}
                size="small"
              />
            </Grid>

            {/* شماره موبایل */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <TextField
                label="شماره موبایل"
                fullWidth
                {...register("sms", { required: "شماره موبایل الزامی است" })}
                error={!!errors.sms}
                helperText={errors.sms?.message}
                size="small"
                disabled
              />
            </Grid>

            {/* ایمیل */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <TextField
                label="ایمیل"
                fullWidth
                {...register("email", { required: "ایمیل الزامی است" })}
                error={!!errors.email}
                helperText={errors.email?.message}
                size="small"
              />
            </Grid>

            {/* تاری تولد */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <TextField
                label="تاریخ تولد"
                fullWidth
                {...register("birthday", { required: "تاریخ تولد الزامی است" })}
                error={!!errors.birthday}
                helperText={errors.birthday?.message}
                size="small"
              />
            </Grid>

            {/* رمز عبور */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <TextField
                label="رمز عبور"
                fullWidth
                {...register("password", { required: "  الزامی است" })}
                error={!!errors.password}
                helperText={errors.password?.message}
                size="small"
                type={"password"}
              />
            </Grid>

            {/* تکرار رمز عبور */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <TextField
                label="تکرار رمز عبور"
                fullWidth
                {...register("passwordrepeat", { required: " الزامی است" })}
                error={!!errors.passwordrepeat}
                helperText={errors.passwordrepeat?.message}
                size="small"
                type={"password"}
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
              <Button
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
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default FormProfile;
