import React from "react";
import { Box, Card, CardContent, Skeleton } from "@mui/material";

const HomeCardSkeleton = () => (
  <Box className="d-flex justify-content-center w-100 pb-0 mb-0">
    <Card
      sx={{
        width: { xs: 200, sm: 250, md: 250, lg: 300, xl: 320 },
        borderRadius: 3,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        direction: "rtl",
        pb: 0,
        mb: 1,
      }}
    >
      {/* Skeleton for Image */}
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{
          height: { xs: 160, sm: 160, md: 180 },
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
      >
        {/* Title */}
        <Skeleton variant="text" width="70%" sx={{ mb: 1 }} />
        {/* Location */}
        <Skeleton variant="text" width="50%" sx={{ mb: 1 }} />
        {/* Price */}
        <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
        {/* Rating */}
        <Skeleton variant="circular" width={20} height={20} />
      </CardContent>
    </Card>
  </Box>
);

export default HomeCardSkeleton;
