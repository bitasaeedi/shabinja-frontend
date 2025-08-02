import React, { useEffect, useState } from "react";
import {
  Box,
  useMediaQuery,
  SwipeableDrawer,
  Popover,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";

import axios from "axios";
import API_URL from "../../config/apiConfig";
import FavoritesField from "./FavoritesField";
const baseUrl = API_URL;

export default function FavoritesPopOver({ isLiked, handleClose, id, changeFavColor }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  return isMobile ? (
    <SwipeableDrawer
      anchor="bottom"
      open={Boolean(isLiked)}
      onClose={handleClose}
      onOpen={() => {}} // Optional: Add logic if needed when opening
      PaperProps={{
        sx: {
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px 12px 0 0",
          backgroundColor: "#ffff",
          paddingBottom: ".5rem",
        },
      }}
    >
      {/* Fixed Header */}
      <Box
        sx={{
          padding: "21px 16px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f1f1f1",
            width: "50px",
            height: "8px",
            borderRadius: "20%",
          }}
        ></Box>
      </Box>
      <FavoritesField 
      handleClose={handleClose} 
      isLiked={isLiked} 
      changeFavColor={changeFavColor}
      stayId={id}
      />
    </SwipeableDrawer>
  ) : (
    <Popover
      open={Boolean(isLiked)}
      anchorEl={isLiked}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      PaperProps={{
        sx: {
          mt: 10,
          zIndex: 2000,
          padding: "10px 20px",
        },
      }}
    >
      <FavoritesField 
      handleClose={handleClose} 
      isLiked={isLiked} 
      myWidth stayId={id}
      changeFavColor={changeFavColor}
      />
    </Popover>
  );
}
