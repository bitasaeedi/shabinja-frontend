import React, { useEffect, useRef } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./Sliders.css";
import HomeCardSkeleton from "../Cards/HomeCards/HomeCardSkeleton";

const NextArrow = ({ onClick, disabled }) => (
  <IconButton
    onClick={disabled ? null : onClick}
    sx={{
      position: "absolute",
      top: -25,
      right: 10,
      transform: "translateY(-50%)",
      backgroundColor: disabled
        ? "rgba(200, 200, 200, 0.7)"
        : "rgba(255, 255, 255, 0.7)",
      border: "1px solid #ccc",
      borderRadius: { xs: "5px", md: "10px" },
      padding: { xs: "4px", md: "8px" },
      "&:hover": {
        backgroundColor: disabled
          ? "rgba(200, 200, 200, 0.7)"
          : "rgba(255, 255, 255, 1)",
      },
    }}
    disabled={disabled}
  >
    <ArrowBackIosIcon
      sx={{ fontSize: "16px", color: disabled ? "#999" : "#000" }}
    />
  </IconButton>
);

const PrevArrow = ({ onClick, disabled }) => (
  <IconButton
    onClick={disabled ? null : onClick}
    sx={{
      position: "absolute",
      top: -25,
      right: "50px",
      transform: "translateY(-50%)",
      backgroundColor: disabled
        ? "rgba(200, 200, 200, 0.7)"
        : "rgba(255, 255, 255, 0.7)",
      border: "1px solid #ccc",
      borderRadius: { xs: "5px", md: "10px" },
      padding: { xs: "4px", md: "8px" },
      "&:hover": {
        backgroundColor: disabled
          ? "rgba(200, 200, 200, 0.7)"
          : "rgba(255, 255, 255, 1)",
      },
    }}
    disabled={disabled}
  >
    <ArrowForwardIosIcon
      sx={{ fontSize: "16px", color: disabled ? "#999" : "#000" }}
    />
  </IconButton>
);

const PublickSlider = ({
  lists,
  children,
  title,
  customSettings = {},
  loading,
  skeletonComponent,
  customStyle,
}) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      slideToEnd();
    }
  }, [lists?.length, customSettings, sliderRef.current]);

  const defaultSettings = {
    dots: false,
    infinite: lists?.length > 1 ? true : false,
    centerMode: true,
    speed: 300,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrows: true,
    draggable: false,
    swipe: true,
    // rtl: true,
    // centerPadding: "5px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const mergedSettings = {
    ...defaultSettings,
    ...customSettings,
  };

  const slideToEnd = () => {
    const totalSlides = lists.length;
    const slidesToShow =
      customSettings.slidesToShow || defaultSettings.slidesToShow;
    // const lastSlideIndex =
    //   totalSlides - slidesToShow >= 0 ? totalSlides - slidesToShow : 0;

    // Make sure the sliderRef exists and the total slides count is enough
    if (sliderRef.current && totalSlides > slidesToShow) {
      sliderRef.current.slickGoTo(totalSlides - slidesToShow, true); // Jump to the last visible index with no animation
    }
  };

  return (
    <div
      className={`${customStyle === false ? "" : " custom-style"}
           slider-container `}
    >
      <Box sx={{ position: "relative", px: 3 }}>
        <Typography
          variant="h5"
          sx={{ mb: 1, display: "inline-block", fontSize: { xs: 18, md: 28 } }}
        >
          {title}
        </Typography>
      </Box>

      <Slider ref={sliderRef} {...mergedSettings}>
        {loading !== false
          ? [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <div key={index}>
                {skeletonComponent ? skeletonComponent : <HomeCardSkeleton />}
              </div>
            ))
          : lists.map((city, index) => (
              <div key={index}>
                {React.Children.map(children, (child) =>
                  React.cloneElement(child, {
                    myData: city,
                  })
                )}
              </div>
            ))}
      </Slider>
    </div>
  );
};

export default PublickSlider;
