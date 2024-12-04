import React from "react";
import { Snackbar, Alert } from "@mui/material"; // Import Alert from Material-UI

const MyAlertMui = ({ message, handleClose, status = "success" }) => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={3000} // Auto-close after 3 seconds
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "left" }} // Positioning the alert
    >
      <Alert
        onClose={handleClose}
        severity={
          status === true ? "success" : status === true ? "error" : status
        }
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MyAlertMui;
