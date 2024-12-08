import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Skeleton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import API_URL from "../../../config/apiConfig";
import ToRial from "../../ToRial/ToRial";

const baseUrl = API_URL;
const HomeCard = ({ myData = {} }) => {
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

  // // Function to randomly select an image
  const randomImage = images[Math.floor(Math.random() * images.length)];

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <Box className="d-flex justify-content-center w-100 pb-0 mb-0">
      <Card
        sx={{
          width: { xs: 250, sm: 250, md: 250, lg: 320, xl: 360 },
          borderRadius: 3,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          direction: "rtl",
          pb: 0,
          mb: 1,
        }}
      >
        {/* Image with Skeleton loader */}
        {isImageLoaded != true && (
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{
              height: { xs: 160, sm: 160, md: 180 },
            }}
          />
        )}

        <CardMedia
          component="img"
          sx={{
            height: { xs: 160, sm: 160, md: 180 },
            objectFit: "cover",
          }}
          // `${baseUrl}${myData?.image}`
          image={`https://file.shabinja.com/api/v1/file/Download?path=${myData?.image}`} // Use the randomly selected image
          alt={myData?.title}
          onLoad={handleImageLoad}
          style={{ display: isImageLoaded ? "block" : "none" }}
        />

        {/* Card Content */}
        <CardContent>
          {/* Title */}
          <Box display="flex" justifyContent="end" alignItems="center" gap={1}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                overflow: "hidden",
                maxWidth: "100%",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                direction: "rtl", // Set to RTL for Farsi text
                textAlign: "right", // Align text properly for Farsi
              }}
            >
              {myData?.title}
            </Typography>
          </Box>

          {/* Location */}
          <Box display="flex" justifyContent="end" alignItems="start">
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "14px" },
                overflow: "hidden",
                maxWidth: "100%",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                direction: "ltr", // Set to RTL for Farsi text
                textAlign: "right", // Align text properly for Farsi
              }}
            >
              {myData?.address}
            </Typography>
            <LocationOnIcon
              color="action"
              sx={{
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
              }}
            />
          </Box>

          {/* Price */}
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={0.5}
            mt={1}
          >
            <Typography
              variant="body2"
              sx={{
                background:
                  "linear-gradient(90deg, #287DFA 0%, #287DFA 60%, #FF8C00 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "8px", sm: "10px", md: "10px" },
              }}
            >
              تومان / هر شب
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                background:
                  "linear-gradient(90deg, #287DFA 0%, #287DFA 60%, #FF8C00 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "12px", sm: "14px", md: "20px" },
              }}
            >
              {ToRial(myData?.minPrice)}
            </Typography>
          </Box>

          {/* Rating */}
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            gap={1}
            sx={{ direction: "ltr" }}
          >
            <Rating
              name="half-rating-read"
              defaultValue={myData?.rate || 1}
              precision={0.5}
              readOnly
              size="small"
              sx={{ color: "#FFD700" }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HomeCard;
