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
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import MapOutlined from "@mui/icons-material/MapOutlined";
import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import { ManageStepsContext } from "../ManageSteps";
import InputeContainer from "./Componnets/InputeContainer";
import SwitchSelect from "../../../components/CheckBoxSelect/SwitchSelect";
import CounterComponent from "../../../components/CounterComponent/CounterComponent";
const listStairs = [
  { id: 0, label: "ندارد" },
  { id: 10, label: "کمتر از 10" },
  { id: 20, label: "کمتر از 20" },
  { id: 30, label: "کمتر از 30" },
  { id: 40, label: "بیشتر از 30" },
];
const AboutStay = () => {
  const manageStepsContext = useContext(ManageStepsContext);
  const [loading, setLoading] = useState(false);
  const [goodForOld, setGoodForOld] = useState(true);
  const [countFloor, setCountFloor] = useState(0);
  const { control, handleSubmit, watch, setValue, formState, getValues } =
    useForm({
      defaultValues: {
        title: manageStepsContext?.hostInfoUpdating?.title || "",
        description: manageStepsContext?.hostInfoUpdating?.dics || "",
        AllSizeOfTheInfrastructure:
          manageStepsContext?.hostInfoUpdating?.allSizeOfTheInfrastructure ||
          "",
        SizeOfTheInfrastructure:
          manageStepsContext?.hostInfoUpdating?.sizeOfTheInfrastructure || "",
        stair: manageStepsContext?.hostInfoUpdating?.step || "0",
      },
    });

  const AllSizeOfTheInfrastructureInput = watch("AllSizeOfTheInfrastructure");
  const SizeOfTheInfrastructureInput = watch("SizeOfTheInfrastructure");
  const description = watch("description");
  const titleWatch = watch("title");
  const stairs = watch("stair");
  useEffect(() => {
    setCountFloor(manageStepsContext?.hostInfoUpdating?.floor);
    setGoodForOld(manageStepsContext?.hostInfoUpdating?.disabled);
  }, [manageStepsContext?.hostInfoUpdating]);

  const handleInputChange = (e, name) => {
    const value = e.target.value.replace(/,/g, ""); // Remove commas
    if (/^\d*$/.test(value)) {
      setValue(name, value);
    }
  };

  // به روز رسانی درباره اقامتگاه
  const onSubmit = async (data) => {
    setLoading(true);
    const {
      description,
      title,
      AllSizeOfTheInfrastructure,
      SizeOfTheInfrastructure,
      stair,
    } = data;
    const myData = {
      allSizeOfTheInfrastructure: AllSizeOfTheInfrastructure,
      sizeOfTheInfrastructure: SizeOfTheInfrastructure,
      dics: description,
      title: title,
      step: stair,
      disabled: goodForOld,
      floor: countFloor,
    };
    // console.log(myData, "myData");
    if (manageStepsContext?.stayCodeToComplete) {
      await manageStepsContext?.handleUpdateStay(myData);
      manageStepsContext?.handleNext();
    }
    setLoading(false);
  };

  const isNextDisabled = () => {
    return !(
      AllSizeOfTheInfrastructureInput &&
      SizeOfTheInfrastructureInput &&
      description?.length >= 3 &&
      titleWatch?.length >= 3 &&
      stairs >= 0
    );
  };
  return (
    <>
      <Grid container spacing={3} sx={{}}>
        {/* Map Section */}
        <Grid item xs={12} md={8} sx={{ mt: 1 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {/* "عنوان اقامتگاه" */}
            <InputeContainer
              label={"عنوان اقامتگاه"}
              text={
                "برای انتخاب نام از کلمات کوتاه و متناسب فضای اقامتگاه استفاده کنید"
              }
            >
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "  الزامی است",
                  maxLength: {
                    value: 200,
                    // message: "توضیحات نمی‌تواند بیش از 1000 کاراکتر باشد",
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    // sx={{ mb: 2 }}
                    size="small"
                    {...field}
                    // label="عنوان اقامتگاه"
                    multiline
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </InputeContainer>
            {/* "متراژ کل (متر)" */}
            <InputeContainer label={"متراژ کل (متر)"}>
              <Controller
                name="AllSizeOfTheInfrastructure"
                control={control}
                rules={{
                  required: "الزامی است",
                  validate: (value) =>
                    value > 0 || "مقدار باید بزرگتر از صفر باشد",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    dir="ltr"
                    // sx={{ mb: 2 }}
                    {...field}
                    // label="متراژ کل"
                    fullWidth
                    size="small"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={(e) =>
                      handleInputChange(e, "AllSizeOfTheInfrastructure")
                    }
                    // InputProps={{
                    //   endAdornment: (
                    //     <InputAdornment position="end">متر</InputAdornment>
                    //   ),
                    // }}
                  />
                )}
              />
            </InputeContainer>
            {/* "متراژ ساختمان (متر)" */}
            <InputeContainer label={"متراژ ساختمان (متر)"}>
              <Controller
                name="SizeOfTheInfrastructure"
                control={control}
                rules={{
                  required: "الزامی است",
                  validate: (value) =>
                    value > 0 || "مقدار باید بزرگتر از صفر باشد",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    // sx={{ mb: 2 }}
                    {...field}
                    dir="ltr"
                    // label="متراژ زیربنا"
                    fullWidth
                    size="small"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={(e) =>
                      handleInputChange(e, "SizeOfTheInfrastructure")
                    }
                    // InputProps={{
                    //   endAdornment: (
                    //     <InputAdornment position="end">متر</InputAdornment>
                    //   ),
                    // }}
                  />
                )}
              />
            </InputeContainer>
            {/* پله */}
            <InputeContainer label={"پله"}>
              <Controller
                name="stair"
                control={control}
                rules={{
                  required: "انتخاب  الزامی است",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    {...field}
                    select
                    fullWidth
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                  >
                    {listStairs.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </InputeContainer>

            {/* طبقه */}
            <InputeContainer label="طبقه" flexOnMobile={true}>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <CounterComponent
                  count={countFloor}
                  increment={() => setCountFloor(countFloor + 1)}
                  decrement={() => setCountFloor(Math.max(-10, countFloor - 1))}
                  unit=""
                  minValue={-10}
                  defaultValueZero={"همکف"}
                />
              </Box>
            </InputeContainer>

            {/* مناسب سالمندان  */}
            <Box
              sx={{
                mt: 3,
                mb: 4,
              }}
            >
              <SwitchSelect
                item={{
                  id: 1,
                  title: (
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: 16,
                      }}
                    >
                      مناسب سالمندان
                    </Typography>
                  ),
                }}
                handleSelect={(item, isSelected) =>
                  setGoodForOld((prev) => !prev)
                }
                titleActive="بله"
                titleDisActive="خیر"
                listSelected={[goodForOld ? 1 : 0]}
              />
            </Box>

            {/* "درباره اقامتگاه" */}
            <InputeContainer label={"درباره اقامتگاه"}>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: "وارد کردن توضیحات الزامی است",
                  maxLength: {
                    value: 1000,
                    message: "توضیحات نمی‌تواند بیش از 1000 کاراکتر باشد",
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    // sx={{ mb: 2 }}
                    size="small"
                    {...field}
                    // label="درباره اقامتگاه"
                    multiline
                    rows={3}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </InputeContainer>
            {/* {"نکات بیشتر"} */}
            {/* <InputeContainer label={"نکات بیشتر (اختیاری)"}>
              <Controller
                name="morePoints"
                control={control}
                rules={
                  {
                    // required: "وارد کردن توضیحات الزامی است",
                    // maxLength: {
                    //   // value: 1000,
                    //   // message: "توضیحات نمی‌تواند بیش از 1000 کاراکتر باشد",
                    // },
                  }
                }
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    {...field}
                    // label="نکات بیشتر"
                    multiline
                    rows={3}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </InputeContainer> */}
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
                <InfoOutlined sx={{ mr: 1 }} />
                مشخصات کلی اقامتگاه
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: "justify",
                }}
              >
                ‎‏‎بهتر است در توضیحات خود, به فراهم بودن امکانات ‏تفریحی همچون
                دوچرخه سواری, اسب سواری یا ماهی گیری و قایقرانی در مجاورت
                اقامتگاه خود اشاره کنید، تا میهمانان شما با اطلاع از شرایط زندگی
                در ‏محله شما و با خیالی آسوده, سفر خود را آغاز کنند.‏‎
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

export default AboutStay;
