import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import adsGif from "./summer-trip.gif";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import API_URL from "../../../config/apiConfig";
import { DownloadImageApi } from "../../../api/DownloadImageApi";
const baseUrl = API_URL;

export default function HeaderAds({ handleIsVisible, isVisible }) {
  const navigte = useNavigate();
  const [adsData, setAdsData] = useState([]);
  const location = useLocation();

  const fetchBanner = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(
        `${baseUrl}/MyAds`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = response?.data?.data?.find(item => item.order === 0);
      setAdsData(result?.image?.url);
      console.log("ads", response?.data?.data);
    } catch (error) {
      console.log("error", error);

      console.error("Error :", error?.response?.data || error.message);
      return error?.response?.data;
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: 1,
          height: "60px",
          cursor: "pointer",
        }}
        onClick={() => {
          navigte("/");
        }}
      >
        <Box
          component="img"
          src={DownloadImageApi(adsData)}
          alt="Landing animation"
          sx={{
            width: 1,
            height: 1,
            objectFit: "cover",
            position: "relative",
            zIndex: 1,
            pointerEvents: "none",
          }}
          loading="lazy"
        />

        {location.pathname === "/" && (
          <IconButton
            size="medium"
            aria-label="close ads"
            disableRipple
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleIsVisible(false);
            }}
            sx={{
              position: "absolute",
              top: 5.5,
              right: 5.5,
              bgcolor: "rgba(0, 0, 0, 0.4)",
              color: "#fff",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              zIndex: 10000,
              cursor: "pointer",
              width: 23,
              height: 23,
            }}
          >
            <CloseIcon sx={{ cursor: "pointer", fontSize: "15px" }} />
          </IconButton>
        )}
      </Box>
    </>
  );
}
