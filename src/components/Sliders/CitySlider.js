import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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

const CitySlider = ({ cities }) => {
  const settings = {
    dots: false,
    infinite: true, // Ensures continuous looping
    speed: 200, // Very slow speed for continuous effect
    // autoplay: true,
    // autoplaySpeed: 0, // No delay between slides
    cssEase: "ease-in-out", // "linear", //ease  // Linear easing for constant speed
    slidesToShow: 4, // Adjust as needed
    slidesToScroll: 1, // Moves one slide at a time
    nextArrow: <PrevArrow />,
    prevArrow: <NextArrow />,
    arrows: true,
    rtl: true, // RTL alignment
    // pauseOnHover: true, // Ensure it doesn't stop on hover
    // draggable: true, // Enable dragging on desktop
    // swipe: true, // Enable swipe on mobile
    // touchMove: true, // Allow touch movement on mobile
    // touchThreshold: 10, // Sensitivity for touch movement
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Box sx={{ position: "relative", px: 3 }}>
        <Typography variant="h5" sx={{ mb: 1, display: "inline-block" }}>
          مقاصد محبوب
        </Typography>
        {/* Arrows positioned at the top beside the slider name */}
        {/* {settings.nextArrow}
        {settings.prevArrow} */}
      </Box>
      <Slider {...settings}>
        {cities.map((city, index) => (
          <div key={index} className="city-card px-3">
            <Box
              sx={{
                width: "100%",
                height: 0,
                paddingBottom: "75%" /* Increased height, Aspect ratio 4:3 */,
                position: "relative",
                "@media (max-width: 768px)": {
                  paddingBottom: "85%" /* Taller ratio for smaller screens */,
                },
              }}
            >
              <img
                src={city.image}
                alt={city.name}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: 5,
                  objectFit: "cover", // Ensure image covers the box fully
                }}
              />
            </Box>
            <Typography variant="h6" className="mt-2">
              {city.name}
            </Typography>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CitySlider;
