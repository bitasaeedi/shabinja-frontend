import React, { useEffect, useState } from "react";
import { Box, Button, Slider, Typography, useTheme } from "@mui/material";

const SelectRangePrice = ({ callBackValues, listRangePrice }) => {
  const theme = useTheme(); // Use Material-UI theme
  const [value, setValue] = useState([100000, 20000000]);

  useEffect(() => {
    console.log(listRangePrice, "listRangePrice");
    if (listRangePrice.length > 0) {
      setValue(listRangePrice);
    }
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        // backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        padding: "10px 20px",
        width: "100%",
      }}
    >
      {/* Title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
        {/* Slider Section */}
        <Box sx={{ position: "relative", mt: 1, width: "95%" }}>
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
            min={100000}
            max={20000000}
            step={100000}
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
      <hr />

      {/* Buttons Section */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            color: "black",
          }}
          variant="text"
          size="small"
          onClick={() => {
            setValue([100000, 20000000]);
            callBackValues(null);
          }} // Reset to default values
        >
          حذف فیلتر
        </Button>
        <Button
          sx={{
            bgcolor: "black",
          }}
          variant="contained"
          size="small"
          onClick={() => callBackValues(value)}
        >
          ثبت تغییرات
        </Button>
      </Box>
    </Box>
  );
};

export default SelectRangePrice;
