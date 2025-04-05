import React from "react";
import { Box } from "@mui/material";

const ShowImageHeader = ({ index, image }) => {
  return (
    <Box
      component="img"
      src={image}
      alt={`Slide ${index + 1}`}
      sx={{
        width: "100%",
        height: "auto",
        maxHeight: { xs: 200, sm: 300, md: 400, lg: 500 }, // Adjust height based on screen size
        objectFit: "fill", // Ensures the image maintains aspect ratio
        borderRadius: 2, // Optional rounded corners
        boxShadow: 5, // Light shadow for better UI appearance
      }}
    />
  );
};



export default ShowImageHeader;