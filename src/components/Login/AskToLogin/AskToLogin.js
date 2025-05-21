import React, { useContext, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { AppContext } from "../../../App";

const AskToLogin = ({}) => {
  const { handleShowModal } = useContext(AppContext);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh", // Fill full height of the viewport
          textAlign: "center", // Center-align text
          padding: 2, // Add some padding for smaller screens
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "16px", md: "22px" }, // Smaller font for mobile
            color: "#666", // Gray text color
            lineHeight: 1.6, // Adjust line height for readability
            textAlign: "center",
            width: "70%",
          }}
        >
          برای تجربه‌ای بهتر لطفاً{" "}
          <span style={{ fontWeight: "bold", color: "#000" }}>
            وارد حساب کاربری
          </span>{" "}
          شوید یا{" "}
          <span style={{ fontWeight: "bold", color: "#000" }}>ثبت‌نام</span>{" "}
          کنید.
        </Typography>
        <Button
          onClick={handleShowModal}
          variant="contained"
          sx={{
            mt: 3, // Margin on top
            backgroundColor: "#000", // Black background
            color: "#fff", // White text
            padding: "10px 20px", // Button padding
            borderRadius: "8px", // Rounded corners
            "&:hover": {
              backgroundColor: "#333", // Darker black on hover
            },
          }}
        >
          ورود / ثبت‌نام
        </Button>
      </Box>
    </>
  );
};

export default AskToLogin;
