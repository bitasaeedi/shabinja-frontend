import React, { useState } from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SatelliteAltOutlinedIcon from "@mui/icons-material/SatelliteAltOutlined";

export default function SwitchMapButton({ callBack, mode }) {
  const [view, setView] = useState("map");

  const handleChange = () => {
    callBack();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Stack buttons vertically
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333", // Dark background
        borderRadius: "20px", // Circular effect
        padding: "4px", // Space around the buttons
        width: "35px", // Reduced width
        transition: "background-color 0.3s ease", // Transition for background color
      }}
    >
      <ToggleButtonGroup
        value={mode ? "map" : "satellite"}
        exclusive
        onChange={handleChange}
        orientation="vertical" // Make it vertical
        sx={{
          "& .MuiToggleButton-root": {
            border: "none", // Remove button borders
            borderRadius: "50%", // Circular buttons
            padding: "5px", // Reduced padding for smaller buttons
            color: "#fff", // Icon color
            backgroundColor: "#444", // Button background
            transition: "transform 0.8s ease", // Smooth button movement
            "&:hover": {
              backgroundColor: "inherit", // Keep background color unchanged
              color: "inherit", // Keep color unchanged
            },
            "&.Mui-selected": {
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            },
          },
          "&.Mui-selected": {
            transform: "translateY(-10px)", // Move button up when selected
          },
        }}
      >
        <ToggleButton
          value="satellite"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "white",
              color: "black",

              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            },
            "&:hover": {
              backgroundColor: "inherit",
              color: "inherit",
            },
          }}
        >
          <SatelliteAltOutlinedIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          value="map"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "white",
              color: "black",

              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            },
            "&:hover": {
              backgroundColor: "inherit",
              color: "inherit",
            },
          }}
        >
          <MapOutlinedIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
