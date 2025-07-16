import { Box, Typography } from "@mui/material";
import React from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useEffect, useState } from "react";
import { ExpirationTimeReserveApi } from "../../../api/PannelApis";
import { useContext } from "react";
import { ReservationStayContext } from "../ReservationStay";

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
    description: `رزرو اقامتگاه با موفقیت انجام شد، در تاریخ رزرو شده میتوانید به اقامتگاه بروید`,
  },
};

const WaitingToPay = ({ activeStep = 1, titmer = true, guid ,expired }) => {
  const [timerSec, setTimerSec] = useState(0);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const { handleGetInfoOfReserve } = useContext(ReservationStayContext);
  useEffect(() => {
    ExpirationTimeReserve();
  }, [titmer]);

  useEffect(() => {
    let interval;

    if (timerSec > 0) {
      setIsTimeOut(false);
      interval = setInterval(() => {
        setTimerSec((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimeOut(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerSec <= 0) {
      setIsTimeOut(true);
      handleGetInfoOfReserve();
    }

    return () => clearInterval(interval);
  }, [timerSec]);

  const ExpirationTimeReserve = async () => {
    const timerRes = await ExpirationTimeReserveApi(guid);
    setTimerSec(timerRes?.data || 0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

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
        <Typography variant="h6">{stepValues[activeStep]?.title}</Typography>
      </Box>
      <Box sx={{ maxWidth: 350 }}>
        <Typography variant="body2" sx={{ textAlign: "center", fontSize: 16 }}>
          {stepValues[activeStep]?.description}
        </Typography>
      </Box>
      <Box>
        {isTimeOut ? (
          <Typography color="error">زمان به پایان رسید</Typography>
        ) : (
          <Typography>{formatTime(timerSec)}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default WaitingToPay;
