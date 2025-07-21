import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Skeleton,
} from "@mui/material";

import { DownloadImageApi } from "../../../api/DownloadImageApi";

const CardImage = ({ myData = {} }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    // console.log(myData, "myData");
  }, []);

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: { xs: 0, md: 3},
        mx: { xs: 0, md: 1},
        boxShadow: "none !important",
        overflow: "hidden",
        direction: "rtl",
        pb: 0,
        mb: 1,
        backgroundColor: "transparent",
      }}
      // className="border"
    >
      {/* Image with Skeleton loader */}
      {isImageLoaded != true && (
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{
            height: {
              xs: "100%",
            },
          }}
        />
      )}

      {myData?.file?.url && (
        <CardMedia
          component="img"
          sx={{
            height: {
              xs: "100%",
            },
            objectFit: "cover",
            borderRadius: { xs: 0, md: "0px 0px 10px 10px"},
          }}
          // `${baseUrl}${myData?.image}`
          image={DownloadImageApi(myData?.file?.url)} // Use the randomly selected image
          // alt={myData?.title}
          onLoad={handleImageLoad}
          loading="lazy"
          style={{ display: isImageLoaded ? "block" : "none" }}
        />
      )}
    </Card>
  );
};

export default CardImage;
