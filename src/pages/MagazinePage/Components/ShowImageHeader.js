import React from "react";
import { Box, Typography } from "@mui/material";

const ShowImageHeader = ({ index, slide }) => {
  return (
    <Box sx={{
      display:"flex",
      justifyContent:"space-between"
    }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 8", // نسبت ابعاد (مثلاً ویدیو یا بنر)
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={require("../../../assest/images/sidebar/4.jpg")}
          alt={`Slide ${index + 1}`}
          sx={{
            width: "100%",
            height: "100%",
            // maxHeight: { xs: 200, sm: 250, md: 300, lg: 500 },
            objectFit: "cover",
          }}
        />
       
      </Box>
       <Box
          sx={{
            width: "40%",
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
          <Typography variant="h5">{slide.title}</Typography>

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
