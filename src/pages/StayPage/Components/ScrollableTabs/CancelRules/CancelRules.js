import { Box, Typography, Skeleton, Divider, Grid } from "@mui/material";
import React, { useContext } from "react";
import { StayPageContext } from "../../../StayPage";

export const CancelRules = () => {
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
      <Grid container mt={2}>
        <Grid item xs="12" sx={{ display: "flex", justifyContent: "center" }}>
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
              سیاست سختگیرانه :
            </Typography>
            در صورتی که رزرو، حداقل 5 روز کامل از تاریخ ورود لغو گردد؛ مبلغ
            صورتحساب پس از کسر حداکثر 25 درصد صورتحساب به میهمان عودت می‌شود. در
            غیر اینصورت اجاره شب اول بعلاوه حداکثر 60 درصد شب‌های باقیمانده کسر
            می‌گردد.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
