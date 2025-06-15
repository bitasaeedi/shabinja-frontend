import { CardMedia, Skeleton, IconButton, Box } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import React, { useState } from "react";
import { useEffect } from "react";
import { DownloadImageApi } from "../../../api/DownloadImageApi";

const ImageOfCardDetails = ({ url, title }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);


  const handleImageLoad = () => {
    setIsImageLoaded(true);
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
            borderRadius: "0px 0px 10px 10px",
          }}
          image={DownloadImageApi(url)} // Use the randomly selected image
          alt={title}
          onLoad={handleImageLoad}
          // loading="lazy"
          style={{ display: isImageLoaded ? "block" : "none" }}
        />

      </Box>
    </>
  );
};

export default ImageOfCardDetails;
