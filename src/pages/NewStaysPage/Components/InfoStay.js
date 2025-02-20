import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import {
  GetTypeHostListApi,
  GetTypeHostLocListApi,
} from "../../../api/toureApis";
import { ManageStepsContext } from "../ManageSteps";
import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import InputeContainer from "./Componnets/InputeContainer";
const list = [
  { id: 1, title: "دربست" },
  { id: 2, title: "نیمه دربست" },
  { id: 3, title: "اتاق خصوصی" },
  { id: 4, title: "اتاق مشترک" },
];
const InfoStay = () => {
  const manageStepsContext = useContext(ManageStepsContext);

  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, watch, setValue, formState } = useForm({
    defaultValues: {
      type: manageStepsContext?.hostInfoUpdating?.typeHost || "",
      TypeHostId: manageStepsContext?.hostInfoUpdating?.typeHostId || "",
      TypeHostLocId: manageStepsContext?.hostInfoUpdating?.typeHostLocId || "",
    },
  });

  const typeInput = watch("type");
  const TypeHostIdInput = watch("TypeHostId");
  const TypeHostLocIdInput = watch("TypeHostLocId");

  // Submit handler
  const onSubmit = async (data) => {
    setLoading(true);
    const { type, TypeHostId, TypeHostLocId } = data;
    const myData = {
      type: type,
      typeHostId: TypeHostId,
      typeHostLocId: TypeHostLocId,
    };
    if (manageStepsContext?.stayCodeToComplete) {
      await manageStepsContext?.handleUpdateStay(myData);
      manageStepsContext?.handleNext();
    }
    setLoading(false);
  };

  const isNextDisabled = () => {
    return !(typeInput && TypeHostIdInput && TypeHostLocIdInput);
  };

  return (
    <>
      <Grid container spacing={3} sx={{}}>
        {/* Map Section */}
        <Grid item xs={12} md={8} sx={{ mt: 1 }}>
          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              flex: 1,
            }}
          >
            <InputeContainer label={"فضای اقامتگاه"}>
              <Controller
                name="type"
                control={control}
                rules={{
                  required: "انتخاب  فضای اقامتگاه الزامی است",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    {...field}
                    select
                    fullWidth
                    // label="فضای اقامتگاه"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                  >
                    {list.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </InputeContainer>
            {/* نوع اقامتگاه */}
            <InputeContainer label={"نوع اقامتگاه"}>
              <Controller
                name="TypeHostId"
                control={control}
                rules={{
                  required: "انتخاب نوع اقامتگاه الزامی است",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    {...field}
                    select
                    fullWidth
                    // label="نوع اقامتگاه"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                  >
                    {manageStepsContext?.listTypeHost.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </InputeContainer>
            {/* نوع منطقه */}
            <InputeContainer label={"منطقه اقامتگاه"}>
              <Controller
                name="TypeHostLocId"
                control={control}
                rules={{
                  required: "انتخاب  منطقه الزامی است",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    {...field}
                    select
                    fullWidth
                    // label=" منطقه"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                  >
                    {manageStepsContext?.listTypeHostLoc.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </InputeContainer>
          </Box>
        </Grid>

        {/* Information Section */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Card
            sx={{
              boxShadow: 4,
              borderRadius: "8px",
              position: "sticky",
              top: 16, // Keeps card sticky for larger screens
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 20,
                  mb: 1,
                }}
                gutterBottom
              >
                <HomeOutlined sx={{ mr: 1 }} />
                مشخصات کلی اقامتگاه
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: "justify",
                }}
              >
                با مشخص کردن مشخصات اقامتگاه خود، جستجو اقامتگاه خود را راحت‌تر
                کنید
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <FixedButtonsSubmit
        handleNext={handleSubmit(onSubmit)}
        handlePrevious={manageStepsContext?.handlePrevious}
        prevDisable={false}
        loading={loading}
        nexDisable={isNextDisabled()}
      />
    </>
  );
};

export default InfoStay;
