import { Box, Typography } from "@mui/material";
import React from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const stepValues = {
  1: {
    title: "در انتظار تایید میزبان",
    description: `درخواست شما برای میزبان ارسال شد، لطفا منتظر تایید درخواست از سوی میزبان بمانید`,
  },
  2: {
    title: "در انتظار پرداخت",
    description: `میزبان شما درخواست رزرو را تایید کرد، با توجه به مهلت پرداخت و امکان از دست دادن رزرو ، به موقع پرداخت کنید.`,
  },
  3: {
    title: "پرداخت شد",
    description: `asdadwqewe`,
  },
};

const WaitingToPay = ({ activeStep = 1 }) => {
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
          {stepValues[activeStep]?.title}
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 350 }}>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", fontSize: 16 }}
          //   fontWeight={"bold"}
        >
          {stepValues[activeStep]?.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default WaitingToPay;
