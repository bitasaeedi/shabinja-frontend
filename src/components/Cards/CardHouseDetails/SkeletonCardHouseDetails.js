import React from "react";
import { Box, Card, CardContent, Skeleton } from "@mui/material";

const SkeletonCardHouseDetails = (isMapOpen = false) => (
  <Card
    sx={{
      width: {
        xs: 320,
        sm: 360,
        md: 360,
        lg: 360,
        xl: 400,
      },
      borderRadius: 3,
      overflow: "hidden",
      direction: "rtl",
      pb: 0,
      mb: 1,
      boxShadow: "none !important",
      backgroundColor: "transparent",
    }}
  >
    {/* Skeleton for Image */}
    <Skeleton
      variant="rectangular"
      width="100%"
      sx={{
        height: {
          xs: 180,
          sm: 200,
          md: 200,
          lg: 200,
          xl: 200,
        },
      }}
    />

    {/* Skeleton for Content */}
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "end",
      }}
      className="my-0 py-0"
    >
      {/* Title */}
      <Skeleton variant="text" width="30%" sx={{ mb: 1, mt: 2 }} height={20} />
      {/* Location */}
      <Skeleton variant="text" width="70%" sx={{ mb: 1 }} height={15} />
      {/* Price */}
      <Skeleton variant="text" width="50%" sx={{ mb: 1 }} height={15} />
      {/* Rating */}
      {/* <Skeleton variant="circular" width={20} height={20} /> */}
    </CardContent>
  </Card>
);

export default SkeletonCardHouseDetails;
