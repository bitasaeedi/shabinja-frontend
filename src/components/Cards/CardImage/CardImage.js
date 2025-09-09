import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  Skeleton,
} from "@mui/material";

import { DownloadImageApi } from "../../../api/DownloadImageApi";

const CardImage = ({ myData = {} }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: { xs: 0, md: 3 },
        mx: { xs: 0, md: 1 },
        boxShadow: "none !important",
        overflow: "hidden",
        direction: "rtl",
        pb: 0,
        mb: 1,
        backgroundColor: "transparent",
        position: "relative",
      }}
    >
      {/* Loader */}
      {!isImageLoaded && !imageError && (
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{ height: "100%", position: "absolute", inset: 0 }}
        />
      )}

      {/* Image */}
      {myData?.file?.url && !imageError && (
        <CardMedia
          component="img"
          sx={{
            height: "100%",
            objectFit: "cover",
            borderRadius: { xs: 0, md: "0px 0px 10px 10px" },
            opacity: isImageLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
          image={DownloadImageApi(myData?.file?.url)}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      )}

      {/* Fallback image if error */}
      {imageError && (
        <CardMedia
          component="div"
          sx={{ height: "100%", backgroundColor:"GrayText" }}
        />
      )}
    </Card>
  );
};

export default CardImage;
