import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import adsGif from "./summer-trip.gif";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
export default function HeaderAds({handleIsVisible , isVisible}) {
  const navigte = useNavigate();


  if (!isVisible) return null;

  return (
    <>
      <Box
        sx={{ position: "relative", width: 1, height: "60px", cursor: "pointer" }}
        onClick={() => { navigte("/"); }}
      >
        <Box
          component="img"
          src={adsGif}
          alt="Landing animation"
          sx={{
            width: 1,
            height: 1,
            objectFit: "cover",
            position: "relative",
            zIndex: 1,
            pointerEvents: "none"
          }}
          loading="lazy"
        />
        
        <IconButton
          size="medium"
          aria-label="close ads"
          disableRipple
          onMouseDown={(e) => { e.stopPropagation(); }}
          onMouseUp={(e) => { e.stopPropagation(); }}
          onClick={(e) => { e.stopPropagation(); handleIsVisible(false); }}
          sx={{
            position: "absolute",
            top: 5.5,
            right: 5.5  ,
            bgcolor: "rgba(0, 0, 0, 0.4)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
            zIndex: 10000,
            cursor: "pointer",
            width: 23,
            height: 23
          }}
        >
          <CloseIcon  sx={{ cursor: "pointer" , fontSize: "15px" }} />
        </IconButton>
      </Box>
    </>
  );
}
