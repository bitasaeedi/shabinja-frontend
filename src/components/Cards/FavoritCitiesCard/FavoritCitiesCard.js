import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { DownloadImageApi } from "../../../api/DownloadImageApi";

const FavoritCitiesCard = ({ myData = {} }) => {
  // List of image URLs
  // State to manage image loading
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const images = [
    "https://cdn.jabama.com/image/383x240/jabama-images/959393/da0cea0a-c9e5-4e37-aa9a-10a106133f86.jpg",
    "https://cdn.jabama.com/image/890x492/jabama-images/2056939/6bd7c426-8583-47cd-b067-25948bf780e0.png",
    "https://cdn.jabama.com/image/383x240/jabama-images/2056939/e6261ca3-ed5c-4f5e-8dff-6988c23d049a.jpg",
    "https://cdn.jabama.com/image/890x492/jabama-images/1737810/be45c5c1-084b-4945-aae1-8ed16ed90e78.jpg",
    "https://cdn.jabama.com/image/890x492/jabama-images/1494419/b27a2b5c-bc4a-4450-84a6-ded952b22ccb.jpeg",
    "https://cdn.jabama.com/image/383x240/jabama-images/1494419/ba770497-03c7-4f86-b7c1-9871da849437.jpeg",
  ];

  // Function to randomly select an image
  const randomImage = images[Math.floor(Math.random() * images.length)];

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
      <Card
        sx={{
          width: { xs: 80, sm: 130, md: 140, lg: 170 },
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
              height: { xs: 110, sm: 140, md: 200 },
              borderRadius: 3,
            }}
          />
        )}

        <CardMedia
          component="img"
          sx={{
            height: { xs: 110, sm: 150, md: 200 },
            objectFit: "cover",
            borderRadius: 3,
          }}
          image={DownloadImageApi(myData?.image?.url)} // Use the randomly selected image
          alt={myData?.title}
          onLoad={handleImageLoad}
          // loading="lazy"
          style={{ display: isImageLoaded ? "block" : "none" }}
        />

        {/* Card Content */}
        <CardContent>
          {/* Title */}
          <Box
            display="flex"
            justifyContent="flex-end"
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
                direction: "ltr", // Ensures proper direction for Farsi text
                textAlign: "left", // Aligns text to the right for RTL
              }}
            >
              {myData?.title}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FavoritCitiesCard;
