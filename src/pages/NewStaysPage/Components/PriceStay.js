import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import SpaIcon from "@mui/icons-material/Spa"; // بهار
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // تابستان
import SnowflakeIcon from "@mui/icons-material/AcUnit"; // زمستان
import FormSeasons from "./Componnets/FormSeasons";
import { ManageStepsContext } from "../ManageSteps";
import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import InputeContainer from "./Componnets/InputeContainer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ToRial from "../../../components/ToRial/ToRial";

const listSeasons = [
  { id: 1, title: "بهار", icon: <SpaIcon color="success" />, label: "spring" },
  {
    id: 2,
    title: "تابستان",
    icon: <WbSunnyIcon color="warning" />,
    label: "summer",
  },
  { id: 3, title: "پاییز", icon: <SpaIcon color="warning" />, label: "autumn" },
  {
    id: 4,
    title: "زمستان",
    icon: <SnowflakeIcon color="info" />,
    label: "winter",
  },
];
const PriceStay = () => {
  const manageStepsContext = useContext(ManageStepsContext);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, setValue, getValues } = useForm({});
  useEffect(() => {
    const myHostInfo = manageStepsContext?.hostInfoUpdating;
    // Set prices for Spring
    const listPriceSpring = myHostInfo?.priceHostTourBaseSpring || [];
    listPriceSpring.forEach((item) => {
      if (item?.periodType === 1) {
        console.log(item?.otherPrice, "priceForExtraPersone");
        setValue("midWeekspring", ToRial(item?.priceBase));
        setValue("priceForExtraPersone", ToRial(item?.otherPrice));
      } // نرخ هر نفر اضافه
      if (item?.periodType === 0)
        setValue("endWeekspring", ToRial(item?.priceBase));
      if (item?.periodType === 2)
        setValue("peakDaysspring", ToRial(item?.priceBase));
    });

    // Set prices for Summer
    const listPriceSummer = myHostInfo?.priceHostTourBaseSummer || [];
    listPriceSummer.forEach((item) => {
      if (item?.periodType === 1)
        setValue("midWeeksummer", ToRial(item?.priceBase));
      if (item?.periodType === 0)
        setValue("endWeeksummer", ToRial(item?.priceBase));
      if (item?.periodType === 2)
        setValue("peakDayssummer", ToRial(item?.priceBase));
    });

    // Set prices for Autumn
    const listPriceAutumn = myHostInfo?.priceHostTourBaseAutum || [];
    listPriceAutumn.forEach((item) => {
      if (item?.periodType === 1)
        setValue("midWeekautumn", ToRial(item?.priceBase));
      if (item?.periodType === 0)
        setValue("endWeekautumn", ToRial(item?.priceBase));
      if (item?.periodType === 2)
        setValue("peakDaysautumn", ToRial(item?.priceBase));
    });

    // Set prices for Winter
    const listPriceWinter = myHostInfo?.priceHostTourBaseWinter || [];
    listPriceWinter.forEach((item) => {
      if (item?.periodType === 1)
        setValue("midWeekwinter", ToRial(item?.priceBase));
      if (item?.periodType === 0)
        setValue("endWeekwinter", ToRial(item?.priceBase));
      if (item?.periodType === 2)
        setValue("peakDayswinter", ToRial(item?.priceBase));
    });
  }, [manageStepsContext?.hostInfoUpdating]);

  // Submit handler
  const onSubmit = async (data) => {
    setLoading(true);
    const myData = {
      priceHostTourBaseSpring: [
        ///قیمت برای بهار
        {
          PeriodType: 1, ///آخر هفته=0  وسط هفته=1    تعطیلات=2
          priceBase: String(data?.midWeekspring)?.replaceAll(",", ""),
          otherPrice:
            String(data?.priceForExtraPersone)?.replaceAll(",", "") || 0,
        },
        {
          PeriodType: 0, ///آخر هفته=0  وسط هفته=1    تعطیلات=2
          priceBase: String(data?.endWeekspring)?.replaceAll(",", ""),
          otherPrice:
            String(data?.priceForExtraPersone)?.replaceAll(",", "") || 0,
        },
        {
          PeriodType: 2, ///آخر هفته=0  وسط هفته=1    تعطیلات=2
          priceBase: String(data?.peakDaysspring)?.replaceAll(",", ""),
          otherPrice:
            String(data?.priceForExtraPersone)?.replaceAll(",", "") || 0,
        },
      ],
      priceHostTourBaseSummer: [
        ////قیمت برای تابستان
        {
          PeriodType: 1, ///آخر هفته=0  وسط هفته=1    تعطیلات=2
          priceBase: String(data?.midWeeksummer)?.replaceAll(",", ""),
          otherPrice:
            String(data?.priceForExtraPersone)?.replaceAll(",", "") || 0,
        },
        {
          PeriodType: 0, ///آخر هفته=0  وسط هفته=1    تعطیلات=2
          priceBase: String(data?.endWeeksummer)?.replaceAll(",", ""),
          otherPrice:
            String(data?.priceForExtraPersone)?.replaceAll(",", "") || 0,
        },
        {
          PeriodType: 2, ///آخر هفته=0  وسط هفته=1    تعطیلات=2
          priceBase: String(data?.peakDayssummer)?.replaceAll(",", ""),
          otherPrice:
            String(data?.priceForExtraPersone)?.replaceAll(",", "") || 0,
        },
      ],
      priceHostTourBaseAutum: [
        ////قیمت برای پاییز
        {
          PeriodType: 1, ///آخر هفته=0  وسط هفته=1    تعطیلات=2
          priceBase: String(data?.midWeekautumn)?.replaceAll(",", ""),
          otherPrice:
            String(data?.priceForExtraPersone)?.replaceAll(",", "") || 0,
        },
        {
          PeriodType: 0, ///آخر هفته=0  وسط هفته=1    تعطیلات=2
          priceBase: String(data?.endWeekautumn)?.replaceAll(",", ""),
          otherPrice:
            String(data?.priceForExtraPersone)?.replaceAll(",", "") || 0,
        },
        {
          PeriodType: 2, ///آخر هفته=0  وسط هفته=1    تعطیلات=2
          priceBase: String(data?.peakDaysautumn)?.replaceAll(",", ""),
          otherPrice:
            String(data?.priceForExtraPersone)?.replaceAll(",", "") || 0,
        },
      ],
      priceHostTourBaseWinter: [
        ///قیمت برای زمستان
        {
          PeriodType: 1, ///آخر هفته=0  وسط هفته=1    تعطیلات=2
          priceBase: String(data?.midWeekwinter)?.replaceAll(",", ""),
          otherPrice:
            String(data?.priceForExtraPersone)?.replaceAll(",", "") || 0,
        },
        {
          PeriodType: 0, ///آخر هفته=0  وسط هفته=1    تعطیلات=2
          priceBase: String(data?.endWeekwinter)?.replaceAll(",", ""),
          otherPrice:
            String(data?.priceForExtraPersone)?.replaceAll(",", "") || 0,
        },
        {
          PeriodType: 2, ///آخر هفته=0  وسط هفته=1    تعطیلات=2
          priceBase: String(data?.peakDayswinter)?.replaceAll(",", ""),
          otherPrice:
            String(data?.priceForExtraPersone)?.replaceAll(",", "") || 0,
        },
      ],
    };
    console.log("Form Data:", myData);
    await manageStepsContext?.handleUpdateStay(myData);
    manageStepsContext?.handleNext();

    setLoading(false);
  };

  const handleInputChange = (e, field) => {
    const inputValue = e.target.value.replace(/,/g, "");
    if (isNaN(inputValue) && inputValue.length > 0) {
      field.onChange(ToRial(inputValue?.slice(0, -1)));
    } else {
      field.onChange(ToRial(inputValue));
    }
  };

  return (
    <>
      <Grid container spacing={3} sx={{}}>
        {/* Map Section */}
        <Grid item xs={12} md={8} sx={{ mt: 1 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {listSeasons.map((item, index) => (
              <FormSeasons
                key={index}
                item={item}
                control={control}
                setValue={setValue}
              />
            ))}{" "}
            <Box sx={{ mt: 3 }}>
              <InputeContainer label="هر نفر اضافه">
                <Controller
                  name="priceForExtraPersone"
                  control={control}
                  rules={{
                    required: "وارد کردن مبلغ الزامی است",
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      fullWidth
                      dir="ltr"
                      size="small"
                      type="text"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      // label="هر نفر اضافه"
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e, field);
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography
                              sx={{ fontSize: "0.8rem", color: "gray" }}
                            >
                              تومان
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiInputBase-input::placeholder": {
                          fontSize: "0.8rem", // Smaller font size for the placeholder
                          textAlign: "left",
                          direction: "rtl", // Right-to-left alignment
                        },
                        "& .MuiInputBase-input": {
                          // textAlign: "left", // Align the value to the left
                        },
                      }}
                    />
                  )}
                />
              </InputeContainer>
            </Box>
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
                <AttachMoneyIcon sx={{ mr: 1 }} />
                تعیین اجاره بها
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: "justify",
                }}
              >
                برای آسانتر شدن نرخ گذاری اقامتگاه در روزهای مختلف سال, پس از
                تعیین نرخهای زیر توسط شما, این نرخها با رعایت روزهای عادی و
                تعطیل هفته در فصول مختلف سال, بصورت خودکار در تقویم اقامتگاه شما
                اعمال خواهد گردید.وسط هفته: روزهای شنبه تا چهارشنبه هر هفته. آخر
                هفته: روزهای پنجشنبه و جمعه و تعطیلات عادی. ایام پیک: تعطیلات
                خاص و پر مسافر.توجه: شما همچنین می توانید با مراجعه به تقویم
                موجود در صفحه "ویرایش" اقامتگاه, اجاره بهای روزهای خاص را بصورت
                دستی تغییر دهید.
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
        // nexDisable={isNextDisabled()}
      />
    </>
  );
};

export default PriceStay;
