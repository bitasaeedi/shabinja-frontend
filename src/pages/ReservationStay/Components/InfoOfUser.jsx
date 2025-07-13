import { Box, Grid, Skeleton, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { useContext } from "react";
import { ReservationStayContext } from "../ReservationStay";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { AppContext } from "../../../App";

const InfoOfUser = ({}) => {
  const { infoOfReserve, stepName, handleUpdateInputeValue } = useContext(
    ReservationStayContext
  );

  const { userInfo } = useContext(AppContext);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    setValue("sms", userInfo?.mobile);
    setValue("name", userInfo?.name);
    setValue("lastName", userInfo?.lastName);
    handleChangeInputs({
      sms: userInfo?.mobile,
      name: userInfo?.name,
      lastName: userInfo?.lastName,
    });
    if (stepName === "preview") {
      // handleSubmit(onSubmit);
    }
  }, [stepName, userInfo?.mobile]);

  const validateMobile = (value) => {
    if (!value) return "شماره موبایل الزامی است";
    if (!/^09\d{9}$/.test(value)) return "شماره موبایل معتبر نیست";
    return true;
  };

  const handleChangeInputs = (newData) => {
    handleUpdateInputeValue(newData);
  };

  const onSubmit = () => {};
  return (
    <Box
      display="flex"
      justifyContent={"space-between"}
      alignItems="center"
      sx={{ my: 2 }}
    >
      <Box sx={{ display: "flex", alignItems: "start" }} gap={2}>
        <Box>
          <BadgeOutlinedIcon />
        </Box>

        <Box display="column" alignItems="center">
          <Typography variant="subtitle1" color={"grey"}>
            اطلاعات مسافر
          </Typography>

          {stepName === "preview" ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                {/* Name */}
                <Grid item xs={12} md={4}>
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
                        onChange={(e) => {
                          field.onChange(e);
                          // if (!errors.name) {
                          handleChangeInputs({ name: e.target.value });
                          // } else {
                          //   handleChangeInputs({ name: null });
                          // }
                        }}
                        variant="outlined"
                        placeholder="نام"
                        //   label="نام"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        //   sx={{ mb: 1 }}
                        inputProps={{
                          autocomplete: "my-name",
                        }}
                      />
                    )}
                  />
                </Grid>

                {/* Last Name */}
                <Grid item xs={12} md={4}>
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
                        message:
                          "نام خانوادگی نمی‌تواند بیشتر از 50 کاراکتر باشد",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          // if (!errors.lastName) {
                          handleChangeInputs({ lastName: e.target.value });
                          // } else {
                          //   handleChangeInputs({ lastName: null });
                          // }
                        }}
                        //   label="نام خانوادگی"
                        variant="outlined"
                        placeholder="نام خانوادگی"
                        fullWidth
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        //   sx={{ mb: 1 }}
                        inputProps={{
                          autocomplete: "lastName",
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={0} md={4}></Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="sms"
                    control={control}
                    rules={{
                      required: "شماره موبایل الزامی است",
                      validate: validateMobile,
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          // if (validateMobile) {
                          handleChangeInputs({ sms: e.target.value });
                          // } else {
                          //   handleChangeInputs({ sms: null });
                          // }
                        }}
                        dir="ltr"
                        variant="outlined"
                        placeholder="شماره موبایل"
                        fullWidth
                        error={!!errors.sms}
                        helperText={errors.sms?.message}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          sx: {
                            input: {
                              "&::placeholder": {
                                direction: "rtl",
                                textAlign: "left",
                              },
                            },
                          },
                        }}
                        inputProps={{
                          autoComplete: "tel",
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </form>
          ) : (
            <Typography variant="p" fontWeight="bold">
              {infoOfReserve?.fullName ? (
                `${infoOfReserve?.fullName} - ${infoOfReserve?.sms}`
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default InfoOfUser;
