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

const FormContact = () => {
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

  useEffect(() => {}, []);

  const onSubmit = async (data) => {
    const myData = {
      firstName: data?.name,
      lastName: data?.lastName,
      nationalCode: data?.nation,
      mobile: data?.sms,
      email: data?.email,
      birthDay: data?.birthday, // شمسی
    };

    console.log(data, "onSubmit", myData);
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "100%" },
        mx: "auto",
      }}
    >
      <Box sx={{}} className="  ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            {/* نام */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: 16,
                }}
              >
                نام
              </Typography>
              <TextField
                // label="نام"
                fullWidth
                {...register("name", {
                  // required: "نام الزامی است"
                })}
                placeholder="نام"
                error={!!errors.name}
                helperText={errors.name?.message}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* نام خانوادگی */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: 16,
                }}
              >
                نام خانوادگی
              </Typography>
              <TextField
                // label="نام خانوادگی"
                fullWidth
                {...register("lastName", {
                  // required: "نام خانوادگی الزامی است",
                })}
                placeholder=" نام خانوادگی"
                InputLabelProps={{ shrink: true }}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                size="small"
              />
            </Grid>

            {/* شماره موبایل */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: 16,
                }}
              >
                شماره موبایل
              </Typography>
              <TextField
                // label="شماره موبایل"
                fullWidth
                {...register("sms", {
                  // required: "شماره موبایل الزامی است"
                })}
                error={!!errors.sms}
                helperText={errors.sms?.message}
                size="small"
                InputLabelProps={{ shrink: true }}
                // disabled
                placeholder=" شماره موبایل"
              />
            </Grid>

            {/* ایمیل */}
            <Grid item xs={12} md={6} sx={{ py: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: 16,
                }}
              >
                ایمیل{" "}
              </Typography>
              <TextField
                // label="ایمیل"
                fullWidth
                {...register("email", {
                  // required: "ایمیل الزامی است"
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputLabelProps={{ shrink: true }}
                size="small"
                placeholder="ایمیل"
              />
            </Grid>

            {/* درباره من */}
            <Grid item xs={12} sx={{ py: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: 16,
                }}
              >
                متن پیام{" "}
              </Typography>
              <TextField
                // label="پیام "
                fullWidth
                {...register("aboutMe")}
                size="small"
                multiline
                rows={4}
                InputLabelProps={{ shrink: true }}
                placeholder="متن پیام"
              />
            </Grid>

            {/* Submit Button */}
            <Grid
              item
              xs={12}
              sx={{ py: 3 }}
              className="d-flex justify-content-start"
            >
              <Button
                type="submit"
                variant="contained"
                // color="primary"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  // width: { xs: "100%", md: "200px" },
                }}
                fullWidth
              >
                <Typography variant="body2" sx={{ fontSize: 18 }}>
                  ارسال فرم
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default FormContact;
