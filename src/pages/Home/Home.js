import { Box, Container, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import FastSearchCard from "../../components/Cards/FastSearchCard";
import FavoritCitiesCard from "../../components/Cards/FavoritCitiesCard";
import MobileMainSlider from "../../components/Sliders/MobileMainSlider";
import PublickSlider from "../../components/Sliders/PublickSlider";
import ItemsFastSearch from "../../myDatas/ItemsFastSearch";
import Section1 from "./Components/Section1";

const cities = [
  {
    name: "شیراز",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipOX8P8cYlmxyaEG-ZdvJKLPmho4z9Yr1KFZCaTa=w675-h390-n-k-no",
  },
  {
    name: "رشت",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipPiezlLlkahFQ7I4Q4_TwAHHqvcHHs3IUbFBMZZ=w540-h312-n-k-no",
  },
  {
    name: "رامسر",
    image:"https://lh5.googleusercontent.com/p/AF1QipMFT8Lbviuk0o3_T0ukMPKM6045kBDJ3MeNS-wY=w540-h312-n-k-no"
  },
  {
    name: "تهران",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipOqJkbx8LZD2cGwjFw638GPrneyoVnkjDpt8UKq=w675-h390-n-k-no",
  },
  {
    name: "کیش",
    image:
      "https://cdn.jabama.com/original/jabama-images/0/8069ff5b-1e61-4650-b4e7-04c849ab3d8f.jpg",
  },
  {
    name: "قم",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipNhVA4beiXrk2E8CtR3T59nQcgivXO-asaj9z8=w540-h312-n-k-no",
  },
  {
    name: "یزد",
    image:
      "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRKjC8GlPbbEFzE6JbY9Jv6gvqjXF9Rl_n-mSEU2Ou7WBbKcgnzAagRzZ_vSukLCqT8UvbAnfxqjfey_VwenlKntvG-I4PbmVOSB89Byg",
  },
  {
    name: "ماسال",
    image:
      "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTz_vlqNY1IeprK-JE69qGFTP3r2nJIoF3A9VhYhGqnwXTLui85KgbGcuMT7IVYiifW8rXJqBwe0EUOx1-wii9GSQC0mYQ9M2GWFJR0Fw",
  },
];

const Home = () => {
  const listFastes = ItemsFastSearch;
  return (
    <Box component="main" className=" w-100" sx={{ minHeight: "100vh" }}>
      {/* بخش سرچ اصلی صفحه اصلی دسکتاپ */}
      <Box
        className=" "
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <Section1 />
      </Box>

      {/* اسلایدر اصلی در حالت موبایل */}
      <Box
        className=" "
        sx={{
          display: { xs: "flex", md: "none" },
        }}
      >
        <MobileMainSlider MySliderList={cities.slice(0, 4)} />
      </Box>

      <Box
        className=" "
        sx={{
          display: { md: "none" },
        }}
      >
        <PublickSlider
          lists={listFastes}
          title={"جستجو سریع"}
          customSettings={{
            infinite: true,
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
                  slidesToShow: 5,
                  slidesToScroll: 1,
                  // rows: 2,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 1,
                  // rows: 2,
                },
              },
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  // rows: 2,
                },
              },
              {
                breakpoint: 360,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  // rows: 2,
                },
              },
            ],
          }}
        >
          <FastSearchCard />
        </PublickSlider>
      </Box>

      <Box className=" " sx={{ height: 2000, marginTop: { xs: 4, md: 12 } }}>
        {/* اسلایدر مقاصد محبوب */}
        <PublickSlider
          lists={cities}
          title={"مقاصد محبوب"}
          customSettings={{
            centerMode: true,
            infinite: true,
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
                  rows: 2,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  rows: 2,
                },
              },
            ],
          }}
        >
          <FavoritCitiesCard />
        </PublickSlider>
      </Box>
    </Box>
  );
};

export default Home;
