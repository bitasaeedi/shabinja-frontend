import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import gif from "./k044xd4s.gif";
import axios from "axios";
import API_URL from "../../../../config/apiConfig";
import { DownloadImageApi } from "../../../../api/DownloadImageApi";
import { useNavigate } from "react-router-dom";
const baseUrl = API_URL;

export default function AdsSection() {
  const [bannerData, setBannerData] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

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
      const result = response?.data?.data?.filter((item) => item.order !== 0);
      console.log("my resule", result);

      setBannerData(result);
    } catch (error) {
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
          width: "75%",
          margin: { xs: "3rem auto", md: "2rem auto" },
        }}
      >
        {/* close button */}
        <IconButton
          size="small"
          aria-label="close ads section"
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          sx={{
            position: "absolute",
            top: -15,
            right: { xs: "-25px", md: 0 },
            bgcolor: "rgba(0,0,0,0.4)",
            color: "#fff",
            zIndex: 1000,
            cursor: "pointer",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* desctop */}
        <Box
          sx={{
            width: "100%",
            margin: "0 auto",
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            gap: 0.5,
          }}
        >
          {bannerData?.map((item, index) => (
            <Box
              key={index}
              component="img"
              width="330px"
              height="150px"
              className="rounded border shadow"
              src={DownloadImageApi(item?.image?.url)}
              onClick={() => {
                window.location.href=item?.myAdsUrl
              }}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </Box>

        {/*  mobile */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            width: "100%",
            p: 1,
          }}
        >
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={1.2}
          >
            {bannerData?.map((item, index) => (
              <Box
                key={index}
                component="img"
                width="330px"
                height="150px"
                className="rounded border shadow"
                src={DownloadImageApi(item?.image?.url)}
                onClick={() => {
                  
                  window.location.href=item?.myAdsUrl
                }}
                sx={{ cursor: "pointer" }}
              />
            ))}
          </Swiper>
        </Box>
      </Box>
    </>
  );
}
