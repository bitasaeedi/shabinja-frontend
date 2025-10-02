import React, { useContext, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ShowImageHeader from "./ShowImageHeader";
import { MagPageContext } from "../MagazinePage";

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
      sx={{
        fontSize: "16px",
        color: disabled ? "#999" : "#000",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  </IconButton>
);

// const slides = [
//   "https://storage.jajiga.com/mag/2025/03/%D8%B3%D9%81%D8%B1-1200x500.jpg",
//   "https://storage.jajiga.com/mag/2025/03/%D8%A7%D9%86%D8%B2%D9%84%DB%8C-%D8%AF%D8%B1-%D8%B4%D8%A8-1200x500.jpg",
//   "https://storage.jajiga.com/mag/2025/03/%D8%B3%D9%81%D8%B1-1200x500.jpg",
// ];
const slides = [
  {
    src: "https://storage.jajiga.com/mag/2025/03/%D8%B3%D9%81%D8%B1-1200x500.jpg",
    title: "کوهسار مقصد ییلاقی محبوب نزدیک تهران",
    text: "قلعه رودخان قصه هزار ساله پناه گرفتن ایران و ایرانی در میان قلعه‌های سنگی از هجوم دشمن است.",
  },
  {
    src: "https://storage.jajiga.com/mag/2025/03/%D8%A7%D9%86%D8%B2%D9%84%DB%8C-%D8%AF%D8%B1-%D8%B4%D8%A8-1200x500.jpg",
    title: "کوهسار مقصد ییلاقی محبوب نزدیک تهران",
    text: "قلعه رودخان قصه هزار ساله پناه گرفتن ایران و ایرانی در میان قلعه‌های سنگی از هجوم دشمن است.",
  },
  {
    src: "https://storage.jajiga.com/mag/2025/03/%D8%B3%D9%81%D8%B1-1200x500.jpg",
    title: "کوهسار مقصد ییلاقی محبوب نزدیک تهران",
    text: "قلعه رودخان قصه هزار ساله پناه گرفتن ایران و ایرانی در میان قلعه‌های سنگی از هجوم دشمن است.",
  },
];

const HeaderMag = ({ isMobile }) => {

  const {selectedBlog} =useContext(MagPageContext);

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
    <div
      className=" position-relative"
      style={{ width: isMobile ? "100%" : "80%", margin: isMobile ? "65px  auto 0" : "6.5rem  auto 0" }}
    >
      <Swiper ref={swiperRef} onSlideChange={handleSlideChange}>
        {/* arrow buttons */}
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            bottom: "10%",
            right: "10%",
            zIndex: 1000,
          }}
        >
          <Box
            className="mx-1"
            sx={
              {
                // display: { xs: "none", md: "flex" },
                // bgcolor:'red',
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

        {selectedBlog.map((slide, index) => (
          <SwiperSlide key={index}>
            <ShowImageHeader index={index} slide={slide} isMobile={isMobile} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeaderMag;
