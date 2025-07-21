import { CardMedia, Skeleton, IconButton, Box, Tooltip } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DownloadImageApi } from "../../../api/DownloadImageApi";
import { InView } from "react-intersection-observer";
const ImageOfCard = ({ url, title, myData }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <>
      <Link
        to={`/stay/${myData?.id}`}
        style={{
          textDecoration: "none",
          display: "block",
          width: "100%",
          color: "inherit",
        }}
        target="_blank"
      >
        <Box sx={{ width: "100%", position: "relative" }}>
          {isImageLoaded != true && (
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{
                height: { xs: 160, sm: 155, md: 205 },
              }}
            />
          )}
          <CardMedia
            component="img"
            sx={{
              height: { xs: 161, sm: 155, md: 205 },
              objectFit: "cover",
              borderRadius: "0px 0px 10px 10px",
            }}
            image={DownloadImageApi(url)} // Use the randomly selected image
            alt={title}
            // loading="lazy"
            onLoad={handleImageLoad}
            style={{ display: isImageLoaded ? "block" : "none" }}
          />
        </Box>
      </Link>
    </>
  );
};

export default ImageOfCard;
