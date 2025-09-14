import React, { useContext, useEffect, useState, useCallback } from "react";
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
import { getCityListByProvinceId } from "../../../api/PublicApis";
import { ManageStepsContext } from "../ManageSteps";
import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import InputeContainer from "./Componnets/InputeContainer";
import MapOutlined from "@mui/icons-material/MapOutlined";

const SelectAddress = () => {
  const [buttonName, setButtonName] = useState("بعدی");

  const manageStepsContext = useContext(ManageStepsContext);
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      province: manageStepsContext?.hostInfoUpdating?.provinceId || "",
      city: manageStepsContext?.hostInfoUpdating?.cityId || "",
      address: manageStepsContext?.hostInfoUpdating?.address || "",
      zipCod: manageStepsContext?.hostInfoUpdating?.zipCod || "",
      tell: manageStepsContext?.hostInfoUpdating?.tell || "",
      emergency: manageStepsContext?.hostInfoUpdating?.emergencyMobile || "",
    },
  });

  // Store original values for comparison
  const [originalValues] = useState({
    province: manageStepsContext?.hostInfoUpdating?.provinceId || "",
    city: manageStepsContext?.hostInfoUpdating?.cityId || "",
    address: manageStepsContext?.hostInfoUpdating?.address || "",
    zipCod: manageStepsContext?.hostInfoUpdating?.zipCod || "",
    tell: manageStepsContext?.hostInfoUpdating?.tell || "",
    emergency: manageStepsContext?.hostInfoUpdating?.emergencyMobile || "",
  });

  const [cities, setCities] = useState([]);
  // const [provinceList, setProvinceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedProvince = watch("province");
  const selectedCity = watch("city");
  const addressInput = watch("address");
  const tellInput = watch("tell");
  const emergencyInput = watch("emergency");
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
    const { province, city, address, zipCod, tell, emergency } = data;
    const myData = {
      provinceId: province,
      cityId: city,
      address: address,
      zipCod,
      tell,
      emergencyMobile: emergency,
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
        emergencyInput?.toString()?.length > 0 &&
        zipCodeInpute?.toString()?.length > 0
      )
      // !isNaN(tellInput) &&
      // !isNaN(zipCodeInpute)
    );
  };

  const handleUpdateStatus = useCallback(() => {
    const complete =
      selectedProvince &&
      selectedCity &&
      addressInput &&
      addressInput.trim().length > 0 &&
      tellInput?.toString()?.length > 0 &&
      emergencyInput?.toString()?.length > 0 &&
      zipCodeInpute?.toString()?.length > 0;
    return complete;
  }, [selectedProvince, selectedCity, addressInput, tellInput, emergencyInput, zipCodeInpute]);

  const hasFormChanged = useCallback(() => {
    return (
      selectedProvince !== originalValues.province ||
      selectedCity !== originalValues.city ||
      addressInput !== originalValues.address ||
      zipCodeInpute !== originalValues.zipCod ||
      tellInput !== originalValues.tell ||
      emergencyInput !== originalValues.emergency
    );
  }, [selectedProvince, selectedCity, addressInput, zipCodeInpute, tellInput, emergencyInput, originalValues]);

  const hasOriginalData = useCallback(() => {
    // Check if we have original data (not just empty strings)
    return (
      originalValues.province ||
      originalValues.city ||
      originalValues.address ||
      originalValues.zipCod ||
      originalValues.tell ||
      originalValues.emergency
    );
  }, [originalValues]);

  const changeButtonName = useCallback(() => {
    const isFormComplete = handleUpdateStatus();
    const isUpdateMode = manageStepsContext?.stayCodeToComplete;
    const formHasChanged = hasFormChanged();
    const hasOriginal = hasOriginalData();
    
    console.log("isFormComplete:", isFormComplete, "isUpdateMode:", isUpdateMode, "formHasChanged:", formHasChanged, "hasOriginal:", hasOriginal);
    
    // Only show "ثبت" if:
    // 1. We're in update mode AND
    // 2. Form is complete AND 
    // 3. Form has changed AND
    // 4. We have original data (not just filling empty form)
    if (isUpdateMode && isFormComplete && formHasChanged && hasOriginal) {
      setButtonName("ثبت");
    } else {
      setButtonName("بعدی");
    }
  }, [handleUpdateStatus, hasFormChanged, hasOriginalData, manageStepsContext?.stayCodeToComplete]);

  useEffect(() => {
    changeButtonName();
  }, [changeButtonName]);

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
                        changeButtonName();
                        
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
                      onChange={(e) => {
                        field.onChange(e);
                        changeButtonName();
                      }}
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
                      onChange={(e) => {
                        field.onChange(e);
                        changeButtonName();
                      }}
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
                      onChange={(e) => {
                        field.onChange(e);
                        changeButtonName();
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
                      value: /^[0-9]{11}$/,
                      message: "شماره تلفن باید 11 رقم باشد",
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
                      onChange={(e) => {
                        field.onChange(e);
                        changeButtonName();
                      }}
                    />
                  )}
                />
              </InputeContainer>

              {/* second number */}
              <InputeContainer label={"شماره تلفن دوم"}>
                <Controller
                  name="emergency"
                  control={control}
                  rules={{
                    required: "الزامی است",
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "شماره تلفن باید 11 رقم باشد",
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
                      onChange={(e) => {
                        field.onChange(e);
                        changeButtonName();
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
        buttonText={buttonName}
      />
    </>
  );
};

export default SelectAddress;
