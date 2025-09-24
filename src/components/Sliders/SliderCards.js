import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import {
  Keyboard,
  Autoplay,
  Pagination,
  Navigation,
  Lazy,
} from "swiper/modules";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import CardImage from "../Cards/CardImage/CardImage";

const NextArrow = ({ onClick, disabled, children }) => (
  <IconButton
    onClick={disabled ? null : onClick}
    sx={{
      position: "absolute",
      top: "55%",
      right: "10px",
      transform: "translateY(-50%)",
      zIndex: 10,
      backgroundColor: disabled
        ? "rgba(200, 200, 200, 0.3)"
        : "rgba(250, 250, 250, 0.4)",
      "&:hover": {
        backgroundColor: "rgba(250, 250, 250, 0.7)",
      },
    }}
    disabled={disabled}
  >
    <ArrowBackIosIcon
      sx={{
        fontSize: { xs: "16px", md: "16px" },
        color: disabled ? "#999" : "rgba(0, 0, 0, 0.6)",
        position:"relative",
        right:3
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
      left: "10px",
      transform: "translateY(-50%)",
      zIndex: 10,
      backgroundColor: disabled
        ? "rgba(200, 200, 200, 0.3)"
        : "rgba(250, 250, 250, 0.4)",
      "&:hover": {
        backgroundColor: "rgba(250, 250, 250, 0.7)",
      },
    }}
    disabled={disabled}
  >
    <ArrowForwardIosIcon
      sx={{
        fontSize: { xs: "16px", md: "16x" },
        color: disabled ? "#999" : "rgba(0, 0, 0, 0.6)",
      }}
    />
  </IconButton>
);

const SliderDetailsPage = ({ lists, children}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const swiperRef = useRef(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      setIsPrevDisabled(swiper.isBeginning); // Disable prev button if at the beginning
      setIsNextDisabled(swiper.isEnd); // Disable next button if at the end
    }
  };

  return (
    <Box
      sx={{ position: "relative", width: "100%", height: "100%" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(isHovered || isMobile) && (
        <>
          <NextArrow onClick={handleNextClick} disabled={isNextDisabled} />
          <PrevArrow onClick={handlePrevClick} disabled={isPrevDisabled} />
        </>
      )}    
      <Swiper
        ref={swiperRef}
        onSlideChange={handleSlideChange}
        centeredSlides={true}
        slidesPerView={1}
        grabCursor={true}
        lazy={true}
        // autoplay={{
        //   delay: 4000,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        Keyboard={{
          enabled: true,
        }}
        // navigation={true}
        modules={[Pagination, Navigation, Keyboard]} //Autoplay
        spaceBetween={0}
        loop={false}
        // lazy={true}
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
                {React.cloneElement(children, {
                  url: slide?.url,
                  title: slide?.title,
                })}
              </SwiperSlide>
            ))
          : lists.map((slide, index) => (
              <SwiperSlide
                key={index}
                className="d-flex justify-content-center"
                style={{ height: "100%" }}
              >
                {React.cloneElement(children, {
                  url: slide?.url,
                  title: slide?.title,
                })}
              </SwiperSlide>
            ))}
      </Swiper>
    </Box>
  );
};

export default SliderDetailsPage;
