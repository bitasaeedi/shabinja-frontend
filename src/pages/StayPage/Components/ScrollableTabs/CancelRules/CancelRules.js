import { Box, Typography, Skeleton, Divider, Grid } from "@mui/material";
import React, { useContext } from "react";
import { StayPageContext } from "../../../StayPage";

export const CancelRules = () => {
  const options = [
    {
      id: 0,
      title: "سیاست آسان ",
      text: "با انتخاب قوانین آسان بسته به زمان کنسلی 10 تا 20 درصد از کل مبلغ رزرو از میهمان یا میزبان دریافت میشود.",
    },
    {
      id: 1,
      title: " سیاست متعادل ",
      text: "با انتخاب قوانین متعادل بسته به زمان کنسلی از 20 تا 40 درصد از کل مبلغ رزرو از میهمان یا میزبان خسارت دریافت میشود.",
    },
    {
      id: 2,
      title: "سیساست سخت‌گیرانه",
      text: "با انتخاب قوانین سخت‌گیرانه بسته به زمان کنسلی، تا 70 درصد از کل مبلغ رزرو به عنوان خسارت دریافت میشود.",

      text: "در صورتی که رزرو حداقل 5  روز کامل از تاریخ ورود لغو گردد; مبلغ صورتحساب پس از کسر حداکثر 25 درصد صورتحساب به میهمان عودت داده میشود، در غیر اینصورت اجاره شب اول بعلاوه حداکثر 60 درصد شبهای باقیمانده کسر میگردد.",
      // در صورتی که رزرو، حداقل 5 روز کامل از تاریخ ورود لغو گردد؛ مبلغ
      // صورتحساب پس از کسر حداکثر 25 درصد صورتحساب به میهمان عودت می‌شود. در
      // غیر اینصورت اجاره شب اول بعلاوه حداکثر 60 درصد شب‌های باقیمانده کسر
      // می‌گردد.
    },
  ];

  const stayPageContext = useContext(StayPageContext);

  // Check if data is still loading
  if (stayPageContext?.loading) {
    return (
      <Box>
        {/* <Skeleton variant="text" width={150} height={30} />
        <Skeleton variant="text" width={250} height={20} sx={{ mt: 1 }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} /> */}
      </Box>
    );
  }

  const fontSizeText = 15;
  return (
    <Box>
      <Divider sx={{ my: 2, bgcolor: "#ddd" }} />
      <Typography variant="h6">مقررات لغو رزرو</Typography>
      <Grid container mt={2} spacing={2}>
        <Grid item xs="12" sx={{ display: "flex"}}>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
              //   ml: 1,
              textAlign: "justify",
            }}
          >
            <Typography
              component="span"
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: { xs: 16, md: 16 }, mr: 1 }}
            >
               درصد خسارت لغو یک روز قبل از ورود :
            </Typography>
            {stayPageContext?.infoOfStay?.cancelPercentageFirst} %
          </Typography>
        </Grid>

        <Grid item xs="12" sx={{ display: "flex"}}>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
              //   ml: 1,
              textAlign: "justify",
            }}
          >
            <Typography
              component="span"
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: { xs: 16, md: 16 }, mr: 1 }}
            >
               درصد خسارت لغو سه روز قبل از ورود :
            </Typography>
            {stayPageContext?.infoOfStay?.cancelPercentageSecond} %
          </Typography>
        </Grid>

        <Grid item xs="12" sx={{ display: "flex"}}>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: fontSizeText, md: fontSizeText },
              //   ml: 1,
              textAlign: "justify",
            }}
          >
            <Typography
              component="span"
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: { xs: 16, md: 16 }, mr: 1 }}
            >
                درصد خسارت لغو بیشتر از سه روز قبل از ورود :
            </Typography>
            {stayPageContext?.infoOfStay?.cancelPercentageThird} %
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
