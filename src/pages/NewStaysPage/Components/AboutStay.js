import React, { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import {
  Box,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
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
  const [buttonName, setButtonName] = useState("بعدی");
  const [goodForOld, setGoodForOld] = useState(true);
  const [countFloor, setCountFloor] = useState(0);
  const { control, handleSubmit, watch, setValue, getValues } =
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

  // Store original values for comparison
  const [originalValues] = useState({
    title: manageStepsContext?.hostInfoUpdating?.title || "",
    description: manageStepsContext?.hostInfoUpdating?.dics || "",
    AllSizeOfTheInfrastructure:
      manageStepsContext?.hostInfoUpdating?.allSizeOfTheInfrastructure || "",
    SizeOfTheInfrastructure:
      manageStepsContext?.hostInfoUpdating?.sizeOfTheInfrastructure || "",
    stair: manageStepsContext?.hostInfoUpdating?.step || "0",
    disabled: manageStepsContext?.hostInfoUpdating?.disabled,
    floor: manageStepsContext?.hostInfoUpdating?.floor,
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

  const hasFormChanged = useCallback(() => {
    return (
      titleWatch !== originalValues.title ||
      description !== originalValues.description ||
      AllSizeOfTheInfrastructureInput !==
        originalValues.AllSizeOfTheInfrastructure ||
      SizeOfTheInfrastructureInput !== originalValues.SizeOfTheInfrastructure ||
      stairs !== originalValues.stair ||
      goodForOld !== originalValues.disabled ||
      countFloor !== originalValues.floor
    );
  }, [
    titleWatch,
    description,
    AllSizeOfTheInfrastructureInput,
    SizeOfTheInfrastructureInput,
    stairs,
    goodForOld,
    countFloor,
    originalValues,
  ]);
  // حذف شده: hasOriginalData استفاده نمی‌شد

  const isEditing = useMemo(() => {
    // فقط اگر فرم در ابتدا «کامل» بوده باشد و الآن تغییری کرده باشد، حالت ویرایش است
    const wasFormCompletedInitially = Boolean(
      originalValues.title &&
      originalValues.description &&
      originalValues.AllSizeOfTheInfrastructure &&
      originalValues.SizeOfTheInfrastructure &&
      // stair باید یک گزینه معتبر از لیست باشد
      listStairs.some((item) => item.id === Number(originalValues.stair))
    );

    return wasFormCompletedInitially && hasFormChanged();
  }, [originalValues, hasFormChanged]);

  
  const changeButtonName = useCallback(() => {
    const isFormComplete =
      titleWatch &&
      description &&
      AllSizeOfTheInfrastructureInput &&
      SizeOfTheInfrastructureInput &&
      stairs !== undefined;
  
    if (isFormComplete && isEditing) {
      setButtonName("ثبت");
    } else {
      setButtonName("بعدی");
    }
  }, [
    titleWatch,
    description,
    AllSizeOfTheInfrastructureInput,
    SizeOfTheInfrastructureInput,
    stairs,
    isEditing,
  ]);
  

  useEffect(() => {
    changeButtonName();
  }, [changeButtonName]);

  const handleInputChange = (e, name) => {
    const value = e.target.value.replace(/,/g, ""); // Remove commas
    if (/^\d*$/.test(value)) {
      setValue(name, value);
    }
  };

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

    if (manageStepsContext?.stayCodeToComplete) {
      await manageStepsContext?.handleUpdateStay(myData);
      manageStepsContext?.handleNext();
    }
    setLoading(false);
  };

  const isNextDisabled = () => {
    return (
      !titleWatch ||
      !description ||
      !AllSizeOfTheInfrastructureInput ||
      !SizeOfTheInfrastructureInput ||
      stairs === undefined
      // titleWatch.length < 3 ||
      // description.length < 10 ||
      // errors.title ||
      // errors.description ||
      // errors.AllSizeOfTheInfrastructure ||
      // errors.SizeOfTheInfrastructure ||
      // errors.stair
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
                  required: "عنوان اقامتگاه الزامی است",
                  minLength: {
                    value: 3,
                    message: "عنوان باید حداقل 3 کاراکتر باشد",
                  },
                  maxLength: {
                    value: 200,
                    message: "عنوان نمی‌تواند بیش از 200 کاراکتر باشد",
                  },
                  validate: (value) =>
                    !/^\s+$/.test(value) ||
                    "عنوان نمی‌تواند فقط شامل فاصله باشد",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    {...field}
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
                  required: "متراژ کل الزامی است",
                  validate: {
                    isNumber: (value) => !isNaN(value) || "لطفاً عدد وارد کنید",
                    isPositive: (value) =>
                      value > 0 || "عدد باید بزرگتر از صفر باشد",
                    maxValue: (value) =>
                      value <= 10000 || "عدد نمی‌تواند بیش از ۱۰۰۰۰ باشد",
                    buildingNotBigger: (value) => {
                      const buildingSize = getValues("SizeOfTheInfrastructure");
                      return (
                        !buildingSize ||
                        value >= buildingSize ||
                        "متراژ کل نمی‌تواند از متراژ ساختمان کمتر باشد"
                      );
                    },
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    dir="ltr"
                    {...field}
                    fullWidth
                    size="small"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={(e) =>
                      handleInputChange(e, "AllSizeOfTheInfrastructure")
                    }
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
                  required: "متراژ ساختمان الزامی است",
                  validate: {
                    isNumber: (value) => !isNaN(value) || "لطفاً عدد وارد کنید",
                    isPositive: (value) =>
                      value > 0 || "عدد باید بزرگتر از صفر باشد",
                    maxValue: (value) =>
                      value <= 10000 || "عدد نمی‌تواند بیش از ۱۰۰۰۰ باشد",
                    notBiggerThanTotal: (value) => {
                      const totalSize = getValues("AllSizeOfTheInfrastructure");
                      return (
                        !totalSize ||
                        value <= totalSize ||
                        "متراژ ساختمان نمی‌تواند از متراژ کل بیشتر باشد"
                      );
                    },
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    dir="ltr"
                    fullWidth
                    size="small"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={(e) =>
                      handleInputChange(e, "SizeOfTheInfrastructure")
                    }
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
                  required: "انتخاب تعداد پله‌ها الزامی است",
                  validate: (value) =>
                    listStairs.some((item) => item.id === Number(value)) ||
                    "لطفاً یک گزینه معتبر انتخاب کنید",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    {...field}
                    select
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
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
              <Box sx={{ width: "100%" }}>
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
            <Box sx={{ mt: 3, mb: 4 }}>
              <SwitchSelect
                item={{
                  id: 1,
                  title: (
                    <Typography variant="h6" sx={{ fontSize: 16 }}>
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
                  required: "توضیحات اقامتگاه الزامی است",
                  minLength: {
                    value: 10,
                    message: "توضیحات باید حداقل 10 کاراکتر باشد",
                  },
                  maxLength: {
                    value: 1000,
                    message: "توضیحات نمی‌تواند بیش از 1000 کاراکتر باشد",
                  },
                  validate: (value) =>
                    !/^\s+$/.test(value) ||
                    "توضیحات نمی‌تواند فقط شامل فاصله باشد",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    {...field}
                    multiline
                    rows={3}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </InputeContainer>
          </Box>
        </Grid>

        {/* Information Section */}
        <Grid item xs={12} md={4} sx={{ display: { xs: "none", md: "block" } }}>
          <Card
            sx={{
              boxShadow: 4,
              borderRadius: "8px",
              position: "sticky",
              top: 16,
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
                sx={{ textAlign: "justify" }}
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
        buttonText={buttonName}
      />
    </>
  );
};

export default AboutStay;
