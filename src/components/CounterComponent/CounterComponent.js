import { Box, Button, Typography } from "@mui/material";
import React from "react";

const CounterComponent = ({
  label,
  count,
  increment,
  decrement,
  unit,
  minValue = 0,
  defaultValueZero = "ندارد",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "flex-end", md: "flex-end" },
        // px: 1,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: { xs: 170, md: 200 },
          // gap: 3,
        }}
      >
        <Button
          variant="outlined"
          onClick={increment}
          sx={{
            fontSize: { xs: 20, md: 25 },
            minWidth: { xs: 25, md: 30 },
            height: { xs: 25, md: 30 },
            borderRadius: "10%",
            padding: 0,
            borderColor: "#000",
          }}
        >
          +
        </Button>
        <Typography
          sx={{
            fontSize: { xs: 14, md: 16 },
            minWidth: "30px",
            textAlign: "center",
            direction: count < 0 ? "rtl" : "ltr",
          }}
        >
          {count === 0 ? defaultValueZero : `${count} ${unit}`}
        </Typography>
        <Button
          variant="outlined"
          onClick={decrement}
          disabled={count <= minValue}
          sx={{
            fontSize: { xs: 20, md: 25 },
            minWidth: { xs: 25, md: 30 },
            height: { xs: 25, md: 30 },
            borderRadius: "10%",
            padding: 0,
            borderColor: "#000",
          }}
        >
          -
        </Button>
      </Box>
    </Box>
  );
};

export default CounterComponent;
