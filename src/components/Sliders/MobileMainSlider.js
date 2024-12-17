import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import Slider from "react-slick";

import "./Sliders.css";

const MobileMainSlider = ({ MySliderList = [] }) => {
  const settings = {
    dots: true,
    // infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    appendDots: (dots) => (
      <Box
        sx={{
          position: "absolute",
          bottom: "8px",
          right: "10px",
          display: "flex",
          // alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            p: 0,
            justifyContent: "start",
            m: 0,
            maxWidth: MySliderList.length * 17,
            overflowX: "hidden",
            whiteSpace: "nowrap",
            // backgroundColor: "red",
          }}
        >
          {dots}
        </Box>
      </Box>
    ),
    customPaging: (i) => (
      <Box
        sx={{
          width: "6px",
          height: "6px",
          backgroundColor: "white",
          borderRadius: "50%",
          // Reduce horizontal margin to 2px for closer dots
          transition: "all 0.3s ease-in-out",
          opacity: 1,
        }}
      />
    ),
  };

  return (
    <div
      className="slider-container p-0 mt-1"
      style={{ width: "100%", overflow: "hidden", position: "relative" }}
    >
      <Slider {...settings}>
        {MySliderList.map((city, index) => (
          <Container key={index} className="p-0 m-0">
            <Box
              sx={{
                width: "100%",
                height: 0,
                paddingBottom: { xs: "60%", sm: "50%" },
                position: "relative",
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
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Container>
        ))}
      </Slider>
    </div>
  );
};

export default MobileMainSlider;
