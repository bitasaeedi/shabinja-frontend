import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import StepConnector from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

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

const StepIconRoot = styled("div")(({ theme, ownerState }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...(ownerState.completed && {
    color: theme.palette.success.main,
  }),
  ...(ownerState.error && {
    color: theme.palette.error.main,
  }),
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
  ...(ownerState.active &&
    !ownerState.error && {
      border: `2px solid ${theme.palette.success.main}`,
      color: "#fff",
      backgroundColor: theme.palette.success.main,
    }),
  ...(ownerState.completed && {
    color: theme.palette.success.contrastText,
    backgroundColor: theme.palette.success.main,
  }),
  ...(ownerState.inactive && {
    border: `2px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
  }),
}));

function StepIcon(props) {
  const { active, completed, error, icon } = props;
  const inactive = !active && !completed;

  return (
    <StepIconRoot ownerState={{ active, completed, error }}>
      {completed ? (
        <CheckCircleIcon fontSize="small" />
      ) : error ? (
        <ErrorIcon fontSize="small" />
      ) : (
        <StepIconCircle ownerState={{ active, error, inactive }}>
          {icon}
        </StepIconCircle>
      )}
    </StepIconRoot>
  );
}
const mysteps = ["ثبت درخواست", "تایید میزبان", "پرداخت", "تحویل کلید"];
const StepperReserve = ({
  errorTab = true,
  activeStep = 2,
  steps = mysteps,
}) => {
  return (
    <Box sx={{ width: "100%", py: 2 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<ColorlibConnector />}
        sx={{ width: "100%" }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={index < activeStep}>
            <StepLabel
              StepIconComponent={StepIcon}
              StepIconProps={{
                error: errorTab && index === activeStep,
              }}
              sx={{
                "& .MuiStepLabel-label": {
                  fontSize: "0.8rem",
                  fontWeight: 500,
                },
                "& .MuiStepLabel-label.Mui-active": {
                  fontWeight: 600,
                  color: errorTab ? "error.main" : "success.main",
                },
                "& .MuiStepLabel-label.Mui-completed": {
                  color: "success.main",
                },
                "& .MuiStepLabel-label.Mui-disabled": {
                  color: "text.secondary",
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperReserve;
