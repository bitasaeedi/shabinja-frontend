import React from "react";
import { Box, Skeleton } from "@mui/material";

const SkeletonCard = () => {
  return (
    <Box
      sx={{
        width: { xs: 255, sm: 265, md: 300, lg: 310, xl: 330 },
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 1,
        bgcolor: "#fff",
        mx: 1,
      }}
    >
     
      <Skeleton variant="rectangular" width="100%" height={160} />

     
      <Box sx={{ p: 1 }}>
        <Skeleton width="80%" height={20} sx={{ mb: 1 }} />
       
        <Skeleton width="60%" height={20} />
        <Skeleton width="45%" height={20} />
      </Box>
    </Box>
  );
};

export default SkeletonCard;
