import React from "react";
import { Box, Typography } from "@mui/material";

const CreditCard = () => {
  const amount = 250000;
  return (
    <Box
      sx={{
        width: { xs: "100%", md: 400 },
        height: { xs: 150, md: 200 },
        borderRadius: 3,
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#fff",
        background: "linear-gradient(135deg, #287dfa, #6a11cb)",
        // background: 'linear-gradient(135deg, #fcb045, #fd1d1d)',
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      {/* Top Section */}
      <Typography variant="h6" fontWeight="bold">
        shabinja.com
      </Typography>

      {/* Card Number */}
      <Typography
        variant="h5"
        sx={{ letterSpacing: 2, fontFamily: "monospace", textAlign: "center" }}
      >
        {/* 1234 5678 9012 3456 */}
      </Typography>

      {/* Bottom Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="subtitle2">موجودی کیف پول</Typography>
          {/* <Typography variant="body1" fontWeight="bold">
            John Doe
          </Typography> */}
        </Box>
        <Box className="d-flex">
          <Typography variant="body1" fontWeight="bold">
            {amount.toLocaleString()}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              pl: "4px",
            }}
          >
            تومان
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CreditCard;
