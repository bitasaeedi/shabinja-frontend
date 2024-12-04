import { Box, Container, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import CitySlider from "../../components/Sliders/CitySlider";
import MainSliderMobile from "./Components/MainSliderMobile";
import Section1 from "./Components/Section1";
const cities = [
  {
    name: "شیراز",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipOX8P8cYlmxyaEG-ZdvJKLPmho4z9Yr1KFZCaTa=w675-h390-n-k-no",
  },
  {
    name: "بندرعباس",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipMDW5rsAey9OQGvxAyzlacXCogtXfcRlkEmU0Ra=w540-h312-n-k-no",
  },
  {
    name: "رشت",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipPiezlLlkahFQ7I4Q4_TwAHHqvcHHs3IUbFBMZZ=w540-h312-n-k-no",
  },
  {
    name: "سلمان شهر",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipOwHSRSqdE3mNl1B-xt3JTFCJgnDz2CT26XGapl=w675-h390-n-k-no",
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
];

const Home = () => {
  return (
    <Box component="main" className=" w-100" sx={{ minHeight: "100vh" }}>
      <Box
        className=" "
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <Section1 />
      </Box>
      <Box
        className=" "
        sx={{
          display: { xs: "flex", md: "none" },
        }}
      >
        <MainSliderMobile />
      </Box>

      <Box className=" " sx={{ height: 2000, marginTop: { xs: 8, md: 12 } }}>
        <CitySlider cities={cities} />
      </Box>
    </Box>
  );
};

export default Home;
