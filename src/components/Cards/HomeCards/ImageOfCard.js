import { CardMedia, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DownloadImageApi } from "../../../api/DownloadImageApi";
import { InView } from "react-intersection-observer";
const ImageOfCard = ({ url, title }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  useEffect(() => {
    console.log(url, "url");
  }, []);

  return (
    <>
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
    </>
  );
};

export default ImageOfCard;
