import { CardMedia, Skeleton, IconButton, Box } from "@mui/material";

import React, { useState } from "react";
import { DownloadImageApi } from "../../../api/DownloadImageApi";

const ImageOfCardMag = ({ url, title }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
      <Box sx={{ width: "100%", position: "relative" }}>
        {isImageLoaded != true && (
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{
              height: {
                xs: 150,
                sm: 180,
                md: 180,
                lg: 200,
                xl: 200,
              },
            }}
          />
        )}
        <CardMedia
          component="img"
          sx={{
            height: {
              xs: 150,
              sm: 180,
              md: 180,
              lg: 200,
              xl: 200,
            },
            objectFit: "cover",
            borderRadius: "0px 0px 0px 0px",
          }}
          // image={DownloadImageApi(url)} // Use the randomly selected image
          image={
            "https://storage.jajiga.com/mag/2025/03/%D8%B3%D9%81%D8%B1-1200x500.jpg"
          }
          alt={title}
          onLoad={handleImageLoad}
          // loading="lazy"
          style={{ display: isImageLoaded ? "block" : "none" }}
        />
        {/* <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            // bgcolor: "#f9f9f9",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>2222</Box>
          <Box>asd</Box>
        </Box> */}
      </Box>
    </>
  );
};

export default ImageOfCardMag;
