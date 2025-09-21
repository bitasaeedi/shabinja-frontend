import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import API_URL from "../../../config/apiConfig";
import ToRial from "../../ToRial/ToRial";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import ImageOfCard from "./ImageOfCard";
import SliderDetailsPage from "../../Sliders/SliderCards";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import FavoritesPopOver from "../../FavoritesPopOver/FavoritesPopOver";
import axios from "axios";
import BoltIcon from "@mui/icons-material/Bolt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const baseUrl = API_URL;

const HomeCard = ({ myData = {}, changeFavoriteList, showOffer = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [favColor, setFavColor] = useState("#ffffff96");

  useEffect(() => {
    setFavColor(myData.isFavorite ? "red" : "#ffffff96");
  }, [myData.isFavorite]);

  const formatNumber = (num = 0) => {
    return num % 1 === 0 ? num : num.toFixed(1);
  };

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

      if (typeof changeFavoriteList === "function") {
        changeFavoriteList();
      } else {
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
                  direction: "ltr", // Set to RTL for Farsi text
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
              className="px-2"
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
              {/* <LocationOnIcon
                color="action"
                sx={{
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                }}
              /> */}
            </Box>

            {/* Price */}
            {myData?.mainPrice?.charter ? (
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap={0.5}
                mt={1}
                className="mx-2"
                position="relative"
              >
                <Box
                  sx={{
                    //  position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: "#287DFA",
                    color: "#fff",
                    padding: "0rem .55rem",
                    borderRadius: "10px",
                    marginLeft: 0.5,
                    fontSize: { xs: "10px", sm: "12px", md: "12px" },
                  }}
                >
                  {myData?.mainPrice?.discountPercent}
                  <span style={{ fontSize: "9px" }}>%</span>
                </Box>

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
                    fontSize: { xs: "14px", sm: "14px", md: "19px" },
                  }}
                >
                  {ToRial(myData?.mainPrice?.mainPrice)}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "line-through",
                    color: "#000000bd",
                    // fontWeight: "bold",
                    fontSize: { xs: "12px", sm: "12px", md: "14px" },
                    marginRight: 0.5,
                  }}
                >
                  {ToRial(myData?.mainPrice?.firstPrice)}
                </Typography>
              </Box>
            ) : (
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
                  {ToRial(myData?.mainPrice?.mainPrice)}
                </Typography>
              </Box>
            )}

            {/* Rating */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
              sx={{ direction: "ltr", mt: 1 }}
              className="mx-2"
            >
              <Box display="flex" alignItems="center" gap=".2rem">
                {/* رزرو آنی */}
                {myData?.instantBooking && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: ".7rem",
                      border: "1px solid #dcdcdc",
                      padding: ".15rem .5rem",
                      borderRadius: "10px",
                      color: "#262626",
                    }}
                  >
                    <BoltIcon sx={{ color: "#287dfa", fontSize: ".95rem" }} />
                    <Box> رزرو آنی</Box>
                  </Box>
                )}

                {/* تخفیفات لحظه احری */}
                {myData?.charter && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: ".7rem",
                      border: "1px solid #dcdcdc",
                      padding: ".15rem .5rem",
                      borderRadius: "10px",
                      color: "#262626",
                      gap: ".25rem",
                    }}
                  >
                    <AccessTimeIcon
                      sx={{ color: "#e2bf03", fontSize: ".8rem", mb: ".1rem" }}
                    />
                    <Box>تخفیفات لحظه آخری</Box>
                  </Box>
                )}
              </Box>

              {/* rate */}
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
                      {/* {myData?.rate} */}
                      {formatNumber(myData?.rate)}
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
