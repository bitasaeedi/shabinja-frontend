import { Box, Typography, Divider, Grid } from "@mui/material";
import React, { useContext } from "react";
import { StayPageContext } from "../../../StayPage";
import FiberIcon from "@mui/icons-material/FiberManualRecordOutlined";

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

      <Grid container mt={2} spacing={2}>
        <Grid item xs="12" sx={{ display: "flex" }}>
          <FiberIcon sx={{ color: "red", mr: 0.5 }} />
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
              variant="body1"
              sx={{ fontSize: { xs: 16, md: 16 }, mr: 1 }}
            >
              روز ورود یا پس از آن :
            </Typography>
            <Typography
              component="span"
              variant="body2"
              sx={{ fontSize: { xs: 14, md: 14 }, mr: 1, color: "#5f5f5f" }}
            >
              کسر هزینه شب‌های اقامت‌شده، یک شب اضافه و{" "}
              <Typography component="span" sx={{ fontWeight: 700, color: "#000" }}>
                {stayPageContext?.infoOfStay?.cancelPercentageFirst}٪
              </Typography>{" "}
              مبلغ باقی‌مانده، بازپرداخت مابقی
            </Typography>
          </Typography>
        </Grid>

        <Grid item xs="12" sx={{ display: "flex" }}>
          <FiberIcon sx={{ color: "gold", mr: 0.5 }} />
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
              variant="body1"
              sx={{ fontSize: { xs: 16, md: 16 }, mr: 1 }}
            >
              یک تا دو روز تا ورود :
            </Typography>

            <Typography
              component="span"
              variant="body2"
              sx={{ fontSize: { xs: 14, md: 14 }, mr: 1, color: "#5f5f5f" }}
            >
              کسر {" "}
              <Typography component="span" sx={{ fontWeight: 700, color: "#000" }}>
                {stayPageContext?.infoOfStay?.cancelPercentageSecond}٪
              </Typography>{" "}
              مبلغ رزرو، بازپرداخت مابقی.
            </Typography>
          </Typography>
        </Grid>

        <Grid item xs="12" sx={{ display: "flex" }}>
          <FiberIcon sx={{ color: "green", mr: 0.5 }} />
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
              variant="body1"
              sx={{ fontSize: { xs: 16, md: 16 }, mr: 1 }}
            >
              بیش از دو روز تا ورود :
            </Typography>

            <Typography
              component="span"
              variant="body2"
              sx={{ fontSize: { xs: 14, md: 14 }, mr: 1, color: "#5f5f5f" }}
            >
              کسر {" "}
              <Typography component="span" sx={{ fontWeight: 700, color: "#000" }}>
                {stayPageContext?.infoOfStay?.cancelPercentageThird}٪
              </Typography>{" "}
              مبلغ رزرو، بازپرداخت مابقی
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
