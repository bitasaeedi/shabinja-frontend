import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ShowImageHeader from "./ShowImageHeader";

const NextArrow = ({ onClick, disabled }) => (
  <IconButton
    onClick={disabled ? null : onClick}
    sx={{
      backgroundColor: disabled ? "white" : "white",
      border: "1px solid #ccc",
      borderRadius: { xs: "5px", md: "10px" },
      "&:hover": {
        backgroundColor: disabled ? "white" : "white",
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
      backgroundColor: disabled ? "white" : "white",
      border: "1px solid #ccc",
      borderRadius: { xs: "5px", md: "10px" },
      "&:hover": {
        backgroundColor: disabled ? "white" : "white",
      },
    }}
    disabled={disabled}
  >
    <ArrowBackIosIcon
      sx={{ fontSize: "16px", color: disabled ? "#999" : "#000" }}
    />
  </IconButton>
);

const slides = [
  "https://storage.jajiga.com/mag/2025/03/%D8%B3%D9%81%D8%B1-1200x500.jpg",
  "https://storage.jajiga.com/mag/2025/03/%D8%A7%D9%86%D8%B2%D9%84%DB%8C-%D8%AF%D8%B1-%D8%B4%D8%A8-1200x500.jpg",
  "https://storage.jajiga.com/mag/2025/03/%D8%B3%D9%81%D8%B1-1200x500.jpg",
];

const HeaderMag = () => {
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

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      setIsPrevDisabled(swiper.isBeginning);
      setIsNextDisabled(swiper.isEnd);
    }
  };

  return (
    <div className=" position-relative">
      <Swiper ref={swiperRef} onSlideChange={handleSlideChange}>
        {/* arrow buttons */}
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            bottom: "10%",
            right: "10%",
            zIndex: 1000,
            //   bgcolor: "red",
          }}
        >
          <Box
            className="mx-1"
            sx={
              {
                // display: { xs: "none", md: "flex" },
              }
            }
          >
            <NextArrow onClick={handlePrevClick} disabled={isPrevDisabled} />
          </Box>
          <Box
            sx={
              {
                // display: { xs: "none", md: "flex" },
              }
            }
          >
            <PrevArrow onClick={handleNextClick} disabled={isNextDisabled} />
          </Box>
        </Box>

        {slides.map((src, index) => (
          <SwiperSlide key={index}>
          <ShowImageHeader index={index} image={src}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeaderMag;
