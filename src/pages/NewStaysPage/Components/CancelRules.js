import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  FormGroup,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Divider,
} from "@mui/material";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import FixedButtonsSubmit from "./Componnets/FixedButtonsSubmit";
import { ManageStepsContext } from "../ManageSteps";

const CancelRules = () => {
  const manageStepsContext = useContext(ManageStepsContext);
  const [selectedOption, setSelectedOption] = useState(0);
  const [loading, setLoading] = useState(false);
  const options = [
    {
      id: 0,
      title: "آسان (پیشنهادی شبینجا)",
      text: "با انتخاب قوانین آسان بسته به زمان کنسلی 10 تا 20 درصد از کل مبلغ رزرو از میهمان یا میزبان دریافت میشود.",
    },
    {
      id: 1,
      title: "متعادل (پیشنهادی)",
      text: "با انتخاب قوانین متعادل بسته به زمان کنسلی از 20 تا 40 درصد از کل مبلغ رزرو از میهمان یا میزبان خسارت دریافت میشود.",
    },
    {
      id: 2,
      title: "سخت‌گیرانه",
      text: "با انتخاب قوانین سخت‌گیرانه بسته به زمان کنسلی، تا 70 درصد از کل مبلغ رزرو به عنوان خسارت دریافت میشود.",
    },
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    if (manageStepsContext?.hostInfoUpdating?.cancelReservation) {
      setSelectedOption(
        manageStepsContext?.hostInfoUpdating?.cancelReservation || 0
      );
    }
    // 0 or 1 or 2
  }, [manageStepsContext?.hostInfoUpdating?.cancelReservation]);
  // cancelReservation
  const isNextDisabled = () => isNaN(selectedOption);

  const onSubmit = async () => {
    setLoading(true);
    if (!isNaN(selectedOption) && manageStepsContext?.stayCodeToComplete) {
      const res = await manageStepsContext?.handleUpdateStay({
        cancelReservation: selectedOption,
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
        <Grid item xs={12} md={8}>
          <FormGroup>
            <RadioGroup value={selectedOption} onChange={handleOptionChange}>
              {options.map((option, index) => (
                <Box key={option.id} mb={1}>
                  <FormControlLabel
                    value={option.id.toString()}
                    control={<Radio />}
                    label={
                      <Typography variant="h6" sx={{ fontSize: 16 }}>
                        {option.title}
                      </Typography>
                    }
                  />
                  <Typography variant="body2" sx={{ ml: 3 }}>
                    {option.text}
                  </Typography>
                  {index < options.length - 1 && <Divider sx={{ my: 1 }} />}
                </Box>
              ))}
            </RadioGroup>
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
