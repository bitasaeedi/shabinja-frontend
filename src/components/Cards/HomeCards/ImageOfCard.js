import { CardMedia, Skeleton, IconButton, Box, Tooltip } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { DownloadImageApi } from "../../../api/DownloadImageApi";
import { InView } from "react-intersection-observer";
const ImageOfCard = ({ url, title }) => {
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
              height: { xs: 155, sm: 155, md: 195 },
            }}
          />
        )}
        <CardMedia
          component="img"
          sx={{
            height: { xs: 155, sm: 155, md: 195 },
            objectFit: "cover",
            borderRadius: "0px 0px 10px 10px",
          }}
          image={DownloadImageApi(url)} // Use the randomly selected image
          alt={title}
          // loading="lazy"
          onLoad={handleImageLoad}
          style={{ display: isImageLoaded ? "block" : "none" }}
        />
        <Tooltip title={isLiked ? "حذف از پسندها" : "افزدن به پسندها"}>
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: isLiked ? "red" : "white",
            }}
            onClick={handleLikeClick}
          >
            {isLiked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};

export default ImageOfCard;
