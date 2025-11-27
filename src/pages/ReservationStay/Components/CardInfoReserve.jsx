import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { DownloadImageApi } from "../../../api/DownloadImageApi";
import { CalculateNights } from "../../../components/DateFunctions/DateFunctions";
import ToRial from "../../../components/ToRial/ToRial";
import { ReservationStayContext } from "../ReservationStay";

const CardInfoReserve = () => {
  const {
    paramsValues,
    infoOfReserve = {},
    inputeValue = {},
    handleRequestToReserve,
    infoOfStay = {},
    loadingPrices,
    handleGoToPayLink,
  } = useContext(ReservationStayContext);

  // console.log("h" , infoOfStay);
  

  const nights = CalculateNights(paramsValues?.start, paramsValues?.end);

  const renderPriceRow = (label, value, isLoading) => (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="body2">{label}</Typography>
      </Grid>
      <Grid item xs={6} textAlign="end">
        {isLoading ? (
          <Skeleton width={80} height={20} />
        ) : (
          <Typography variant="body2">{ToRial(value || 0)} تومان</Typography>
        )}
      </Grid>
    </Grid>
  );

  const handleRunButton = () => {
    if (infoOfReserve?.state === 0) {
      handleRequestToReserve();
    } else if (infoOfReserve?.state === 2) {
      handleGoToPayLink();
    }
  };

  return (
    <Card
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: 2,
        boxShadow: { xs: "none", md: "0px 4px 12px rgba(0, 0, 0, 0.1)" },
        width: { xs: "100%", md: 380 },
        // backgroundColor: "grey.100",
      }}
    >
      <Grid container spacing={2}>

        {/* عکس اقامتگاه */}
        <Grid
          item
          xs="auto"
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          {loadingPrices ? (
            <Skeleton
              variant="rectangular"
              width={100}
              height={120}
              sx={{ borderRadius: 1 }}
            />
          ) : (
            <Box
              component="img"
              src={DownloadImageApi(infoOfStay?.img?.file?.url)}
              alt={infoOfStay?.img?.fileImgAlt || infoOfStay?.img?.file?.imgAlt|| "Stay Image"}
              sx={{
                width: 100,
                height: 120,
                borderRadius: 1,
                objectFit: "cover",
                backgroundColor: "grey.200",
              }}
            />
          )}
        </Grid>

        {/* اطلاعات اقامتگاه */}
        <Grid item xs={12} md> 
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {loadingPrices ? (
              <Skeleton width={150} height={28} />
            ) : (
              infoOfStay?.title
            )}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            display="flex"
            alignItems="center"
          >
            <Box mr={0.5}>📍</Box>
            {loadingPrices ? (
              <Skeleton width={100} height={20} />
            ) : (
              infoOfStay?.address
            )}
          </Typography>
        </Grid>

      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        جزئیات پرداخت
      </Typography>

      <Stack spacing={2} sx={{ color: "text.secondary", mb: 2 }}>
        {/* شب‌های اقامت */}
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2">
              {loadingPrices ? (
                <Skeleton width={60} height={20} />
              ) : (
                `${nights} شب اقامت`
              )}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="end">
            {loadingPrices ? (
              <Skeleton width={80} height={20} />
            ) : (
              <Typography variant="body2">
                {ToRial(infoOfReserve?.price || 0)} تومان
              </Typography>
            )}
          </Grid>
        </Grid>

        {/* نفرات اضافه */}
        {renderPriceRow(
          "نفرات اضافه",
          infoOfReserve?.extraPersonPrice,
          loadingPrices
        )}

        {/* تخفیف */}
        {renderPriceRow(
          "تخفیف",
          infoOfReserve?.totalDiscountPrice,
          loadingPrices
        )}
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        {/* جمع مبلغ قابل پرداخت */}
        <Grid item xs={6}>
          <Typography variant="subtitle1" fontWeight="bold">
            جمع مبلغ قابل پرداخت
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="end">
          {loadingPrices ? (
            <Skeleton width={100} height={28} />
          ) : (
            <Typography variant="subtitle1" fontWeight="bold">
              {ToRial(infoOfReserve?.mainPrice)} تومان
            </Typography>
          )}
        </Grid>

        {/* دکمه پرداخت */}
        <Grid item xs={12} mt={2}>
          {loadingPrices ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={44}
              sx={{ borderRadius: 1 }}
            />
          ) : (
            (infoOfReserve?.state === 0 || infoOfReserve?.state === 2) && (
              <Button
                onClick={handleRunButton}
                variant="contained"
                fullWidth
                sx={{
                  fontSize: 18,
                  backgroundColor: "#212121",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#212121",
                    opacity: 0.85,
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#424242",
                    color: "rgba(255,255,255,0.5)",
                    cursor: "not-allowed",
                  },
                }}
                disabled={
                  !inputeValue?.name ||
                  !inputeValue?.lastName ||
                  inputeValue?.sms?.toString()?.length != 11 ||
                  !inputeValue?.sms ||
                  infoOfReserve?.state === 1 ||
                  infoOfReserve?.state >= 3 ||
                  infoOfReserve?.expired ||
                  !(paramsValues?.count > 0)
                }
              >
                {infoOfReserve?.state === 0
                  ? "ثبت درخواست رزرو"
                  : infoOfReserve?.state === 1
                  ? "منتظر بمانید"
                  : infoOfReserve?.state === 2
                  ? "پرداخت"
                  : infoOfReserve?.state === 3
                  ? "در تاریخ اعلامی به اقامتگاه بروید"
                  :infoOfReserve?.state ===4
                  ?"رد توسط میزبان"
                  : infoOfReserve?.state ===5 
                  ? "لغو شده"
                  : "نامشخص"}
              </Button>
            )
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardInfoReserve;
