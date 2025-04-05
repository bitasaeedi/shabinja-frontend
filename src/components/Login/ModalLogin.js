import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Slide,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
} from "@mui/material";
import LoginForm from "./LoginForm";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import logo_with_name from "../../images/shabinja_logo_with_name.png";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalLogin = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [manageForms, setManageForms] = useState("stepMobile"); // stepMobile, stepCode, stepPass
  const navigate = useNavigate();

  const handleCallBackFinall = (stepName) => {
    if (stepName === "finish") {
      handleClose();
      navigate("/");
    }
    setManageForms(stepName);
  };
  return (
    <Dialog
      fullWidth={true} // Make it take the full width
      maxWidth={"sm"}
      scroll={"body"} //paper
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      fullScreen={fullScreen}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "16px 24px", // Adjust padding if needed
          // mt: 1,
        }}
        // style={{ zIndex: 2000 }}
      >
        {(manageForms === "stepCode" || manageForms === "stepPassword") && (
          <IconButton
            onClick={() => {
              handleCallBackFinall("stepMobile");
            }}
            sx={{
              position: "absolute",
              left: "8px",
              top: "12px",
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        )}
        <Box>
          <Box
            component="img"
            src={logo_with_name}
            alt="Shabinja Logo"
            sx={{
              maxWidth: 100, // Controls the max width of the image
              width: "auto", // Ensures the width scales proportionally
              height: "auto", // Keeps the height proportional to the width
              objectFit: "contain", // Makes sure the image fits inside the container without distortion
              cursor: "pointer",
            }}
          />
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: "8px",
            top: "8px",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="m-0 p-0 w-100">
        <LoginForm
          handleCallBack={handleCallBackFinall}
          manageForms={manageForms}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ModalLogin;
