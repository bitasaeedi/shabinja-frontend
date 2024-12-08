import { Box, Container, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import FastSearchCard from "../../components/Cards/FastSearchCard";
import FavoritCitiesCard from "../../components/Cards/FavoritCitiesCard";
import HomeCards from "../../components/Cards/HomeCards/HomeCards";
import ResponsiveCards from "../../components/Cards/ResponsiveCards";
import ResponsiveFeatures from "../../components/Cards/ResponsiveFeatures";
import MobileMainSlider from "../../components/Sliders/MobileMainSlider";
import PublickSlider from "../../components/Sliders/PublickSlider";
import ItemsFastSearch from "../../myDatas/ItemsFastSearch";
import Section1 from "./Components/Section1";
import { InView } from "react-intersection-observer";
import InViewComponents from "../../components/InViewComponents/InViewComponents";
import { HostTourSearchApi } from "../../api/toureApis";
const cities = [
  {
    name: "رشت",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipPiezlLlkahFQ7I4Q4_TwAHHqvcHHs3IUbFBMZZ=w540-h312-n-k-no",
  },

  {
    name: "رامسر",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipMFT8Lbviuk0o3_T0ukMPKM6045kBDJ3MeNS-wY=w540-h312-n-k-no",
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
    name: "مشهد",
    image:
      "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTz_vlqNY1IeprK-JE69qGFTP3r2nJIoF3A9VhYhGqnwXTLui85KgbGcuMT7IVYiifW8rXJqBwe0EUOx1-wii9GSQC0mYQ9M2GWFJR0Fw",
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
    name: "رشت",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipPiezlLlkahFQ7I4Q4_TwAHHqvcHHs3IUbFBMZZ=w540-h312-n-k-no",
  },
  {
    name: "رشت",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipPiezlLlkahFQ7I4Q4_TwAHHqvcHHs3IUbFBMZZ=w540-h312-n-k-no",
  },
];

const Home = () => {
  const listFastes = ItemsFastSearch;

  // فراخوانی api برای دریافت اطلاهات
  const getListData = async (dataToFilter) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cities);
      }, 1000); // 3000ms = 3 seconds
    });
  };

  const callApiForGetList = async () => {
    const resultGetTours = await HostTourSearchApi();
    var list = resultGetTours?.data?.items;
    console.log(list, "resultGetTours list");
    return list;
  };
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
      {/* جستجو سریع */}
      <Box
        className=" "
        sx={{
          display: { md: "none" },
        }}
      >
        <InViewComponents
          getListData={() => {
            return ItemsFastSearch;
          }}
        >
          <PublickSlider
            // lists={listFastes}
            title={"جستجو سریع"}
            customSettings={{
              // infinite: true,
              // arrows: false,
              slidesToShow: 5,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    // rows: 2,
                  },
                },
                {
                  breakpoint: 500,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    // rows: 2,
                  },
                },
                {
                  breakpoint: 360,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    // rows: 2,
                  },
                },
              ],
            }}
          >
            <FastSearchCard />
          </PublickSlider>
        </InViewComponents>
      </Box>
      {/* ================================================== */}
      {/* title={"مقاصد محبوب"} */}
      <Box className=" " sx={{ marginTop: { xs: 4, md: 12 } }}>
        <InViewComponents getListData={() => getListData({})}>
          <PublickSlider
            title={"مقاصد محبوب"}
            customSettings={{
              // centerMode: true,
              infinite: false,
              slidesToShow: 8,
              slidesToScroll: 1,
              initialSlide: 1,
              responsive: [
                {
                  breakpoint: 1490,
                  settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                    initialSlide: 1,
                  },
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    initialSlide: 1,
                  },
                },
                {
                  breakpoint: 1000,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
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
                {
                  breakpoint: 450,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 2,
                  },
                },
                {
                  breakpoint: 260,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 2,
                  },
                },
              ],
            }}
          >
            <FavoritCitiesCard />
          </PublickSlider>
        </InViewComponents>
      </Box>

      {/* اقامتگاه های ممتاز */}
      <Box className="" sx={{ marginTop: { xs: 4, md: 5 } }}>
        <InViewComponents getListData={() => callApiForGetList({})}>
          <PublickSlider
            // lists={cities}
            title={"اقامتگاه‌های ممتاز"}
            customSettings={{
              centerMode: false,
              centerPadding: "0px",
              infinite: false,
              slidesToShow: 4,
              slidesToScroll: 1,
              autoplay: true,
              speed: 600,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 700,
                  settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // rows: 2,
                  },
                },
              ],
            }}
          >
            <HomeCards />
          </PublickSlider>
        </InViewComponents>
      </Box>
      {/* اقامتگاه های اقتصادی */}
      <Box className=" " sx={{ marginTop: { xs: 4, md: 5 } }}>
        <InViewComponents getListData={() => callApiForGetList({})}>
          <PublickSlider
            // lists={cities}
            title={"اقامتگاه‌های اقتصادی"}
            customSettings={{
              centerMode: false,
              centerPadding: "0px",
              infinite: false,
              slidesToShow: 4,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 700,
                  settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // rows: 2,
                  },
                },
              ],
            }}
          >
            <HomeCards />
          </PublickSlider>
        </InViewComponents>
      </Box>

      {/* تخفیفات لحظه اخری */}
      <Box
        className=" "
        sx={{
          // height: 2000,
          py: 1,
          marginTop: { xs: 4, md: 5 },
          background: "linear-gradient(180deg, #e0f7fa 0%, #b3e5fc 100%)", // Light blue gradient
        }}
      >
        <InViewComponents getListData={() => callApiForGetList({})}>
          <PublickSlider
            lists={cities}
            title={"تخفیفات لحظه آخری"}
            customSettings={{
              centerMode: false,
              centerPadding: "0px",
              infinite: false,
              slidesToShow: 4,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 700,
                  settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // rows: 2,
                  },
                },
              ],
            }}
          >
            <HomeCards />
          </PublickSlider>
        </InViewComponents>
      </Box>
      {/* کارتهای تبلیغاتی */}
      <Box className=" " sx={{ marginTop: { xs: 4, md: 5 } }}>
        <InView>
          <ResponsiveCards />
        </InView>
      </Box>
      {/* اقامتگاه  های شمال */}
      <Box className=" " sx={{ marginTop: { xs: 4, md: 5 } }}>
        <InViewComponents getListData={() => callApiForGetList({})}>
          <PublickSlider
            lists={cities}
            title={"اقامتگاه‌های شمال"}
            customSettings={{
              centerMode: false,
              centerPadding: "0px",
              infinite: false,
              slidesToShow: 4,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 700,
                  settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // rows: 2,
                  },
                },
              ],
            }}
          >
            <HomeCards />
          </PublickSlider>
        </InViewComponents>
      </Box>
      {/* "اپارتمان‌های روزانه در تهران" */}
      <Box className=" " sx={{ marginTop: { xs: 4, md: 5 } }}>
        <InViewComponents getListData={() => callApiForGetList({})}>
          <PublickSlider
            lists={cities}
            title={"آپارتمان‌ روزانه در تهران"}
            customSettings={{
              centerMode: false,
              centerPadding: "0px",
              infinite: false,
              slidesToShow: 4,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 700,
                  settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // rows: 2,
                  },
                },
              ],
            }}
          >
            <HomeCards />
          </PublickSlider>
        </InViewComponents>
      </Box>
      {/* کارتهای تبلیغاتی */}
      <Box className=" " sx={{ marginTop: { xs: 4, md: 5 } }}>
        <InView triggerOnce>
          <ResponsiveFeatures />
        </InView>
      </Box>
      {/* اقامتگاه‌های جنوب */}
      <Box className=" " sx={{ marginTop: { xs: 4, md: 5 } }}>
        <InViewComponents getListData={() => callApiForGetList({})}>
          <PublickSlider
            lists={cities}
            title={" اقامتگاه‌های جنوب"}
            customSettings={{
              centerMode: false,
              centerPadding: "0px",
              infinite: false,
              slidesToShow: 4,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 700,
                  settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // rows: 2,
                  },
                },
              ],
            }}
          >
            <HomeCards />
          </PublickSlider>
        </InViewComponents>
      </Box>
      {/* رزرو‌های فوری */}
      <Box
        className=""
        sx={{
          py: 1,
          marginTop: { xs: 4, md: 5 },
          background: "linear-gradient(180deg, #FFF8E1 0%, #FFECB3 100%)", // Light yellow gradient
        }}
      >
        <InViewComponents getListData={() => callApiForGetList({})}>
          <PublickSlider
            lists={cities}
            title={" رزرو‌های فوری"}
            customSettings={{
              centerMode: false,
              centerPadding: "0px",
              infinite: false,
              slidesToShow: 4,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 700,
                  settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // rows: 2,
                  },
                },
              ],
            }}
          >
            <HomeCards />
          </PublickSlider>
        </InViewComponents>
      </Box>
      {/* اقامتگاه‌های بومگردی */}
      <Box className=" " sx={{ marginTop: { xs: 4, md: 5 } }}>
        <InViewComponents getListData={() => callApiForGetList({})}>
          <PublickSlider
            lists={cities}
            title={" اقامتگاه‌های بومگردی"}
            customSettings={{
              centerMode: false,
              centerPadding: "0px",
              infinite: false,
              slidesToShow: 4,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 700,
                  settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // rows: 2,
                  },
                },
              ],
            }}
          >
            <HomeCards />
          </PublickSlider>
        </InViewComponents>
      </Box>
      {/* ویلاهای اطراف تهران */}
      <Box className="mb-5 " sx={{ marginTop: { xs: 4, md: 5 } }}>
        <InViewComponents getListData={() => callApiForGetList({})}>
          <PublickSlider
            lists={cities}
            title={"ویلاهای اطراف تهران "}
            customSettings={{
              centerMode: false,
              centerPadding: "0px",
              infinite: false,
              slidesToShow: 4,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 700,
                  settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // rows: 2,
                  },
                },
              ],
            }}
          >
            <HomeCards />
          </PublickSlider>
        </InViewComponents>
      </Box>
    </Box>
  );
};

export default Home;
