import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
  getCityListByProvinceId,
  getProvinceList,
} from "../../../api/PublicApis";
import { ManageStepsContext } from "../ManageSteps";
import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import { getValue } from "@testing-library/user-event/dist/utils";
import InputeContainer from "./Componnets/InputeContainer";
import MapOutlined from "@mui/icons-material/MapOutlined";

const SelectAddress = () => {
  const manageStepsContext = useContext(ManageStepsContext);
  const { control, handleSubmit, watch, setValue, formState } = useForm({
    defaultValues: {
      province: manageStepsContext?.hostInfoUpdating?.provinceId || "",
      city: manageStepsContext?.hostInfoUpdating?.cityId || "",
      address: manageStepsContext?.hostInfoUpdating?.address || "",
      zipCod: manageStepsContext?.hostInfoUpdating?.zipCod || "",
      tell: manageStepsContext?.hostInfoUpdating?.tell || "",
    },
  });

  const [cities, setCities] = useState([]);
  // const [provinceList, setProvinceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedProvince = watch("province");
  const selectedCity = watch("city");
  const addressInput = watch("address");
  const tellInput = watch("tell");
  const zipCodeInpute = watch("zipCod");

  useEffect(() => {
    if (selectedProvince) {
      handleProvinceChange(selectedProvince);
    }
  }, [selectedProvince]);

  const handleProvinceChange = async (provinceId) => {
    setCities([]);
    const result = await getCityListByProvinceId(provinceId);
    setCities(result?.data || []);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const { province, city, address, zipCod, tell } = data;
    const myData = {
      provinceId: province,
      cityId: city,
      address: address,
      zipCod,
      tell,
    };

    if (!manageStepsContext?.stayCodeToComplete) {
      await manageStepsContext?.handleCreateStay(myData);
    } else {
      const result = await manageStepsContext?.handleUpdateStay(myData);
      if (result) {
        manageStepsContext?.handleNext();
      }
    }
    setLoading(false);
  };

  // Improved disableNext logic
  const isNextDisabled = () => {
    // return false;
    return !(
      (
        selectedProvince &&
        selectedCity &&
        addressInput &&
        addressInput.trim().length > 0 &&
        tellInput?.toString()?.length > 0 &&
        zipCodeInpute?.toString()?.length > 0
      )
      // !isNaN(tellInput) &&
      // !isNaN(zipCodeInpute)
    );
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 0, mt: 3 }}
            >
              {/* Province Select */}
              <InputeContainer label={"انتخاب استان"}>
                <Controller
                  name="province"
                  control={control}
                  rules={{ required: "انتخاب استان الزامی است" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      size="small"
                      {...field}
                      select
                      fullWidth
                      // label="استان"
                      onChange={(e) => {
                        setValue("city", "");
                        field.onChange(e);
                        handleProvinceChange(Number(e.target.value));
                      }}
                    >
                      {manageStepsContext?.provinceList.map((province) => (
                        <MenuItem key={province.id} value={province.id}>
                          {province.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </InputeContainer>

              {/* City Select */}
              <InputeContainer label={"انتخاب شهر"}>
                <Controller
                  name="city"
                  control={control}
                  rules={{
                    required: "انتخاب شهر الزامی است",
                    validate: (value) =>
                      cities.length === 0 ||
                      value !== "" ||
                      "ابتدا استان را انتخاب کنید",
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      size="small"
                      {...field}
                      select
                      fullWidth
                      // label="شهر"
                      disabled={cities.length === 0}
                    >
                      {cities.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </InputeContainer>

              {/* آدرس دقیق */}
              <InputeContainer label={"آدرس دقیق"}>
                <Controller
                  name="address"
                  control={control}
                  rules={{
                    required: "وارد کردن آدرس الزامی است",
                    maxLength: {
                      value: 200,
                      message: "آدرس نمی‌تواند بیش از ۲۰۰ کاراکتر باشد",
                    },
                    minLength: {
                      value: 5,
                      message: "آدرس کوتاه است",
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      size="small"
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                      // label="آدرس دقیق"
                      multiline
                      rows={2}
                      fullWidth
                    />
                  )}
                />
              </InputeContainer>

              {/* Postal Code */}
              <InputeContainer label={"کد پستی"}>
                <Controller
                  name="zipCod"
                  control={control}
                  rules={{
                    required: "الزامی است",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "فقط عدد مجاز است",
                    },
                    minLength: {
                      value: 10,
                      message: "کد پستی باید 10 رقمی باشد",
                    },
                    maxLength: {
                      value: 10,
                      message: "کد پستی باید 10 رقمی باشد",
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      size="small"
                      {...field}
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                      inputProps={{
                        maxLength: 10,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: error ? "red" : "",
                          },
                        },
                      }}
                    />
                  )}
                />
              </InputeContainer>

              {/* Phone Number */}
              <InputeContainer label={"شماره تلفن ثابت"}>
                <Controller
                  name="tell"
                  control={control}
                  rules={{
                    required: "الزامی است",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "فقط عدد مجاز است",
                    },
                    minLength: {
                      value: 8,
                      message: "شماره تلفن باید حداقل 8 رقمی باشد",
                    },
                    maxLength: {
                      value: 11,
                      message: "شماره تلفن باید حداکثر 11 رقمی باشد",
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      size="small"
                      {...field}
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                      inputProps={{
                        maxLength: 11,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: error ? "red" : "",
                          },
                        },
                      }}
                    />
                  )}
                />
              </InputeContainer>
            </Box>
          </form>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Card sx={{ maxWidth: "300px", boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <MapOutlined sx={{ mr: 1 }} />
                آدرس اقامتگاه
              </Typography>
              <Typography variant="body2" color="text.secondary">
                آدرس دقیق اقامتگاه تنها پس از قطعی شدن رزرو برای مهمان ارسال
                میگردد.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <FixedButtonsSubmit
        handleNext={handleSubmit(onSubmit)}
        handlePrevious={() => {}}
        prevDisable={true}
        loading={loading}
        nexDisable={isNextDisabled()}
      />
    </>
  );
};

export default SelectAddress;
