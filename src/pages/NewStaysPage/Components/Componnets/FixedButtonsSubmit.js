import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";

const FixedButtonsSubmit = ({
  handleNext,
  handlePrevious,
  nexDisable,
  loading,
  prevDisable,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 80, md: 20 },
        left: "50%",
        transform: "translateX(-50%)", // Centers the Box horizontally
        width: "100%",
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          width: { xs: "calc(100% - 8px)", md: 400 }, // Full width minus 4px margin on mobile
          maxWidth: 400, // Max width of 400px
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
          backdropFilter: "blur(8px)", // Glass effect
          borderRadius: "12px", // Rounded corners
          padding: "12px 16px", // Internal padding
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow
          mx: "auto", // Center horizontally
        }}
      >
        {/* Previous button */}
        <Button
          onClick={handlePrevious}
          variant="contained"
          color="white"
          sx={{
            backgroundColor: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: "bold",
            border: "1px solid #ccc",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
            "&:disabled": {
              backgroundColor: "#f5f5f5",
            },
            width: 70,
          }}
          disabled={prevDisable || loading}
        >
          قبلی
        </Button>

        {/* Next button */}
        <Button
          onClick={handleNext}
          variant="contained"
          color="primary"
          sx={{
            padding: "8px 16px",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              // Custom hover styles
            },
            "&:disabled": {
              backgroundColor: "#125a9e",
              color: "white",
            },
            width: 70,
          }}
          disabled={nexDisable || loading}
        >
          {loading ? (
            <>
              <CircularProgress
                size={20}
                sx={{
                  color: "white",
                  marginRight: "8px",
                }}
              />
            </>
          ) : (
            "بعدی"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default FixedButtonsSubmit;
