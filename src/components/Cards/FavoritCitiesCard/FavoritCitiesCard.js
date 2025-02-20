import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { DownloadImageApi } from "../../../api/DownloadImageApi";
import { Link } from "react-router-dom";

const FavoritCitiesCard = ({ myData = {} }) => {
  // List of image URLs
  // State to manage image loading
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Link
        to={`/search/${myData?.urlTour}`}
        style={{ textDecoration: "none", display: "block", width: "100%" }}
      >
        <Card
          sx={{
            // width: "auto",
            width: { xs: 118, sm: 130, md: 140, lg: 170 },
            // Remove border radius
            boxShadow: "none", // Remove shadow
            backgroundColor: "transparent", // Remove background color
            overflow: "hidden",
            // direction: "rtl",
            pb: 0,
          }}
          // className="px-1"
        >
          {/* Image with Skeleton loader */}
          {isImageLoaded != true && (
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{
                height: { xs: 130, sm: 140, md: 200 },
                borderRadius: 3,
              }}
            />
          )}

          <CardMedia
            component="img"
            sx={{
              height: { xs: 130, sm: 150, md: 200 },
              objectFit: "cover",
              borderRadius: 3,
            }}
            image={DownloadImageApi(myData?.image?.url)} // Use the randomly selected image
            alt={myData?.title}
            onLoad={handleImageLoad}
            // loading="lazy"
            style={{ display: isImageLoaded ? "block" : "none" }}
          />

          <CardContent>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontSize: { xs: "12px", sm: "16px", md: "18px" },
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                  textAlign: "center",
                }}
              >
                {myData?.title}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};

export default FavoritCitiesCard;
