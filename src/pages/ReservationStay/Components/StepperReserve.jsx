import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const StepperReserve = () => {
  const steps = ["ثبت درخواست ", "تایید میزبان", "پرداخت"];
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={0}
        alternativeLabel
        sx={{ backgroundColor: "grey.100", py: 1 }}
        
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperReserve;
