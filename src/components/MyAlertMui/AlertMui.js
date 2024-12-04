import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const MyAlert = ({ alert, onClose }) => {
  return (
    <Snackbar
      open={!!alert}
      autoHideDuration={3000} // Optional: Set a default auto-close duration here
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      {alert && (
        <Alert onClose={onClose} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      )}
    </Snackbar>
  );
};

export default MyAlert;
