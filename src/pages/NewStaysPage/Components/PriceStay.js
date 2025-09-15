import React, { useContext, useEffect, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import {
  Box,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import SpaIcon from "@mui/icons-material/Spa";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SnowflakeIcon from "@mui/icons-material/AcUnit";
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
  const [buttonName, setButtonName] = useState("بعدی");
  const [originalValues, setOriginalValues] = useState({}); // ✅

  const { control, handleSubmit, setValue, getValues, watch } = useForm({});


  useEffect(() => {
    const myHostInfo = manageStepsContext?.hostInfoUpdating;
    if (!myHostInfo) return;

    const newOriginal = {};

    const setSeasonValues = (season, list) => {
      list.forEach((item) => {
        if (item?.periodType === 1) {
          setValue(`midWeek${season}`, ToRial(item?.priceBase));
          newOriginal[`midWeek${season}`] = ToRial(item?.priceBase);
          if (season === "spring") {
            setValue("priceForExtraPersone", ToRial(item?.otherPrice));
            newOriginal.priceForExtraPersone = ToRial(item?.otherPrice);
          }
        }
        if (item?.periodType === 0) {
          setValue(`endWeek${season}`, ToRial(item?.priceBase));
          newOriginal[`endWeek${season}`] = ToRial(item?.priceBase);
        }
        if (item?.periodType === 2) {
          setValue(`peakDays${season}`, ToRial(item?.priceBase));
          newOriginal[`peakDays${season}`] = ToRial(item?.priceBase);
        }
      });
    };

    setSeasonValues("spring", myHostInfo?.priceHostTourBaseSpring || []);
    setSeasonValues("summer", myHostInfo?.priceHostTourBaseSummer || []);
    setSeasonValues("autumn", myHostInfo?.priceHostTourBaseAutum || []);
    setSeasonValues("winter", myHostInfo?.priceHostTourBaseWinter || []);

    setOriginalValues(newOriginal); 
  }, [manageStepsContext?.hostInfoUpdating, setValue]);

  const hasFormChanged = useCallback(() => {
    const current = getValues();
    return Object.keys(originalValues).some(
      (key) => current[key] !== originalValues[key]
    );
  }, [getValues, originalValues]);

  const hasOriginalData = useCallback(() => {
    return Object.values(originalValues).some((val) => val && val !== "");
  }, [originalValues]);

  const changeButtonName = useCallback(() => {
    const isFormComplete = true;
    const isUpdateMode = !!manageStepsContext?.stayCodeToComplete;
    const formHasChanged = hasFormChanged();
    const hasOriginal = hasOriginalData();

    if (isUpdateMode && isFormComplete && formHasChanged && hasOriginal) {
      setButtonName("ثبت");
    } else {
      setButtonName("بعدی");
    }
  }, [hasFormChanged, hasOriginalData, manageStepsContext?.stayCodeToComplete]);

  // تغییر اسم دکمه هنگام تغییر فرم
  useEffect(() => {
    changeButtonName();
  }, [changeButtonName, watch()]); 

  // Submit
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
    await manageStepsContext?.handleUpdateStay(myData);
    manageStepsContext?.handleNext();
    setLoading(false);
  };

  return (
    <>
      <Grid container spacing={3} sx={{}}>
        {/* فرم قیمت‌ها */}
        <Grid item xs={12} md={8} sx={{ mt: 1 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {listSeasons.map((item, index) => (
              <FormSeasons
                key={index}
                item={item}
                control={control}
                setValue={setValue}
              />
            ))}
            <Box sx={{ mt: 3 }}>
              <InputeContainer label="هر نفر اضافه">
                <Controller
                  name="priceForExtraPersone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      dir="ltr"
                      size="small"
                      type="text"
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e);
                        const raw = e.target.value.replace(/,/g, "");
                        field.onChange(ToRial(raw));
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
                    />
                  )}
                />
              </InputeContainer>
            </Box>
          </Box>
        </Grid>

        {/* متن راهنما */}
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
              >
                <AttachMoneyIcon sx={{ mr: 1 }} />
                تعیین اجاره بها
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                توضیحات ثابت...
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
        buttonText={buttonName}
      />
    </>
  );
};

export default PriceStay;
