import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { useContext } from "react";
import { ReservationStayContext } from "../ReservationStay";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";

const InfoOfUser = ({}) => {
  const { infoOfReserve, stepName, handleUpdateInputeValue } = useContext(
    ReservationStayContext
  );

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
    handleSubmit()();
  }, [stepName]);

  const validateMobile = (value) => {
    if (!value) return "شماره موبایل الزامی است";
    if (!/^09\d{9}$/.test(value)) return "شماره موبایل معتبر نیست";
    return true;
  };

  const handleChangeInputs = (newData) => {
    handleUpdateInputeValue(newData);
  };

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
            <form onSubmit={handleSubmit(() => {})}>
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
                          handleChangeInputs({ name: e.target.value });
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
                          handleChangeInputs({ lastName: e.target.value });
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
                          handleChangeInputs({ sms: e.target.value });
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
              یاسر زروندی - 09934623142
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default InfoOfUser;
