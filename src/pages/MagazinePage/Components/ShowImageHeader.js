import React from "react";
import { Box, Typography } from "@mui/material";

const ShowImageHeader = ({ index, slide }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "auto",
        maxHeight: { xs: 200, sm: 250, md: 300, lg: 400 },
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={slide.src}
        alt={`Slide ${index + 1}`}
        sx={{
          width: "100%",
          height: "auto",
          maxHeight: { xs: 200, sm: 250, md: 300, lg: 400 },
          objectFit: "fill",
        }}
      />
      <Box
        sx={{
          width:"40%",
          position: "absolute",
          bottom: 16,
          left: 16,
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          px: 2,
          py: 1,
          borderRadius: 1,
          fontSize: { xs: "14px", md: "18px" },
        }}
      >
        <Typography
          variant="h5"
        >
          {slide.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "14px", md: "18px" },
          }}
        >
          {slide.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default ShowImageHeader;
