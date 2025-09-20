import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "./Sliders.css";
import axios from "axios";
import API_URL from "../../config/apiConfig";
import { DownloadImageApi } from "../../api/DownloadImageApi";
const baseUrl = API_URL;

const MobileMainSlider = ({ MySliderList = [] }) => {
  const [sliderList, setSliderList] = useState([]);

  const sliderRef = React.useRef(null);
const [autoplaySpeed, setAutoplaySpeed] = useState(3000);

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
    autoplaySpeed: autoplaySpeed,
    cssEase: "ease-in-out",
    afterChange: (index) => {
      const newTimer = sliderList[index]?.timer
        ? sliderList[index].timer * 1000
        : 3000; // اگر timer نبود، پیش‌فرض ۳ ثانیه
      setAutoplaySpeed(newTimer);
    },
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
            maxWidth: sliderList?.length * 17,
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

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`${baseUrl}/SliderHost`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       console.log(response?.data?.data, "sliderList response");
      const sliderUrls = response?.data?.data?.filter(item => item.order !== 1)?.sort((a, b) => a.order - b.order);
      const sliderImages = sliderUrls.map(item => ({
        src: DownloadImageApi(item.image?.url),
        timer: item.timer,
      }));
       console.log(sliderImages, "sliderImages");
      setSliderList(sliderImages);
    } catch (error) {
      console.log("show comments Error:", error?.response?.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="p-0 mt-1 mb-1"
      style={{ width: "100%", overflow: "hidden", position: "relative" }}
    >
      <Slider ref={sliderRef}  {...settings}>
        {sliderList.map((city, index) => (
          <Container key={index} className="p-0 m-0">
            <Box
              sx={{
                width: "100%",
                height: 270,
                paddingBottom: { xs: "60%", sm: "50%" },
                position: "relative",
                // borderRadius: "10px",
              }}
            >
              <img
                src={city?.src}
                alt={"slider"}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "270px",
                  //  borderRadius: "10px",
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
