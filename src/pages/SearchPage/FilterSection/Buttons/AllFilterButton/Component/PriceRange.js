import React, { useState } from "react";
import { Box, Button, Slider, Typography, useTheme } from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

const PriceRange = () => {
  const theme = useTheme(); // Use Material-UI theme
  const [value, setValue] = useState([150000, 10000000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        // backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        padding: "10px 0px",
        width: "100%",
        px: { xs: 0, md: 2 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <AttachMoneyOutlinedIcon
          sx={{
            fontSize: { xs: 17, md: 20 },
            mr: 2,
            // color: "gray",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            color: "#333",
          }}
        >
          قیمت برای هر شب
        </Typography>
      </Box>

      <Box className="w-100 d-flex justify-content-center">
        <Box
          sx={{ position: "relative", mt: 1, width: { xs: "85%", md: "50%" } }}
        >
          {/* Slider */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Minimum Price Label */}
            <Typography
              sx={{
                // position: "absolute",
                // top: -30,
                // left: 0,
                fontSize: "12px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {value[0].toLocaleString()} تومان
            </Typography>

            {/* Maximum Price Label */}
            <Typography
              sx={{
                // position: "absolute",
                // top: -30,
                // right: 0,
                fontSize: "12px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {value[1].toLocaleString()} تومان
            </Typography>
          </Box>
          <Slider
            value={value}
            onChange={handleChange}
            min={150000}
            max={10000000}
            step={1000}
            valueLabelDisplay="off"
            color="dark"
            sx={{
              mt: 1,
              "& .MuiSlider-thumb": {
                height: 24,
                width: 24,
                backgroundColor: "#fff",
                border: "1px solid currentColor",
                "&:hover": {
                  boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
                },
              },
              "& .MuiSlider-track": {
                height: 2,
              },
              "& .MuiSlider-rail": {
                color: "#d8d8d8",
                opacity: 1,
                height: 2,
                ...theme.applyStyles("dark", {
                  color: "#bfbfbf",
                  opacity: undefined,
                }),
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PriceRange;
