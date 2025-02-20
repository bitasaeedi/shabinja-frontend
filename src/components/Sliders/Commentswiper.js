import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HomeCardSkeleton from "../Cards/HomeCards/HomeCardSkeleton";
import SkeletonFavoritCitiesCard from "../Cards/FavoritCitiesCard/SkeletonFavoritCitiesCard";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CardSkeletonComment from "../Cards/CardComment/CardSkeletonComment";
import CardComment from "../Cards/CardComment/CardComment";
import { useTheme } from "@mui/material/styles";

const NextArrow = ({ onClick, disabled }) => (
  <IconButton
    onClick={disabled ? null : onClick}
    sx={{
      // transform: "translateY(-50%)",
      backgroundColor: disabled ? "rgba(200, 200, 200, 0.7)" : "transparent", //rgba(255, 255, 255, 0.7)
      border: "1px solid #ccc",
      borderRadius: { xs: "5px", md: "10px" },
      // padding: { xs: "4px", md: "8px" },
      "&:hover": {
        backgroundColor: disabled ? "rgba(200, 200, 200, 0.7)" : "transparent",
      },
    }}
    disabled={disabled}
  >
    <ArrowForwardIosIcon
      sx={{ fontSize: "16px", color: disabled ? "#999" : "#000" }}
    />
  </IconButton>
);

const PrevArrow = ({ onClick, disabled }) => (
  <IconButton
    onClick={disabled ? null : onClick}
    sx={{
      // transform: "translateY(-50%)",
      backgroundColor: disabled ? "rgba(200, 200, 200, 0.7)" : "transparent",
      border: "1px solid #ccc",
      borderRadius: { xs: "5px", md: "10px" },
      // padding: { xs: "4px", md: "8px" },
      "&:hover": {
        backgroundColor: disabled ? "rgba(200, 200, 200, 0.7)" : "transparent",
      },
    }}
    disabled={disabled}
  >
    <ArrowBackIosIcon
      sx={{ fontSize: "16px", color: disabled ? "#999" : "#000" }}
    />
  </IconButton>
);

const Commentswiper = ({ lists, title, loading = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [centerIndex, setCenterIndex] = useState(0);
  const swiperRef = useRef(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleSlideChange = (swiper) => {
    setCenterIndex(swiper.realIndex);
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      setIsPrevDisabled(swiper.isBeginning); // Disable prev button if at the beginning
      setIsNextDisabled(swiper.isEnd); // Disable next button if at the end
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "90%", md: "80%" },
        margin: "auto",
        padding: "10px 0",
      }}
    >
      <Box
        sx={{ position: "relative", px: 0 }}
        className="d-flex justify-content-between align-items-start mb-3"
      >
        <Box sx={{ alignItems: "center" }}>
          <Typography
            variant="h5"
            sx={{
              // mb: 1,
              // display: "inline-block",
              fontSize: { xs: 18, md: 28 },
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Box className="mx-1">
            <NextArrow onClick={handlePrevClick} disabled={isPrevDisabled} />
          </Box>
          <Box>
            <PrevArrow onClick={handleNextClick} disabled={isNextDisabled} />
          </Box>
        </Box>
      </Box>

      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        // slidesPerView={slidesPerView}
        grabCursor={true}
        pagination={{
          clickable: true,
          //   el: ".swiper-pagination",
          //   bulletClass: "swiper-pagination-bullet",
          //   bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        spaceBetween={10}
        loop={true}
        onSlideChange={handleSlideChange}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 2,
          },
          720: {
            slidesPerView: 2,
          },
          800: {
            slidesPerView: 3,
          },
          1300: {
            slidesPerView: 5,
          },
        }}
        style={{
          paddingLeft: isMobile ? "90px" : "0",
        }}
      >
        {loading !== false
          ? [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <SwiperSlide
                key={index}
                className=" d-flex justify-content-center "
              >
                <CardSkeletonComment />
              </SwiperSlide>
            ))
          : lists.map((slide, index) => (
              <SwiperSlide
                key={index}
                className=" d-flex justify-content-center "
              >
                <Box
                  sx={{
                    height: 400,
                    //   backgroundColor: centerIndex === index ? "#007BFF" : "#007BFF",
                    //   backdropFilter: centerIndex === index ? "none" : "blur(6px)",
                    //   opacity: centerIndex === index ? 1 : 0.7,
                    //   transform: centerIndex === index ? "scale(1.2) translateY(-10px)" : "scale(1)",
                    //   transition: "all 0.3s ease-in-out",
                    //   fontSize: centerItem ? "20px" : "16px",
                  }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <CardComment
                    centerItem={centerIndex === index ? true : false}
                  />
                </Box>
              </SwiperSlide>
            ))}
      </Swiper>
    </Box>
  );
};

export default Commentswiper;
