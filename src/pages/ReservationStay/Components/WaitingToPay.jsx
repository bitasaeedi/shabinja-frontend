import { Box, Typography } from "@mui/material";
import React from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
const WaitingToPay = () => {
  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <AccessTimeOutlinedIcon
          sx={{
            fontSize: 40,
            color: "#e7bc57",
          }}
        />
      </Box>
      <Box>
        <Typography
          variant="h6"
          // fontWeight={"bold"}
        >
          در انتظار پرداخت
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 350 }}>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", fontSize: 16 }}
          //   fontWeight={"bold"}
        >
          میزبان شما درخواست رزرو را تایید کرد، با توجه به مهلت پرداخت و امکان
          از دست دادن رزرو ، به موقع پرداخت کنید.
        </Typography>
      </Box>
    </Box>
  );
};

export default WaitingToPay;
