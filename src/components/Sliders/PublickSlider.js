import React, { useEffect, useRef, useState } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./Sliders.css";
import FavoritCitiesCard from "../Cards/FavoritCitiesCard";

const NextArrow = ({ onClick, disabled }) => (
  <IconButton
    onClick={disabled ? null : onClick}
    sx={{
      position: "absolute",
      top: -25,
      right: 10,
      transform: "translateY(-50%)",
      backgroundColor: disabled
        ? "rgba(200, 200, 200, 0.7)" // Disabled color
        : "rgba(255, 255, 255, 0.7)",
      border: "1px solid #ccc",
      borderRadius: { xs: "5px", md: "10px" },
      padding: { xs: "4px", md: "8px" },
      "&:hover": {
        backgroundColor: disabled
          ? "rgba(200, 200, 200, 0.7)" // Prevent hover effect when disabled
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
        ? "rgba(200, 200, 200, 0.7)" // Disabled color
        : "rgba(255, 255, 255, 0.7)",
      border: "1px solid #ccc",
      borderRadius: { xs: "5px", md: "10px" },
      padding: { xs: "4px", md: "8px" },
      "&:hover": {
        backgroundColor: disabled
          ? "rgba(200, 200, 200, 0.7)" // Prevent hover effect when disabled
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

const PublickSlider = ({ lists, children, title, customSettings = {} }) => {
  const sliderRef = useRef(null);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);

  const calculateInitialSlide = (listLength, slidesToShow) => {
    return Math.max(0, listLength - slidesToShow);
  };

  const onSliderUpdate = (current, total) => {
    setIsPrevDisabled(current === 0);
    setIsNextDisabled(current === total - 1);
  };

  const defaultSettings = {
    dots: false,
    infinite: false, // Ensures continuous looping
    speed: 300, //
    // lazyLoad: true,
    cssEase: "linear", // "linear", //ease  // Linear easing for constant speed
    slidesToShow: 8, // Adjust as needed
    slidesToScroll: 1, // Moves one slide at a time
    nextArrow: <PrevArrow disabled={isNextDisabled} />,
    prevArrow: <NextArrow disabled={isPrevDisabled} />,
    // beforeChange: (oldIndex, newIndex) => {
    //   const totalSlides = Math.ceil(lists.length / 8); // Update for your logic
    //   onSliderUpdate(newIndex, totalSlides);
    // },
    arrows: true,
    draggable: false, // Enable dragging on desktop
    swipe: true, // Enable swipe on mobile
    // rtl: true,
    initialSlide: 1,
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
          // rows: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          // rows: 2,
        },
      },
    ],
  };

  // Merge defaultSettings with customSettings
  const mergedSettings = {
    ...defaultSettings,
    ...customSettings,
  };

  // Dynamically set initialSlide for default and each breakpoint
  mergedSettings.initialSlide = calculateInitialSlide(
    lists.length,
    mergedSettings.slidesToShow
  );

  mergedSettings.responsive = mergedSettings.responsive.map((breakpoint) => ({
    ...breakpoint,
    settings: {
      ...breakpoint.settings,
      initialSlide: calculateInitialSlide(
        lists.length,
        breakpoint.settings.slidesToShow
      ),
    },
  }));

  return (
    <div className="slider-container">
      <Box sx={{ position: "relative", px: 3 }}>
        <Typography
          variant="h5"
          sx={{ mb: 1, display: "inline-block", fontSize: { xs: 18, md: 28 } }}
        >
          {title}
        </Typography>
      </Box>

      <Slider ref={sliderRef} {...mergedSettings}>
        {lists.map((city, index) => (
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
