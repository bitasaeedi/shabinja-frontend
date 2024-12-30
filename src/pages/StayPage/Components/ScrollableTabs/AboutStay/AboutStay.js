import { Box, Typography } from "@mui/material";
import React from "react";

export const AboutStay = () => {
  return (
    <Box>
      <Typography variant="h6">درباره اقامتگاه </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: 16,
        }}
      >
        این اقامتگاه در جنت آباد تهران واقع شده است.
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: 14,
          textAlign: "justify",
        }}
      >
        این واحد از سمت وروردی حیاط 4 تا پله به سمت پایین دارد تا به اقامتگاه
        برسید در طول اقامت دعوت مهمان مجاز نمی باشد . تعویض همراه امکانپذیر نمی
        باشد . ارائه کارت ملی الزامی می باشد . پذیرش میهمان تا 12 شب می باشد، در
        صورتی که بعد از ساعت 12 ورود داشته باشند مبلغ 300 هزار تومان دریافت می
        شود. پذیرش یک زوج به همراه کودک با هماهنگی قبلی امکان پذیر می باشد. از
        پذیرش افراد بومی معذوریم.
      </Typography>
    </Box>
  );
};
