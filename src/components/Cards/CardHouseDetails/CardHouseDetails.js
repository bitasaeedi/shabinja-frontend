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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import API_URL from "../../../config/apiConfig";
import ToRial from "../../ToRial/ToRial";
import { DownloadImageApi } from "../../../api/DownloadImageApi";
import StarIcon from "@mui/icons-material/Star";

const CardHouseDetails = ({ myData = {} }) => {
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

  useEffect(() => {
    // console.log(myData, "myData");
  }, []);

  return (
    <Box className=" w-auto pb-0 mb-0">
      <Card
        sx={{
          width: { xs: 320, sm: 320, md: 290, lg: 290, xl: 335 },
          borderRadius: 3,
          // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
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
              height: { xs: 185, sm: 185, md: 185 },
            }}
          />
        )}

        <CardMedia
          component="img"
          sx={{
            height: { xs: 185, sm: 185, md: 185 },
            objectFit: "cover",
            borderRadius: "0px 0px 10px 10px",
          }}
          // `${baseUrl}${myData?.image}`
          image={myData?.image ? DownloadImageApi(myData?.image) : randomImage} // Use the randomly selected image
          alt={myData?.title}
          onLoad={handleImageLoad}
          // loading="lazy"
          style={{ display: isImageLoaded ? "block" : "none" }}
        />

        {/* Card Content */}
        <CardContent className=" px-0 py-2 my-">
          {/* Title */}
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="start"
            gap={1}
            className="px-2"
          >
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
          <Box
            display="flex"
            justifyContent="end"
            alignItems="start"
            className=" px-0"
          >
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                fontSize: { xs: "10px", sm: "11px", md: "12px" },
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
            className="mx-2"
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
            justifyContent="flex-end"
            alignItems="center"
            gap={1}
            sx={{ direction: "ltr" }}
            className="mx-2"
          >
            <Box display="flex" alignItems="center" sx={{ fontSize: 14 }}>
              <StarIcon
                sx={{
                  color: "#FFD700",
                  // fontSize: 20
                  fontSize: 14,
                }}
                className="mb-1 "
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  // marginRight: 1,
                  fontSize: 14,
                  // fontSize: 18,
                }}
                className="px-1"
              >
                {myData?.rate}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontWeight: "bold",
                  // marginRight: 1,
                  fontSize: 12,
                }}
              >
                ({myData?.countRate} نظر)
              </Typography>
            </Box>
            {/* <Rating
              name="half-rating-read"
              defaultValue={myData?.rate || 1}
              precision={0.5}
              readOnly
              size="small"
              sx={{ color: "#FFD700" }}
            /> */}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardHouseDetails;
