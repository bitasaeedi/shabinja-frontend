import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button, Grid, TextField } from "@mui/material";
import { ManageStepsContext } from "../ManageSteps";
import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import { useForm, Controller } from "react-hook-form";
import InputeContainer from "./Componnets/InputeContainer";
import CounterComponent from "../../../components/CounterComponent/CounterComponent";
import HotelIcon from "@mui/icons-material/Hotel";

const Counter = ({ label, count, increment, decrement, unit }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      mt: 2,
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontSize: { xs: 16, md: 18 },
        fontWeight: { xs: 200, md: 500 },
        color: "#333",
      }}
    >
      {label}
    </Typography>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        width: { xs: 170, md: 300 },
      }}
    >
      <Button
        variant="outlined"
        onClick={increment}
        sx={{
          fontSize: { xs: 20, md: 25 },
          minWidth: { xs: 25, md: 30 },
          height: { xs: 25, md: 30 },
          borderRadius: "10%",
          padding: 0,
          borderColor: "#000",
        }}
      >
        +
      </Button>
      <Typography
        sx={{
          fontSize: { xs: 14, md: 16 },
          minWidth: "30px",
          textAlign: "center",
        }}
      >
        {count === 0 ? "ندارد" : `${count} ${unit}`}
      </Typography>
      <Button
        variant="outlined"
        onClick={decrement}
        disabled={count <= 0}
        sx={{
          fontSize: { xs: 20, md: 25 },
          minWidth: { xs: 25, md: 30 },
          height: { xs: 25, md: 30 },
          borderRadius: "10%",
          padding: 0,
          borderColor: "#000",
        }}
      >
        -
      </Button>
    </Box>
  </Box>
);

const SpaceSleepStay = () => {
  const manageStepsContext = useContext(ManageStepsContext);
  const [loading, setLoading] = useState(false);

  const [bedrooms, setBedrooms] = useState(0);
  const [singleBeds, setSingleBeds] = useState(0);
  const [doubleBeds, setDoubleBeds] = useState(0);
  const [traditionalBeds, setTraditionalBeds] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);

  const { control, handleSubmit, watch, setValue, formState, getValues } =
    useForm({
      defaultValues: {
        // description: manageStepsContext?.hostInfoUpdating?.dics || "",
      },
    });

  useEffect(() => {
    setBedrooms(manageStepsContext?.hostInfoUpdating?.room);
    setSingleBeds(manageStepsContext?.hostInfoUpdating?.bed);
    setDoubleBeds(manageStepsContext?.hostInfoUpdating?.bedTwo);
    setTraditionalBeds(manageStepsContext?.hostInfoUpdating?.bedOld);
    setBathrooms(manageStepsContext?.hostInfoUpdating?.bathRoom);
  }, [manageStepsContext?.hostInfoUpdating]);

  const onSubmit = async () => {
    setLoading(true);

    const myData = {
      room: bedrooms,
      bed: singleBeds,
      bedTwo: doubleBeds,
      bedOld: traditionalBeds,
      bathRoom: bathrooms,
    };
    if (manageStepsContext?.stayCodeToComplete) {
      await manageStepsContext?.handleUpdateStay(myData);
      manageStepsContext?.handleNext();
    }
    setLoading(false);
  };

  const isNextDisabled = () => {
    return !(
      bedrooms >= 0 &&
      singleBeds >= 0 &&
      doubleBeds >= 0 &&
      traditionalBeds >= 0 &&
      bathrooms >= 0
    );
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
            <InputeContainer label={"اتاق خواب"} flexOnMobile={true}>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <CounterComponent
                  count={bedrooms}
                  increment={() => setBedrooms(bedrooms + 1)}
                  decrement={() => setBedrooms(Math.max(0, bedrooms - 1))}
                  unit={"اتاق"}
                  minValue={0}
                />
              </Box>
            </InputeContainer>

            <InputeContainer label=" تخت یک نفره" flexOnMobile={true}>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <CounterComponent
                  count={singleBeds}
                  increment={() => setSingleBeds(singleBeds + 1)}
                  decrement={() => setSingleBeds(Math.max(0, singleBeds - 1))}
                  unit="تخت"
                  minValue={0}
                />
              </Box>
            </InputeContainer>

            <InputeContainer label=" تخت دو نفره" flexOnMobile={true}>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <CounterComponent
                  count={doubleBeds}
                  increment={() => setDoubleBeds(doubleBeds + 1)}
                  decrement={() => setDoubleBeds(Math.max(0, doubleBeds - 1))}
                  unit="تخت"
                  minValue={0}
                />
              </Box>
            </InputeContainer>

            <InputeContainer label="رختخواب سنتی (تشک)" flexOnMobile={true}>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <CounterComponent
                  count={traditionalBeds}
                  increment={() => setTraditionalBeds(traditionalBeds + 1)}
                  decrement={() =>
                    setTraditionalBeds(Math.max(0, traditionalBeds - 1))
                  }
                  unit="تخت"
                  minValue={0}
                />
              </Box>
            </InputeContainer>

            <InputeContainer label=" حمام" flexOnMobile={true}>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <CounterComponent
                  count={bathrooms}
                  increment={() => setBathrooms(bathrooms + 1)}
                  decrement={() => setBathrooms(Math.max(0, bathrooms - 1))}
                  unit="واحد"
                  minValue={0}
                />
              </Box>
            </InputeContainer>

            <InputeContainer label={"توضیحات (اختیاری)"} flexOnMobile={false}>
              <Controller
                name="moreDescription"
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
                    // label="توضیحات"
                    multiline
                    rows={2}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </InputeContainer>
          </Box>
        </Grid>

        {/* Info Section */}
        <Grid item xs={12} md={4} sx={{ display: { xs: "none", md: "block" } }}>
          <Box
            sx={{
              boxShadow: 4,
              borderRadius: "8px",
              padding: 2,
              // backgroundColor: "#f9f9f9",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: 20,
                fontWeight: 600,
                mb: 1,
              }}
            >
              <HotelIcon sx={{ mr: 1 }} />
              امکانات خواب و حمام
            </Typography>
            <Typography variant="body2" color="text.secondary">
              تعداد اتاق‌ها و تخت‌ها را وارد کنید تا اقامتگاه شما بهتر معرفی
              شود.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <FixedButtonsSubmit
        handleNext={onSubmit}
        handlePrevious={manageStepsContext?.handlePrevious}
        prevDisable={false}
        loading={loading}
        nexDisable={isNextDisabled()}
      />
    </>
  );
};

export default SpaceSleepStay;
