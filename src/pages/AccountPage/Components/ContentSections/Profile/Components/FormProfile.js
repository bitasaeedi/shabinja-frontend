import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
  InputAdornment,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import ClearIcon from "@mui/icons-material/Clear";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  UserDeleteImageApi,
  UserSearchOneApi,
  UserUpdateApi,
  UserUpdateImage,
} from "../../../../../../api/Users.api";
import { GetShamsiDateDetails } from "../../../../../../components/DateFunctions/DateFunctions";
import MyAlertMui from "../../../../../../components/MyAlertMui/MyAlertMui";
import { AppContext } from "../../../../../../App";
import { DownloadImageApi } from "../../../../../../api/DownloadImageApi";
import InputMask from "react-input-mask";
import { Delete } from "@mui/icons-material";

const FormProfile = () => {
  const appContext = useContext(AppContext);
  const [profileImage, setProfileImage] = useState(null);
  const [imageToUpload, setImageToUpload] = useState(null);
  const [showAlertSetting, setShowAlertSetting] = useState({
    show: false,
    status: "error",
    message: "خطای نامشخص",
  });
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password", "");

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  const handleGetUserInfo = async () => {
    try {
      setLoadingForm(true);
      appContext?.handleGetInfoUser();
      const userData = await UserSearchOneApi();
      const profile = userData?.data;

      if (profile) {
        const shamsiObject = GetShamsiDateDetails(profile.birthDay);
        setValue("name", profile.firstName || "");
        setValue("lastName", profile.lastName || "");
        setValue("nation", profile.nationalCode || "");
        setValue("sms", profile.mobile || "");
        setValue("email", profile.email || "");
        setValue("birthday", shamsiObject?.fullshamsi || "");
        setValue("aboutMe", profile.aboutMe || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      handleManageAlert(true, "error", "خطا در دریافت اطلاعات کاربر");
    } finally {
      setLoadingForm(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      handleManageAlert(true, "error", "فرمت تصویر باید JPG, PNG یا GIF باشد");
      return;
    }

    if (file.size > maxSize) {
      handleManageAlert(
        true,
        "error",
        "حجم تصویر نباید بیشتر از 2 مگابایت باشد"
      );
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageToUpload({
        fileName: file.name,
        extension: `.${file.name.split(".").pop()}`,
        size: file.size,
        data: reader.result,
      });
    };
    reader.onerror = () => {
      handleManageAlert(true, "error", "خطا در خواندن فایل تصویر");
    };
    reader.readAsDataURL(file);
    setProfileImage(URL.createObjectURL(file));
  };

  const handleProfileImageUpload = async () => {
    setLoadingImage(true);
    try {
      if (imageToUpload) {
        const result = await UserUpdateImage({ image: imageToUpload });
        handleGetUserInfo();
        handleManageAlert(
          true,
          result?.issuccess ? "success" : "error",
          result?.message ||
            (result?.issuccess
              ? "تصویر با موفقیت آپلود شد"
              : "خطا در آپلود تصویر")
        );
        setImageToUpload(null);
        setProfileImage(null);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      handleManageAlert(true, "error", "خطا در آپلود تصویر");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleDeleteImageProfile = async () => {
    setLoadingImage(true);
    try {
      const result = await UserDeleteImageApi();
      handleGetUserInfo();
      handleManageAlert(
        true,
        result?.issuccess ? "success" : "error",
        result?.message ||
          (result?.issuccess ? "تصویر با موفقیت حذف شد" : "خطا در حذف تصویر")
      );
      setImageToUpload(null);
      setProfileImage(null);
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting image:", error);
      handleManageAlert(true, "error", "خطا در حذف تصویر");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const onSubmit = async (data) => {
    setLoadingForm(true);
    try {
      const result = await UserUpdateApi({
        firstName: data.name,
        lastName: data.lastName,
        password: data.password || undefined,
        nationalCode: data.nation,
        mobile: data.sms,
        email: data.email,
        birthDay: data.birthday,
      });

      handleManageAlert(
        true,
        result?.issuccess ? "success" : "error",
        result?.message ||
          (result?.issuccess
            ? "اطلاعات با موفقیت ذخیره شد"
            : "خطا در ذخیره اطلاعات")
      );
      appContext?.handleGetInfoUser();
    } catch (error) {
      console.error("Error updating user:", error);
      handleManageAlert(true, "error", "خطا در ذخیره اطلاعات");
    } finally {
      setLoadingForm(false);
    }
  };

  const handleManageAlert = (show, status, message) => {
    setShowAlertSetting({ show, status, message });
  };

  const validateNationalCode = (value) => {
    if (!value) return "کد ملی الزامی است";
    if (!/^\d{10}$/.test(value)) return "کد ملی باید 10 رقم باشد";
    return true;
  };

  const validateMobile = (value) => {
    if (!value) return "شماره موبایل الزامی است";
    if (!/^09\d{9}$/.test(value)) return "شماره موبایل معتبر نیست";
    return true;
  };

  const validateEmail = (value) => {
    if (!value) return true;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return "ایمیل معتبر نیست";
    }
    return true;
  };

  const validatePassword = (value) => {
    if (!value) return true;
    if (value.length < 8) return "رمز عبور باید حداقل 8 کاراکتر باشد";
    if (!/[A-Z]/.test(value))
      return "رمز عبور باید شامل حداقل یک حرف بزرگ باشد";
    if (!/[a-z]/.test(value))
      return "رمز عبور باید شامل حداقل یک حرف کوچک باشد";
    if (!/[0-9]/.test(value)) return "رمز عبور باید شامل حداقل یک عدد باشد";
    if (!/[!@#$%^&*]/.test(value))
      return "رمز عبور باید شامل حداقل یک کاراکتر خاص (!@#$%^&*) باشد";
    return true;
  };

  const validateConfirmPassword = (value) => {
    if (!password) return true;
    return value === password || "رمزهای عبور مطابقت ندارند";
  };

  return (
    <Box sx={{ width: { xs: "100%", md: "100%" }, mx: "auto" }}>
      <Typography
        variant="h6"
        align="right"
        gutterBottom
        sx={{ fontSize: "18px", display: { xs: "none", md: "flex" } }}
      >
        حساب کاربری
      </Typography>

      <Box sx={{ p: 3 }} className="shadow border rounded">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Profile Image Section */}
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    background: "linear-gradient(135deg, #287dfa, #6a11cb)",
                  }}
                  src={
                    profileImage ||
                    (appContext?.userInfo?.imageUrl &&
                      DownloadImageApi(appContext.userInfo.imageUrl))
                  }
                >
                  {appContext?.userInfo?.name[0]}
                </Avatar>

                <Box
                  sx={{
                    ml: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {!profileImage ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                      }}
                    >
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() =>
                          document.getElementById("profileImageInput").click()
                        }
                        disabled={loadingImage}
                      >
                        ویرایش تصویر پروفایل
                      </Button>
                      {appContext?.userInfo?.imageUrl && (
                        <Button
                          variant="text"
                          color="error"
                          startIcon={<Delete />}
                          onClick={handleOpenDeleteDialog}
                          disabled={loadingImage}
                          size="small"
                        >
                          حذف تصویر
                        </Button>
                      )}
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleProfileImageUpload}
                        size="small"
                        startIcon={
                          loadingImage ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <UploadIcon />
                          )
                        }
                        disabled={loadingImage}
                      >
                        ارسال تصویر
                      </Button>
                      <Button
                        variant="text"
                        color="error"
                        onClick={() => setProfileImage(null)}
                        startIcon={<ClearIcon />}
                        disabled={loadingImage}
                        size="small"
                      >
                        انصراف
                      </Button>
                    </Box>
                  )}
                  <input
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Name */}
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "نام الزامی است",
                  minLength: {
                    value: 2,
                    message: "نام باید حداقل 2 کاراکتر باشد",
                  },
                  maxLength: {
                    value: 50,
                    message: "نام نمی‌تواند بیشتر از 50 کاراکتر باشد",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="نام"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                )}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} md={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: "نام خانوادگی الزامی است",
                  minLength: {
                    value: 2,
                    message: "نام خانوادگی باید حداقل 2 کاراکتر باشد",
                  },
                  maxLength: {
                    value: 50,
                    message: "نام خانوادگی نمی‌تواند بیشتر از 50 کاراکتر باشد",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="نام خانوادگی"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                )}
              />
            </Grid>

            {/* National Code */}
            <Grid item xs={12} md={6}>
              <Controller
                name="nation"
                control={control}
                rules={{
                  required: "کد ملی الزامی است",
                  validate: validateNationalCode,
                }}
                render={({ field }) => (
                  <InputMask mask="9999999999" {...field}>
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        label="کد ملی"
                        fullWidth
                        error={!!errors.nation}
                        helperText={errors.nation?.message}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                      />
                    )}
                  </InputMask>
                )}
              />
            </Grid>

            {/* Mobile Number */}
            <Grid item xs={12} md={6}>
              <Controller
                name="sms"
                control={control}
                rules={{
                  required: "شماره موبایل الزامی است",
                  validate: validateMobile,
                }}
                render={({ field }) => (
                  <InputMask mask="09999999999" {...field}>
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        label="شماره موبایل"
                        fullWidth
                        error={!!errors.sms}
                        helperText={errors.sms?.message}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                      />
                    )}
                  </InputMask>
                )}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                rules={{ validate: validateEmail }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="ایمیل"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                )}
              />
            </Grid>

            {/* Birth Date */}
            <Grid item xs={12} md={6}>
              <Controller
                name="birthday"
                control={control}
                rules={{ required: "تاریخ تولد الزامی است" }}
                render={({ field }) => (
                  <InputMask mask="9999/99/99" {...field}>
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        label="تاریخ تولد"
                        fullWidth
                        error={!!errors.birthday}
                        helperText={errors.birthday?.message}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                      />
                    )}
                  </InputMask>
                )}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12} md={6}>
              <Controller
                name="password"
                control={control}
                rules={{ validate: validatePassword }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="رمز عبور جدید (اختیاری)"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            {/* Confirm Password */}
            <Grid item xs={12} md={6}>
              <Controller
                name="passwordrepeat"
                control={control}
                rules={{ validate: validateConfirmPassword }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="تکرار رمز عبور"
                    fullWidth
                    type={showConfirmPassword ? "text" : "password"}
                    error={!!errors.passwordrepeat}
                    helperText={errors.passwordrepeat?.message}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    minWidth: 120,
                    "&:hover": { backgroundColor: "#333" },
                  }}
                  disabled={loadingForm}
                  startIcon={
                    loadingForm && (
                      <CircularProgress size={20} color="inherit" />
                    )
                  }
                >
                  {loadingForm ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"حذف تصویر پروفایل"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            آیا مطمئن هستید که می‌خواهید تصویر پروفایل خود را حذف کنید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            انصراف
          </Button>
          <Button
            onClick={handleDeleteImageProfile}
            color="error"
            autoFocus
            disabled={loadingImage}
            startIcon={
              loadingImage && <CircularProgress size={20} color="inherit" />
            }
          >
            {loadingImage ? "در حال حذف..." : "حذف"}
          </Button>
        </DialogActions>
      </Dialog>

      {showAlertSetting.show && (
        <MyAlertMui
          message={showAlertSetting.message}
          handleClose={() =>
            handleManageAlert(
              false,
              showAlertSetting.status,
              showAlertSetting.message
            )
          }
          status={showAlertSetting.status}
        />
      )}
    </Box>
  );
};

export default FormProfile;
