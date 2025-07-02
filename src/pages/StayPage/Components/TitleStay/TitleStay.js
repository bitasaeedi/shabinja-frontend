import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { StayPageContext } from "../../StayPage";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import FavoritesPopOver from "../../../../components/FavoritesPopOver/FavoritesPopOver";
import axios from "axios";
import API_URL from "../../../../config/apiConfig";
const baseUrl = API_URL;
const TitleStay = () => {
  const stayPageContext = useContext(StayPageContext);

  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(stayPageContext?.infoOfStay?.isFavorite);
  }, [stayPageContext]);

  const handleLikeClick = () => {
    if (!isFavorite) {
      setIsLiked(!isLiked);
    } else {
      deleteFromFavorite();
      isFavorite(false)
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
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {stayPageContext?.infoOfStay?.title || ""}
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<ShareIcon />}
            sx={{
              borderRadius: 2,
              backgroundColor: "white",
              color: "black",
              borderColor: "#ccc",
            }}
          >
            اشتراک‌گذاری
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={
              <FavoriteBorderIcon
                sx={{
                  color: stayPageContext?.infoOfStay?.isFavorite
                    ? "red"
                    : "white",
                }}
              />
            }
            sx={{
              borderRadius: 2,
              backgroundColor: "white",
              color: "black",
              borderColor: "#ccc",
            }}
            onClick={() => {
              handleLikeClick();
            }}
          >
            افزودن به مورد علاقه‌ها
          </Button>
        </Box>
      </Box>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ marginBottom: 2 }}
      >
        {/* {`${stayPageContext?.infoOfStay?.accerss || ""}، ${
          stayPageContext?.infoOfStay?.room || ""
        } اتاق، ${stayPageContext?.infoOfStay?.minCapacity || ""}تا${
          stayPageContext?.infoOfStay?.maxCapacity || ""
        } نفر`} */}
      </Typography>
      <FavoritesPopOver
        isLiked={isLiked}
        handleClose={handleClose}
        id={stayPageContext?.infoOfStay?.id}
      />
    </Box>
  );
};

export default TitleStay;
