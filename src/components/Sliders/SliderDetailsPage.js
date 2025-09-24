import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Keyboard, Autoplay, Pagination, Navigation } from "swiper/modules";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import CardImage from "../Cards/CardImage/CardImage";

const NextArrow = ({ onClick, disabled }) => (
  <IconButton
    onClick={disabled ? null : onClick}
    sx={{
      position: "absolute",
      top: "55%",
      right: "15px",
      transform: "translateY(-50%)",
      zIndex: 10,
      backgroundColor: disabled
        ? "rgba(200, 200, 200, 0.7)"
        : "rgba(250, 250, 250, 0.7)",
      "&:hover": {
        backgroundColor: "#ddd",
      },
    }}
    disabled={disabled}
  >
    <ArrowBackIosIcon
      sx={{
        fontSize: { xs: "16px", md: "20px" },
        color: disabled ? "#999" : "#000",
        position:"relative",
        right:4
      }}
    />
  </IconButton>
);

const PrevArrow = ({ onClick, disabled }) => (
  <IconButton
    onClick={disabled ? null : onClick}
    sx={{
      position: "absolute",
      top: "55%",
      left: "15px",
      transform: "translateY(-50%)",
      zIndex: 10,
      backgroundColor: disabled
        ? "rgba(200, 200, 200, 0.7)"
        : "rgba(250, 250, 250, 0.7)",
      "&:hover": {
        backgroundColor: "#ddd",
      },
    }}
    disabled={disabled}
  >
    <ArrowForwardIosIcon
      sx={{
        fontSize: { xs: "16px", md: "20px" },
        color: disabled ? "#999" : "#000",
      }}
    />
  </IconButton>
);

const SliderDetailsPage = ({ lists }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const swiperRef = useRef(null);

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

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      {!isMobile && <NextArrow onClick={handleNextClick} disabled={false} />}
      {!isMobile && <PrevArrow onClick={handlePrevClick} disabled={false} />}
      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        slidesPerView={1}
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        Keyboard={{
          enabled: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation, Keyboard]}
        spaceBetween={0}
        loop={true}
        style={{
          height: "100%",
        }}
      >
        {!(lists?.length > 0)
          ? [1].map((slide, index) => (
              <SwiperSlide
                key={index}
                className="d-flex justify-content-center"
                style={{ height: "100%" }}
              >
                <CardImage myData={{}} />
              </SwiperSlide>
            ))
          : lists.map((slide, index) => (
              <SwiperSlide
                key={index}
                className="d-flex justify-content-center"
                style={{ height: "100%" }}
              >
                <CardImage myData={slide} />
              </SwiperSlide>
            ))}
      </Swiper>
    </Box>
  );
};

export default SliderDetailsPage;
