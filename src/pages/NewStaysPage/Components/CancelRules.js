import React, { useContext, useEffect, useState, useCallback } from "react";
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
  const [buttonName, setButtonName] = useState("بعدی");

  // Store original values for comparison
  const [originalValues] = useState({
    cancelPercentageFirst: manageStepsContext?.hostInfoUpdating?.cancelPercentageFirst || "",
    cancelPercentageSecond: manageStepsContext?.hostInfoUpdating?.cancelPercentageSecond || "",
    cancelPercentageThird: manageStepsContext?.hostInfoUpdating?.cancelPercentageThird || "",
  });

  const hasFormChanged = useCallback(() => {
    return (
      lastDay !== originalValues.cancelPercentageFirst ||
      last3Day !== originalValues.cancelPercentageSecond ||
      moreDays !== originalValues.cancelPercentageThird
    );
  }, [lastDay, last3Day, moreDays, originalValues]);

  const hasOriginalData = useCallback(() => {
    return (
      originalValues.cancelPercentageFirst ||
      originalValues.cancelPercentageSecond ||
      originalValues.cancelPercentageThird
    );
  }, [originalValues]);

  const changeButtonName = useCallback(() => {
    const isFormComplete = lastDay && last3Day && moreDays;
    const isUpdateMode = manageStepsContext?.stayCodeToComplete;
    const formHasChanged = hasFormChanged();
    const hasOriginal = hasOriginalData();

    if (isUpdateMode && isFormComplete && formHasChanged && hasOriginal) {
      setButtonName("ثبت");
    } else {
      setButtonName("بعدی");
    }
  }, [lastDay, last3Day, moreDays, hasFormChanged, hasOriginalData, manageStepsContext?.stayCodeToComplete]);

  useEffect(() => {
    changeButtonName();
  }, [changeButtonName]);

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

  useState(() => {
    setlastDay(manageStepsContext?.hostInfoUpdating?.cancelPercentageFirst);
    setlast3Day(manageStepsContext?.hostInfoUpdating?.cancelPercentageSecond);
    setMoreDays(manageStepsContext?.hostInfoUpdating?.cancelPercentageThird);
  }, [manageStepsContext?.hostInfoUpdating]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7} className="  my-4" sx={{ ml: 3, pr: 3 }}>
          <FormGroup>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                sx={{ fontSize: 16, mb: 3, minWidth: "135px" }}
              >
                روز ورود یا پس از آن
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

            <Typography
              component="span"
              variant="body2"
              mb={3}
              sx={{ fontSize: { xs: 12, md: 12 }, mr: 1, color: "#5f5f5f" }}
            >
              کسر هزینه شب‌های اقامت‌شده، یک شب اضافه و درصد انتخابی از مبلغ باقی‌مانده، بازپرداخت مابقی.
            </Typography>

            <Box
              // mb={2}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: 16, mb: 3, minWidth: "135px" }}
              >
                یک تا دو روز تا ورود
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
            <Typography
              component="span"
              variant="body2"
              mb={3}
              sx={{ fontSize: { xs: 12, md: 12 }, mr: 1, color: "#5f5f5f" }}
            >
            کسر درصد انتخابی از مبلغ رزرو، بازپرداخت مابقی.
            </Typography>

            <Box
              // mb={2}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: 16, mb: 3, minWidth: "135px" }}
              >
                بیش از دو روز تا ورود
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
            <Typography
              component="span"
              variant="body2"
              mb={3}
              sx={{ fontSize: { xs: 12, md: 12 }, mr: 1, color: "#5f5f5f" }}
            >
             کسر درصد انتخابی از مبلغ رزرو، بازپرداخت مابقی.
            </Typography>
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
        buttonText={buttonName}
      />
    </>
  );
};

export default CancelRules;
