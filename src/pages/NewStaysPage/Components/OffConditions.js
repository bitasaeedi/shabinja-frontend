import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  FormGroup,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Collapse,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import { ManageStepsContext } from "../ManageSteps";
import LocalOfferIcon from "@mui/icons-material/LocalOffer"; // آیکون تخفیف
import InputeContainer from "./Componnets/InputeContainer";
import PercentIcon from "@mui/icons-material/Percent";
const OffConditions = () => {
  const manageStepsContext = useContext(ManageStepsContext);
  const [showBox, setShowBox] = useState(false);
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    const {} = data;
    const myData = {};
    if (manageStepsContext?.stayCodeToComplete) {
      await manageStepsContext?.handleUpdateStay(myData);
      manageStepsContext?.handleNext();
    }
  };

  const isNextDisabled = () => !true;

  const handleInputChange = (e, name) => {
    var value = e.target.value.replace(/,/g, "");

    if (value === "" || isNaN(value)) {
      setValue(name, "");
      return;
    }
    // Ensure the value is a number and between 0 and 90
    if (/^\d*$/.test(value)) {
      // Convert the value to an integer
      value = parseInt(value, 10);

      // Ensure the value is between 0 and 90
      if (value >= 0 && value <= 90) {
        setValue(name, value);
      }
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <FormGroup>
            {/* تخفیف هفتگی */}
            <InputeContainer
              label={"تخفیف هفتگی  "}
              text={"تخفیف برای اقامت  بیش از 7 روز"}
              textAlwaysBelowLable={true}
            >
              <Controller
                name="DiscountWeeky"
                control={control}
                rules={{
                  required: "الزامی است",
                  validate: (value) =>
                    (value >= 0 && value <= 90) ||
                    "مقدار باید بزرگتر از صفر باشد",
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={(e) => handleInputChange(e, "DiscountWeeky")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">درصد</InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </InputeContainer>

            {/* تخفیف ماهانه */}
            <Box sx={{ my: 2 }}>
              <InputeContainer
                label={"تخفیف ماهیانه "}
                text={"تخفیف برای اقامت  بیش از 28 روز"}
                textAlwaysBelowLable={true}
              >
                <Controller
                  name="DiscountMonth"
                  control={control}
                  rules={{
                    required: "الزامی است",
                    validate: (value) =>
                      (value >= 0 && value <= 90) ||
                      "مقدار باید بزرگتر از صفر باشد",
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      onChange={(e) => handleInputChange(e, "DiscountMonth")}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">درصد</InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </InputeContainer>
            </Box>
            <Grid
              container
              sx={{
                mb: 2,
              }}
            >
              <Grid
                item
                xs="12"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 16,
                  }}
                >
                  {"تخفیف اتوماتک لحظه آخری"}
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={showBox}
                      onChange={(e) => setShowBox(e.target.checked)}
                    />
                  }
                />
              </Grid>
              <Grid item xs="12" md="9">
                <Typography
                  variant="body2"
                  sx={{
                    // mt: 1,
                    fontSize: 12,
                    color: "#666666",
                    textAlign: "justify",
                  }}
                >
                  {
                    "برای افزایش فروش میتوانید تخفیف‌هایی را در نظر بگیرید که در روزهای اخر روی اقامتگاه شما اعمال شود، با اعمال این تخفیف ‌ها نرخ پر شدن اقامتگاه‌تان بالاتر میرود و در نهایت درآمد بیشتری کسب میکنید، حداکثر مبلغ تخفیف 90% ااست."
                  }
                </Typography>
              </Grid>
            </Grid>

            {/* active with switch */}
            <Collapse in={showBox} timeout="auto">
              <Box>
                {/* تخفیف امروز */}
                <InputeContainer
                  label={"تخفیف امروز (روز آخر)"}
                  text={
                    "این تخفیف هر روز ساعت 00:00 روی قیمت امروز (روز آخر فروش) اعمال میشود."
                  }
                  textAlwaysBelowLable={true}
                >
                  <Controller
                    name="DiscountToday"
                    control={control}
                    rules={{
                      required: showBox ? "الزامی است" : false,
                      validate: (value) =>
                        !showBox ||
                        (value >= 0 && value <= 90) ||
                        "مقدار باید بزرگتر از صفر باشد",
                    }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        onChange={(e) => handleInputChange(e, "DiscountToday")}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">درصد</InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </InputeContainer>

                {/* تخفیف فردا */}
                <Box sx={{ my: 2 }}>
                  <InputeContainer
                    label={"تخفیف فردا"}
                    text={
                      "این تخفیف هر روز ساعت 00:00 روی قیمت فردا اعمال میشود."
                    }
                    textAlwaysBelowLable={true}
                  >
                    <Controller
                      name="DiscountSecond"
                      control={control}
                      rules={{
                        required: showBox ? "الزامی است" : false,
                        validate: (value) =>
                          !showBox ||
                          (value >= 0 && value <= 90) ||
                          "مقدار باید بزرگتر از صفر باشد",
                      }}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          fullWidth
                          size="small"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          onChange={(e) =>
                            handleInputChange(e, "DiscountSecond")
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                درصد
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </InputeContainer>
                </Box>
                {/* تخفیف پس فردا */}
                <InputeContainer
                  label={"تخفیف پس‌فردا"}
                  text={
                    "این تخفیف هر روز ساعت 00:00 روی قیمت پس‌فردا اعمال میشود."
                  }
                  textAlwaysBelowLable={true}
                >
                  <Controller
                    name="DiscountThrid"
                    control={control}
                    rules={{
                      required: showBox ? "الزامی است" : false,
                      validate: (value) =>
                        !showBox ||
                        (value >= 0 && value <= 90) ||
                        "مقدار باید بزرگتر از صفر باشد",
                    }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        onChange={(e) => handleInputChange(e, "DiscountThrid")}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">درصد</InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </InputeContainer>
              </Box>
            </Collapse>
          </FormGroup>
        </Grid>

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
                <PercentIcon sx={{ mr: 1 }} />
                تخفیف گذاری{" "}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                رای افزایش فروش میتوانید تخفیف‌هایی را در نظر بگیرید که در
                روزهای اخر روی اقامتگاه شما اعمال شود،
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <FixedButtonsSubmit
        handleNext={handleSubmit(onSubmit)}
        handlePrevious={manageStepsContext?.handlePrevious}
        prevDisable={false}
        loading={false}
        nexDisable={isNextDisabled()}
      />
    </>
  );
};

export default OffConditions;
