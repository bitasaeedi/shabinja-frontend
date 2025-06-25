import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Skeleton,
  Tooltip,
  IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import API_URL from "../../../config/apiConfig";
import ToRial from "../../ToRial/ToRial";
import { DownloadImageApi } from "../../../api/DownloadImageApi";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import ImageOfCard from "./ImageOfCard";
import SliderDetailsPage from "../../Sliders/SliderCards";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import FavoritesPopOver from "../../FavoritesPopOver/FavoritesPopOver";
const HomeCard = ({ myData = {} }) => {

  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleClose = () => {
    setIsLiked(null);
  };

  return (
    <Box className=" w-auto pb-0 mb-0">
      <Card
        sx={{
          width: { xs: 255, sm: 265, md: 300, lg: 310, xl: 330 },
          borderRadius: 3,
          // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          boxShadow: "none !important",
          overflow: "hidden",
          direction: "rtl",
          pb: 0,
          mb: 1,
          backgroundColor: "transparent",
          position: "relative",
        }}
        // className="border"
      >
        <SliderDetailsPage
          lists={myData?.images.map((item) => ({
            url: item,
            title: item,
          }))}
        >
          <ImageOfCard myData={myData} />
        </SliderDetailsPage>
        <Tooltip title={isLiked ? "حذف از پسندها" : "افزدن به پسندها"}>
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: isLiked ? "red" : "white",
              zIndex: 100,
            }}
            onClick={handleLikeClick}
          >
            {isLiked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>

        {/* Card Content */}
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
        </Link>
      </Card>
      <FavoritesPopOver isLiked={isLiked}  handleClose={handleClose} popWidth={400} vertical={"top"}/>
    </Box>
  );
};

export default HomeCard;
