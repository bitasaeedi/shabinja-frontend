import { Box, Typography } from "@mui/material";
import React from "react";

const InputeContainer = ({
  children,
  label,
  text,
  flexOnMobile = false,
  textAlwaysBelowLable = false,
}) => {
  return (
    <Box
      sx={{
        display: {
          xs: flexOnMobile ? "flex" : "",
          md: "flex",
        },
        width: "100%",
        justifyContent: "space-between",
        alignItems: "start",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "45%" },
          pr: 1,
          pb: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: 16,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: { md: 11, xs: 10 },
            color: "#666666",
            display: { md: textAlwaysBelowLable ? "flex" : "none" },
            // textAlign: "justify",
          }}
        >
          {text}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", p: 0, m: 0, mb: 3 }}>
        {children}
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            // p: 0,
            fontSize: 12,
            color: "#666666",
            display: { xs: "none", md: textAlwaysBelowLable ? "none" : "flex" },
            textAlign: "justify",
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default InputeContainer;
