import React, { useContext } from "react";
import { Box, IconButton, Paper } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { StayPageContext } from "../../StayPage";


const getPaperStyle = {
  width: 36,
  height: 36,
  borderRadius: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "auto",
};  

const SwiperImageOverlay = ({ onLike, isFavorite }) => {
    const stayPageContext = useContext(StayPageContext);

    const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: stayPageContext?.infoOfStay?.title || "",
              text: stayPageContext?.infoOfStay?.title || "",
              url: window.location.href,
            });
          } catch (error) {
            console.error("خطا در اشتراک‌گذاری:", error);
          }
        } else {
          alert("مرورگر شما از اشتراک‌گذاری پشتیبانی نمی‌کند.");
        }
      };

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        left: 16,
        right: 16,
        display: "flex",
        justifyContent: "space-between",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <Paper sx={getPaperStyle} elevation={3}>
        <IconButton
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowForwardIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </Paper>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Paper sx={getPaperStyle} elevation={3}>
          <IconButton onClick={()=>{handleShare()}}>
            <ShareIcon sx={{ fontSize: 22 }} />
          </IconButton>
        </Paper>

        <Paper sx={getPaperStyle} elevation={3}>
          <IconButton onClick={onLike}>
            {isFavorite ? (
              <FavoriteIcon sx={{ fontSize: 22, color: "red" }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 22 }} />
            )}
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default SwiperImageOverlay;
