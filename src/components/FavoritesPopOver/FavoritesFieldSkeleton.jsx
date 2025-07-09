
import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";

const FavoritesFieldSkeleton = ({ count = 4 }) => {
  // count: how many skeleton cards to show (default 4)
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1rem",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: ".6rem",
            padding: ".5rem",
            borderRadius: "6px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          <Skeleton
            variant="rectangular"
            width={50}
            height={50}
            sx={{ borderRadius: "6px" }}
          />
          <Box sx={{ flex: 1 }}>
            <Skeleton width="80%" height={24} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FavoritesFieldSkeleton;