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
  Divider,
} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import ClearIcon from "@mui/icons-material/Clear";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  sendValidCode,
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
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import axios from "axios";
import API_URL from "../../../../../../config/apiConfig";
import { convertImageToWebP } from "../../../../../../api/PublicApis";
import ValidCode from "./ValidCode";

const baseUrl = API_URL;
const shabaStates = [
  {
    text: "در حال بررسی",
    colorCode: "#287dfa",
    icon: <HourglassEmptyIcon sx={{ fontSize: 16, color: "#287dfa" }} />,
  },
  {
    text: "تایید شده",
    colorCode: "#96b859",
    icon: <DoneOutlinedIcon sx={{ fontSize: 16, color: "#96b859" }} />,
  },
  {
    text: "رد شده",
    colorCode: "error",
    icon: <CloseOutlinedIcon color="error" sx={{ fontSize: 16 }} />,
  },
];

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
  const [showPassField, setShowPassField] = useState(false);
  const [shabaState, setShabaState] = useState(0);
  const [bankName, setBankName] = useState("");
  const [shabaOwner, setShabaOwner] = useState("");
  const [shabaValue, setShabaValue] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [smsFieldChanged, setSmsFieldChanged] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    shouldFocusError: false,
  });

  const password = watch("newpassword", "");
  const number = getValues("sms");

  useEffect(() => {
    handleGetUserInfo();
  }, [shabaValue]);

  const handleGetUserInfo = async () => {
    try {
      // setLoadingForm(true);
      appContext?.handleGetInfoUser();
      const userData = await UserSearchOneApi();
      const profile = userData?.data;
      console.log(profile, "prof");
      setShabaState(profile?.shabaBankState);
      setBankName(profile?.shabaBankTitle);
      setShabaOwner(profile?.fullNameOtherUserShaba);
      setShabaValue(profile?.shaba);

      if (profile) {
        const shamsiObject = GetShamsiDateDetails(profile.birthDay);
        setValue("name", profile.firstName || "");
        setValue("lastName", profile.lastName || "");
        setValue("nation", profile.nationalCode || "");
        setValue("sms", profile.mobile || "");
        setValue("myemail", profile.email || "");
        setValue("birthday", shamsiObject?.fullshamsi || "");
        setValue("aboutMe", profile.aboutMe || "");
        setValue("shaba", profile.shaba || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      handleManageAlert(true, "error", "خطا در دریافت اطلاعات کاربر");
    } finally {
      // setLoadingForm(false);
    }
  };

  const handleImageChange = async (e) => {
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

    try {
      // تبدیل به WebP
      const webpFile = await convertImageToWebP(file);

      // 🔍 نمایش حجم قبل و بعد
      console.log("📤 فایل اصلی:", (file.size / 1024).toFixed(1), "KB");
      console.log("📥 WebP:", (webpFile.size / 1024).toFixed(1), "KB");

      // خواندن WebP به صورت base64 برای ذخیره در state
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToUpload({
          fileName: webpFile.name,
          extension: ".webp",
          size: webpFile.size,
          data: reader.result,
        });
      };
      reader.onerror = () => {
        handleManageAlert(true, "error", "خطا در خواندن فایل WebP");
      };
      reader.readAsDataURL(webpFile);

      // نمایش تصویر در UI
      setProfileImage(URL.createObjectURL(webpFile));
    } catch (err) {
      console.error("خطا در تبدیل WebP:", err);
      handleManageAlert(true, "error", "تبدیل تصویر به WebP با مشکل مواجه شد");
    }
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
    setShabaValue(data.shaba);
    try {
      const result = await UserUpdateApi({
        firstName: data.name,
        lastName: data.lastName,
        password: data.newpassword || undefined,
        nationalCode: data.nation,
        mobile: data.sms,
        email: data.myemail,
        birthDay: data.birthday,
        shaba: data.shaba,
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
    if (!value) return true; // Password is optional
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
    const newPassword = watch("newpassword");
    if (!newPassword) return true; // If no password entered, confirm is not required
    return value === newPassword || "رمزهای عبور مطابقت ندارند";
  };

  function handleShowCode(value) {
    setShowCode(value);
    if (value===false){
      setSmsFieldChanged(false)
    }
  }
  const sendValidationCode = async () => {
    const number = getValues("sms");
    if (!number) {
      handleManageAlert(true, "error", "لطفا شماره موبایل را وارد کنید");
      return;
    }

    try {
      const result = await sendValidCode(number);
      if (result?.issuccess) {
        handleManageAlert(true, "success", "کد ارسال شد");
        handleShowCode(true);
      } else {
        handleManageAlert(true, "error", result?.message || "خطا در ارسال کد");
      }
    } catch (error) {
      console.error("Error sending validation code:", error);
      handleManageAlert(true, "error", "خطا در ارسال کد");
    }
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

            {/* Mobile Number & user name */}
            <Grid item xs={12} md={6}>
              <Controller
                name="sms"
                control={control}
                rules={{
                  required: "شماره موبایل الزامی است",
                  validate: validateMobile,
                }}
                render={({ field }) => (
                  <InputMask
                    mask="09999999999"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      setSmsFieldChanged(true);
                    }}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        label=" نام کاربری  (شماره موبایل)"
                        fullWidth
                        error={!!errors.sms}
                        helperText={errors.sms?.message}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                        InputProps={{
                          endAdornment: smsFieldChanged && (
                            <InputAdornment position="end">
                              <Button
                                variant="contained"
                                size="small"
                                sx={{
                                  fontSize: "0.75rem",
                                  height: "38px",
                                  borderRadius: "3px",
                                  minWidth: "auto",
                                  px: 1.5,
                                  mr: -1.65,
                                  mt: -0.5,
                                  mb: -0.5,
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0,
                                  "&:hover": {
                                    backgroundColor: "#1976d2",
                                  },
                                }}
                                onClick={() => {
                                  sendValidationCode();
                                  console.log("Button clicked");
                                }}
                              >
                                احراز هویت
                              </Button>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </InputMask>
                )}
              />
            </Grid>

            {/* confirm code */}
            <Grid item xs={12} md={6}>
              {showCode && (
                <ValidCode
                  handleShowCode={handleShowCode}
                  number={getValues("sms")}
                  handleManageAlert={handleManageAlert}
                />
              )}
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
                    inputProps={{
                      autocomplete: "my-name",
                    }}
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
                    inputProps={{
                      autocomplete: "lastName",
                    }}
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
                  <InputMask
                    mask="9999999999"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                  >
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

            {/* Birth Date */}
            <Grid item xs={12} md={6}>
              <Controller
                name="birthday"
                control={control}
                rules={{ required: "تاریخ تولد الزامی است" }}
                render={({ field }) => (
                  <InputMask
                    mask="9999/99/99"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                  >
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
            {/* Email */}
            <Grid item xs={12} md={6}>
              <Controller
                name="myemail"
                control={control}
                rules={{ validate: validateEmail }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="ایمیل"
                    fullWidth
                    error={!!errors.myemail}
                    helperText={errors.myemail?.message}
                    inputProps={
                      {
                        // autocomplete: "my-email",
                      }
                    }
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      mb: 2,
                      "& input:-webkit-autofill": {
                        "-webkit-box-shadow":
                          "0 0 0 100px white inset !important",
                        "-webkit-text-fill-color": "inherit !important",
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
              <Divider textAlign="left">
                <Typography variant="subtitle2" color="rgba(0, 0, 0, 0.5)">
                  اطلاعات بانکی
                </Typography>
              </Divider>
            </Box>

            {/* shaba */}
            <Grid item xs={12} md={6} sx={{ position: "relative" }}>
              <Controller
                name="shaba"
                control={control}
                rules={{
                  required: "شماره شبا الزامی است",
                  validate: (value) => {
                    const cleaned = value.replace(/\s/g, "");
                    if (!/^IR\d{24}$/.test(cleaned)) {
                      return "شماره شبا باید با IR شروع شده و 24 رقم داشته باشد";
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <InputMask
                    mask="IR99 9999 9999 9999 9999 9999 99"
                    maskChar=" "
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        label="شماره شبا"
                        fullWidth
                        error={!!errors.shaba}
                        helperText={errors.shaba?.message}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                      />
                    )}
                  </InputMask>
                )}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  position: "absolute",
                  bottom: -8,
                  right: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 1,
                  width: "100%",
                  padding: "0 5px 0 20px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "12px" }}
                >
                  صاحب شبا: {shabaOwner || null}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "12px" }}
                >
                  {bankName || "بانک: "}
                </Typography>
              </Typography>
            </Grid>

            {/* shaba state */}
            <Grid item xs={12} md={6} mt={1}>
              <Box display="flex" alignItems="center" gap={1}>
                {shabaStates[shabaState].icon}
                <Typography
                  variant="body2"
                  color={shabaStates[shabaState].colorCode}
                >
                  {shabaStates[shabaState].text}
                </Typography>
              </Box>
            </Grid>

            {/* show password Button */}
            <Grid item xs={12} sx={{ mb: 1 }}>
              <Box display="flex" justifyContent="flex-start">
                <Button
                  onClick={() => setShowPassField(!showPassField)}
                  type="button"
                  variant="contained"
                  sx={{
                    backgroundColor: "#287dfa",
                    color: "white",
                    minWidth: 120,
                    wordSpacing: "1px",
                    "&:hover": { backgroundColor: "#106DF6" },
                  }}
                >
                  تغییر رمز عبور
                </Button>
              </Box>
            </Grid>

            {showPassField ? (
              <>
                {/* Password */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="newpassword"
                    control={control}
                    rules={{
                      validate: validatePassword,
                      required: false,
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="رمز عبور جدید (اختیاری)"
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        error={!!errors.newpassword}
                        helperText={errors.newpassword?.message}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                          autocomplete: "new-password",
                        }}
                        sx={{ mb: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
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

                {/* Confirm Password */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="passwordrepeat"
                    control={control}
                    rules={{
                      validate: validateConfirmPassword,
                      required: false,
                    }}
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
              </>
            ) : (
              ""
            )}

            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#287dfa",
                    color: "white",
                    minWidth: 120,
                    "&:hover": { backgroundColor: "#106DF6" },
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
