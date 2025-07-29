import React, { useEffect, useState, useContext } from "react";
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
import axios from "axios";
import { HomeContext } from "../../../pages/Home/Home";
const baseUrl = API_URL;

const HomeCard = ({ myData = {}, changeFavoriteList }) => {
  const homeContext = useContext(HomeContext);
  const [isLiked, setIsLiked] = useState(false);
  const [favColor, setFavColor] = useState("#ffffff96");

  // Use global favorites state instead of local state
  const isInGlobalFavorites = homeContext?.isItemInGlobalFavorites(myData?.id);

  useEffect(() => {
    // Check both API response and global state
    const isFavorite = myData.isFavorite || isInGlobalFavorites;
    setFavColor(isFavorite ? "red" : "#ffffff96");
  }, [myData.isFavorite, isInGlobalFavorites, homeContext?.favoritesUpdateTrigger]);

  const deleteFromFavorite = async () => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("token", myData?.guid);
      
      const response = await axios.post(
        `${baseUrl}/UserFavoriteCategoryHostTour/Delete/${myData?.guid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Remove from global favorites
      homeContext?.removeFromGlobalFavorites(myData?.id);
      
      if (typeof changeFavoriteList === "function") {
        changeFavoriteList();
      }
      else{
        setFavColor("#ffffff96");
      }
      console.log("d response", response.data);

      return response.data;
    } catch (error) {
      console.log("listError:", error?.response);
      return error?.response?.data;
    }
  };

  const handleLikeClick = async () => {
    if (favColor === "red") {
      try {
        await deleteFromFavorite();
    
        if (typeof changeFavoriteList === "function") {
          changeFavoriteList();
          console.log("now");
        }
      } catch (error) {
        console.error("Error deleting from favorites:", error);
      }
    } else {
      setIsLiked(true);
    }
  };

  function changeFavColor() {
    setFavColor("red");
    // Add to global favorites
    homeContext?.addToGlobalFavorites(myData?.id);
  }

  const handleClose = () => {
    setIsLiked(null);
  };

  return (
    <Box className=" w-auto pb-0 mb-0">
      <Card
        sx={{
          width: { xs: 280, sm: 265, md: 300, lg: 310, xl: 330 },
          borderRadius: 3,
          // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          boxShadow: "none !important",
          overflow: "hidden",
          direction: "rtl",
          pb: 0,
          mb: 1,
          backgroundColor: "transparent",
          position: "relative",
          "@media (min-width:400px) and (max-width:460px)": {
            width: 320,
          },
          "@media (min-width:460px) and (max-width:520px)": {
            width: 330,
          },
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

        {/* <Tooltip 
        disablePortal
        sx={{zIndex:1}} title={isLiked ? "حذف از پسندها" : "افزدن به پسندها"}>*/}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: favColor,
            zIndex: 10,
          }}
          onClick={handleLikeClick}
        >
          {favColor ? <Favorite color="red" /> : <FavoriteBorder />}
        </IconButton>
        {/* </Tooltip> */}

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
                {myData?.rate ? (
                  <>
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
                  </>
                ) : (
                  ""
                )}

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontWeight: "bold",
                    // marginRight: 1,
                    fontSize: 12,
                  }}
                >
                  ({myData?.countRate || 0} نظر)
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

      <FavoritesPopOver
        isLiked={isLiked}
        handleClose={handleClose}
        id={myData.id}
        changeFavColor={changeFavColor}
      />
    </Box>
  );
};

export default HomeCard;
