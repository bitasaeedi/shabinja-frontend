import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  FormGroup,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import { ManageStepsContext } from "../ManageSteps";

const CancelRules = () => {
  const manageStepsContext = useContext(ManageStepsContext);
  const [lastDay, setlastDay] = useState("");
  const [last3Day, setlast3Day] = useState("");
  const [moreDays, setMoreDays] = useState("");
  const [loading, setLoading] = useState(false);

  // const options = [
  //   {
  //     id: 0,
  //     title: "آسان (پیشنهادی شبینجا)",
  //     text: "با انتخاب قوانین آسان بسته به زمان کنسلی 10 تا 20 درصد از کل مبلغ رزرو از میهمان یا میزبان دریافت میشود.",
  //   },
  //   {
  //     id: 1,
  //     title: "متعادل (پیشنهادی)",
  //     text: "با انتخاب قوانین متعادل بسته به زمان کنسلی از 20 تا 40 درصد از کل مبلغ رزرو از میهمان یا میزبان خسارت دریافت میشود.",
  //   },
  //   {
  //     id: 2,
  //     title: "سخت‌گیرانه",
  //     text: "با انتخاب قوانین سخت‌گیرانه بسته به زمان کنسلی، تا 70 درصد از کل مبلغ رزرو به عنوان خسارت دریافت میشود.",
  //   },
  // ];

  // useEffect(() => {
  //   if (manageStepsContext?.hostInfoUpdating?.cancelReservation) { // اینو اپدیت کنم بعد ای پی ای
  //     // setSelectedOption(
  //     //   manageStepsContext?.hostInfoUpdating?.cancelReservation || 0
  //     // );
  //   }
  //   // 0 or 1 or 2
  // }, [manageStepsContext?.hostInfoUpdating?.cancelReservation]);
  // cancelReservation
  const isNextDisabled = () => !lastDay || !last3Day || !moreDays;

  const onSubmit = async () => {
    setLoading(true);
    if (
      lastDay &&
      last3Day &&
      moreDays &&
      manageStepsContext?.stayCodeToComplete
    ) {
      const res = await manageStepsContext?.handleUpdateStay({
        cancelPercentageFirst: lastDay,
        cancelPercentageSecond: last3Day,
        cancelPercentageThird: moreDays,
      });
      if (res) {
        manageStepsContext?.handleNext();
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7} className="  my-4" sx={{ ml: 3, pr: 3 }}>
          <FormGroup>
            <Box
              mb={2}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: 16, mb: 3, minWidth: "110px" }}
              >
                24 ساعت قبل
              </Typography>

              <TextField
                dir="ltr"
                fullWidth
                size="small"
                type="text"
                value={lastDay || ""}
                onChange={(e) => setlastDay(e.target.value)}
                InputProps={{
                  onFocus: (e) => e.preventDefault(),
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>
                        درصد
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    fontSize: "0.8rem",
                    textAlign: "left",
                    direction: "rtl",
                  },
                }}
              />
            </Box>
            <Box
              mb={2}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: 16, mb: 3, minWidth: "110px" }}
              >
                3 روز قبل
              </Typography>
              <TextField
                dir="ltr"
                fullWidth
                size="small"
                type="text"
                value={last3Day || ""}
                onChange={(e) => setlast3Day(e.target.value)}
                InputProps={{
                  onFocus: (e) => e.preventDefault(),
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>
                        درصد
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    fontSize: "0.8rem",
                    textAlign: "left",
                    direction: "rtl",
                  },
                }}
              />
            </Box>
            <Box
              mb={2}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: 16, mb: 3, minWidth: "110px" }}
              >
                بیشتر
              </Typography>
              <TextField
                dir="ltr"
                fullWidth
                size="small"
                type="text"
                value={moreDays || ""}
                onChange={(e) => setMoreDays(e.target.value)}
                InputProps={{
                  onFocus: (e) => e.preventDefault(),
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>
                        درصد
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    fontSize: "0.8rem",
                    textAlign: "left",
                    direction: "rtl",
                  },
                }}
              />
            </Box>
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
                <GavelOutlinedIcon sx={{ mr: 1 }} />
                قوانین لغو رزرو
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "justify" }}
              >
                در این قسمت شرایط لغو رزرو را مشخص میکنید.
              </Typography>
            </CardContent>
          </Card>
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

export default CancelRules;
