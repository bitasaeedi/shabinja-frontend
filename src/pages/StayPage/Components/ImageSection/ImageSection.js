import React, { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { StayPageContext } from "../../StayPage";
import SliderDetailsPage from "../../../../components/Sliders/SliderDetailsPage";
import CardImage from "../../../../components/Cards/CardImage/CardImage";
import SwiperImageOverlay from "./SwiperImageOverlay";
import FavoritesPopOver from "../../../../components/FavoritesPopOver/FavoritesPopOver";
import axios from "axios";
import API_URL from "../../../../config/apiConfig";

const baseUrl = API_URL;

const ImageSection = () => {

  const [listImages, setListImages] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]);

  const [loadedImages, setLoadedImages] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState("");
  const stayPageContext = useContext(StayPageContext);

  useEffect(() => {
    setLoadedImages([]);
    const images = stayPageContext.infoOfStay?.hostImages || [];
    setListImages(images);
  }, [stayPageContext.infoOfStay]);

  useEffect(() => {
    setIsFavorite(stayPageContext?.infoOfStay?.isFavorite ? "red" : "black");
  }, [stayPageContext]);

  function handleIsFavoriteColor() {
    setIsFavorite("red");
  }

  const handleLikeClick = () => {
    if (isFavorite === "black") {
      setIsLiked(true);
    } else {
      deleteFromFavorite();
    }
  };

  const deleteFromFavorite = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${baseUrl}/UserFavoriteCategoryHostTour/Delete/${stayPageContext?.infoOfStay?.guid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsFavorite("black");
      console.log("d response", response.data);
      return response.data;
    } catch (error) {
      console.log("listError:", error?.response?.data);
      return error?.response?.data;
    }
  };

  const handleClose = () => {
    setIsLiked(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* Image Grid */}
      <Grid container spacing={2}>
        {/* Main Image Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: { xs: 280, sm: 300, md: "300px", lg: "380px" },
          }}
        >
          <SliderDetailsPage lists={[...listImages]} />
          <SwiperImageOverlay
            onLike={handleLikeClick}
            onShare={() => console.log("Shared!")}
            onNext={() => console.log("Next!")}
            isFavorite={isFavorite === "red"}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: { xs: 220, sm: 300, md: "300px", lg: "380px" },
            display: { xs: "none", md: "inherit" },
            p: 0, // حذف padding
          }}
        >
          <Grid
            container
            spacing={1} // حذف فاصله بین Grid itemها
            sx={{ height: "100%" }}
          >
            {listImages.slice(1, 5).map((item, index) => (
              <Grid
                item
                xs={6}
                key={index + 1}
                sx={{
                  height: "50%",
                  p: 0, // حذف padding داخلی
                }}
              >
                <CardImage myData={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      
      <FavoritesPopOver
        isLiked={isLiked}
        handleClose={handleClose}
        id={stayPageContext?.infoOfStay?.id}
        handleIsFavoriteColor={handleIsFavoriteColor}
      />
    </Box>
  );
};

export default ImageSection;
