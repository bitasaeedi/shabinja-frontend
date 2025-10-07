import { CardMedia, Skeleton, IconButton, Box, Tooltip } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DownloadImageApi } from "../../../api/DownloadImageApi";
import { InView } from "react-intersection-observer";
const ImageOfCard = ({ url, title, myData ,type="stay"}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <>
      <Link
        to={`/${type}/${myData?.id}`}
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
                height: { xs: 185, sm: 155, md: 205 },
                "@media (min-width:400px) and (max-width:500px)": {
                  height:210
                },
              }}
            />
          )}
          <CardMedia
            component="img"
            sx={{
              height: { xs: 185, sm: 155, md: 205 },
              objectFit: "cover",
              borderRadius: "0px 0px 10px 10px",
              "@media (min-width:400px) and (max-width:500px)": {
                height:210
              },
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
