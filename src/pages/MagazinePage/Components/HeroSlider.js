import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


const images = [
    "https://storage.jajiga.com/mag/2025/03/%D8%B3%D9%81%D8%B1-1200x500.jpg",
    "https://storage.jajiga.com/mag/2025/03/%D8%A7%D9%86%D8%B2%D9%84%DB%8C-%D8%AF%D8%B1-%D8%B4%D8%A8-1200x500.jpg",
    "https://storage.jajiga.com/mag/2025/03/%D8%B3%D9%81%D8%B1-1200x500.jpg",
  ];

const HeroSlider = () => {
  return (
    <Box sx={{ width: "100%", position: "relative" , maxHeight:"20vh" }}>
      <Swiper
        modules={[Navigation]}
        navigation
        loop
        spaceBetween={10}
        slidesPerView={1}
        style={{ width: "100%" ,height:"200px"}}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              src={src}
              alt={`Slide ${index + 1}`}
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "fill",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlider;
