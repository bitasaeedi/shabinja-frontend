import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Header from "../../layout/header/Header";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Step Component for reusability
const StepComponent = ({ stepNumber }) => (
  <Box sx={{ minHeight: "100px" }}>
    <Button>مرحله {stepNumber}</Button>
  </Box>
);

// تنظیمات مراحل
const stepsConfig = [
  { label: "آدرس", stepNumber: 1 },
  { label: "نقشه", stepNumber: 2 },
  { label: "تصاویر اقامتگاه", stepNumber: 3 },
  { label: "درباره اقامتگاه", stepNumber: 4 },
  { label: "مشخصات اقامتگاه", stepNumber: 5 },
  { label: "امکانات اقامتگاه", stepNumber: 6 },
  { label: "قوانین اقامتگاه", stepNumber: 7 },
  { label: "تقویم اقامتگاه", stepNumber: 8 },
  { label: "نرخ اقامتگاه", stepNumber: 9 },
];

const NewStaysPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]); // ایجاد آرایه‌ای از ref‌ها برای مراحل
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile view
  // هنگام تغییر مرحله، اسکرول به آن بخش
  const handleStepChange = (step) => {
    setActiveStep(step);
    stepRefs.current[step - (isMobile ? 1 : 2)]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* Header */}
      <Header showMobileHeader={false} />
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          margin: "0 auto",
          padding: { xs: 2, md: 0 },
        }}
      >
        <Box sx={{ height: { xs: 0, md: 80 } }}></Box>
        {/* Stepper */}
        <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
          {stepsConfig.map((step, index) => (
            <Step
              key={step.label}
              onClick={() => handleStepChange(index)}
              ref={(el) => (stepRefs.current[index] = el)} // اختصاص ref به هر مرحله
            >
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <StepComponent stepNumber={step.stepNumber} />
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
};

export default NewStaysPage;
