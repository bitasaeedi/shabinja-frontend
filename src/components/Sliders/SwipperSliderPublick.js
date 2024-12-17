import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HomeCardSkeleton from "../Cards/HomeCards/HomeCardSkeleton";
import SkeletonFavoritCitiesCard from "../Cards/FavoritCitiesCard/SkeletonFavoritCitiesCard";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CardSkeletonComment from "../Cards/CardComment/CardSkeletonComment";

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

const SwipperSliderPublick = ({
  lists,
  children,
  title,
  loading,
  deafultSkeleton,
  slidesPerView = 3,
  breakpoints,
}) => {
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
        centeredSlides={false}
        // slidesPerView={slidesPerView}
        spaceBetween={10}
        loop={false}
        grabCursor={true}
        onSlideChange={handleSlideChange}
        breakpoints={
          breakpoints
            ? breakpoints
            : {
                0: {
                  slidesPerView: 1,
                },
                600: {
                  slidesPerView: 1,
                },
                720: {
                  slidesPerView: 2,
                },
                1300: {
                  slidesPerView: 3,
                },
              }
        }
        style={{
          paddingBottom: "5px",
          paddingLeft: deafultSkeleton === "favorit" ? "12%" : "17%",
        }}
      >
        {loading !== false
          ? [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <SwiperSlide
                key={index}
                className=" d-flex justify-content-start "
              >
                {deafultSkeleton === "favorit" ? (
                  <SkeletonFavoritCitiesCard />
                ) : deafultSkeleton === "comment" ? (
                  <CardSkeletonComment />
                ) : (
                  <HomeCardSkeleton />
                )}
              </SwiperSlide>
            ))
          : lists.map((item, index) => (
              <SwiperSlide
                key={index}
                className=" d-flex justify-content-start "
              >
                {React.Children.map(children, (child) =>
                  React.cloneElement(child, {
                    myData: item,
                  })
                )}
              </SwiperSlide>
            ))}
      </Swiper>
    </Box>
  );
};

export default SwipperSliderPublick;
