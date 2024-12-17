import React from "react";
import { Card, Box, Avatar, Typography, Paper, Skeleton } from "@mui/material";

const CardSkeletonComment = () => {
  return (
    <Box className="d-flex justify-content-center w-auto pb-0 mb-0 mx-1">
      <Card
        sx={{
          width: 300,
          borderRadius: "10px",
          boxShadow: "none",
          backgroundColor: "#f9f9f9",
          pb: 2,
        }}
      >
        {/* Top Section Skeleton */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: 2,
            borderRadius: "8px",
          }}
        >
          <Skeleton
            variant="circular"
            width={80}
            height={60}
            sx={{ marginRight: 2 }}
          />
          <Box sx={{ textAlign: "left", mx: 2, width: "100%" }}>
            <Skeleton variant="text" width="50%" height={20} />
            <Skeleton
              variant="text"
              width="30%"
              height={15}
              sx={{ marginTop: 1 }}
            />
          </Box>
        </Box>

        {/* Comment Section Skeleton */}
        <Paper
          elevation={0}
          sx={{
            px: 3,
            borderRadius: "8px",
            textAlign: "left",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Skeleton
            variant="text"
            width="100%"
            height={15}
            sx={{ marginTop: 2 }}
          />
          <Skeleton
            variant="text"
            width="100%"
            height={15}
            sx={{ marginTop: 1 }}
          />
          <Skeleton
            variant="text"
            width="30%"
            height={15}
            sx={{ marginTop: 1 }}
          />
        </Paper>
      </Card>
    </Box>
  );
};

export default CardSkeletonComment;
