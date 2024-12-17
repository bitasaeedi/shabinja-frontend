import React from "react";
import { Box, Card, CardContent, Skeleton } from "@mui/material";

const HomeCardSkeleton = () => (
  <Box className="d-flex justify-content-center w-auto pb-0 mb-0">
    <Card
      sx={{
        width: { xs: 255, sm: 265, md: 300, lg: 310, xl: 330   },
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
          height: { xs: 140, sm: 140, md: 180 },
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
        <Skeleton
          variant="text"
          width="30%"
          sx={{ mb: 1, mt: 2 }}
          height={20}
        />
        {/* Location */}
        <Skeleton variant="text" width="70%" sx={{ mb: 1 }} height={15} />
        {/* Price */}
        <Skeleton variant="text" width="50%" sx={{ mb: 1 }} height={15} />
        {/* Rating */}
        {/* <Skeleton variant="circular" width={20} height={20} /> */}
      </CardContent>
    </Card>
  </Box>
);

export default HomeCardSkeleton;
