import { Box } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";

export default function SwiperMag() {
  return (
    <>
      <Box
      sx={{
        mx:3,
        mt:2
      }}
      >
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={3}
        >
          <SwiperSlide>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "16 / 9", // نسبت ابعاد (مثلاً ویدیو یا بنر)
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={require("../../../assest/images/sidebar/0.webp")}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "16 / 9", // نسبت ابعاد (مثلاً ویدیو یا بنر)
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={require("../../../assest/images/sidebar/1.webp")}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "16 / 9", // نسبت ابعاد (مثلاً ویدیو یا بنر)
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={require("../../../assest/images/sidebar/2.webp")}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>
    </>
  );
}
