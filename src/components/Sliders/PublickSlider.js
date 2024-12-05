import React, { useEffect, useRef } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./Sliders.css";
import FavoritCitiesCard from "../Cards/FavoritCitiesCard";

const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: -25,
      right: 10,
      transform: "translateY(-50%)",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "8px", // Reduce padding for smaller button
      "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
    }}
  >
    <ArrowBackIosIcon sx={{ fontSize: "16px" }} /> {/* Smaller icon size */}
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: -25,
      right: "50px",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "8px", // Reduce padding for smaller button
      "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
    }}
  >
    <ArrowForwardIosIcon sx={{ fontSize: "16px" }} /> {/* Smaller icon size */}
  </IconButton>
);

const PublickSlider = ({ lists, children, title, customSettings = {} }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const sliderInstance = sliderRef.current;

    if (sliderInstance) {
      // Scroll to the last slide or first slide
      sliderInstance.slickGoTo(lists.length - 1); // For start
    }
  }, [lists]);

  const defaultSettings = {
    dots: false,
    infinite: false, // Ensures continuous looping
    speed: 300, //
    // lazyLoad: true,
    cssEase: "ease-in-out", // "linear", //ease  // Linear easing for constant speed
    slidesToShow: 8, // Adjust as needed
    slidesToScroll: 3, // Moves one slide at a time
    nextArrow: <PrevArrow />,
    prevArrow: <NextArrow />,
    arrows: true,
    // rtl: true, // RTL alignment
    centerMode: true,
    // initialSlide: 4, // Start at the last slide

    draggable: true, // Enable dragging on desktop
    swipe: true, // Enable swipe on mobile
    swipeToSlide: true,
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
  const mergedSettings = { ...defaultSettings, ...customSettings };

  return (
    <div className="slider-container">
      <Box sx={{ position: "relative", px: 3 }}>
        <Typography variant="h5" sx={{ mb: 1, display: "inline-block" }}>
          {title}
        </Typography>
      </Box>
      <Slider ref={sliderRef} {...mergedSettings}>
        {lists.map((city, index) =>
          React.Children.map(children, (child) =>
            React.cloneElement(child, { key: index, myData: city })
          )
        )}
      </Slider>
    </div>
  );
};

export default PublickSlider;
