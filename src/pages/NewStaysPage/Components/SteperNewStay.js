import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import StepConnector from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

// Styled Connector
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  "& .MuiStepConnector-line": {
    borderColor: theme.palette.divider,
  },
  "&.Mui-active .MuiStepConnector-line": {
    borderColor: theme.palette.success.main,
  },
  "&.Mui-completed .MuiStepConnector-line": {
    borderColor: theme.palette.success.main,
  },
}));

// Custom Step Icon
const CustomStepIcon = (props) => {
  const { active, completed, className } = props;
  const index = Number(props.icon) - 1;

  return (
    <StepIconRoot
      ownerState={{ active, completed, index }}
      className={className}
    >
      <StepIconCircle ownerState={{ active, completed, index }}>
        {completed ? <CheckIcon fontSize="small" /> : props.icon}
      </StepIconCircle>
    </StepIconRoot>
  );
};

const StepIconRoot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StepIconCircle = styled("div")(({ theme, ownerState }) => ({
  width: 24,
  height: 24,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 600,
  fontSize: "0.75rem",
  ...(ownerState.completed && {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  }),
  ...(ownerState.active && {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  }),
  ...(!ownerState.active &&
    !ownerState.completed && {
      border: `2px solid ${theme.palette.divider}`,
      color: theme.palette.text.secondary,
    }),
}));

// Main Component
const SteperNewStay = ({
  lastedStep,
  activeStep,
  stepsConfig,
  handleStepChange,
  stepRefs,
}) => {
  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      nonLinear
      connector={<ColorlibConnector />}
    >
      {stepsConfig.map((step, index) => {
        const isActive = index === activeStep;
        const isClickable = lastedStep >= index;

        return (
          <Step
            key={index}
            ref={(el) => (stepRefs.current[index] = el)}
            completed={index < lastedStep}
            sx={{
              cursor: isClickable ? "pointer" : "no-drop",
            }}
          >
            <StepLabel
              StepIconComponent={CustomStepIcon}
              onClick={() => {
                if (isClickable) handleStepChange(index);
              }}
              sx={{
              }}
            >
              {isActive ? (
                <Typography variant="h6">{step.activeLabel}</Typography>
              ) : (
                <Typography>{step.label}</Typography>
              )}
            </StepLabel>

            <StepContent
              sx={{
                px: { xs: 1, md: 2 },
              }}
            >
              {step.componentLevel}
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default SteperNewStay;
