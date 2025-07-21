import { CardMedia, Skeleton, IconButton, Box } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import React, { useState } from "react";
import { useEffect } from "react";
import { DownloadImageApi } from "../../../api/DownloadImageApi";
import { Link } from "react-router-dom";

const ImageOfCardDetails = ({ url, title, myData }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  console.log("myData id", myData);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <Link
      to={`/stay/${myData?.id}`}
      style={{ textDecoration: "none", display: "block", width: "100%" }}
      target="_blank"
    >
      <Box sx={{ width: "100%", position: "relative" }}>
        {isImageLoaded != true && (
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{
              height: {
                xs: 210,
                sm: 220,
                md: 200,
                lg: 205,
                xl: 205,
              },
            }}
          />
        )}
        <CardMedia
          component="img"
          sx={{
            height: {
              xs: 210,
              sm: 220,
              md: 200,
              lg: 205,
              xl: 205,
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
    </Link>
  );
};

export default ImageOfCardDetails;
