import {
  Box,
  Container,
  Grid,
  TextField,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import FastSearchCard from "../../components/Cards/FastSearchCard";
import FavoritCitiesCard from "../../components/Cards/FavoritCitiesCard/FavoritCitiesCard";
import HomeCards from "../../components/Cards/HomeCards/HomeCards";
import ResponsiveCards from "../../components/Cards/ResponsiveCards";
import ResponsiveFeatures from "../../components/Cards/ResponsiveFeatures";
import MobileMainSlider from "../../components/Sliders/MobileMainSlider";
import ItemsFastSearch from "../../myDatas/ItemsFastSearch";
import Section1 from "./Components/Section1";
import { InView } from "react-intersection-observer";
import InViewComponents from "../../components/InViewComponents/InViewComponents";
import { FavoritDestinationApi, HostTourSearchApi } from "../../api/toureApis";
import SwipperSliderPublick from "../../components/Sliders/SwipperSliderPublick";
import FastSearchcomponentMobile from "./Components/FastSearchcomponentMobile/FastSearchcomponentMobile";
import CardComment from "../../components/Cards/CardComment/CardComment";
import Begust from "./Components/Begust/Begust";
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

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  // فراخوانی api برای دریافت اطلاهات
  const getListData = async (dataToFilter) => {
    const resultGetFavorit = await FavoritDestinationApi(dataToFilter);
    var list = resultGetFavorit?.data;
    // console.log(resultGetFavorit?.data, "FavoritDestinationApi list");
    return list;
  };

  const callApiForGetList = async (dataToFilter) => {
    const resultGetTours = await HostTourSearchApi(dataToFilter);
    var list = resultGetTours?.data?.items;
    // console.log(list, "resultGetTours list");
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
            return listFastes;
          }}
        >
          <FastSearchcomponentMobile title={"جستجو سریع"}>
            <FastSearchCard />
          </FastSearchcomponentMobile>
        </InViewComponents>
      </Box>

      {/* ================================================== */}
      <Box className="px-0 mx-0">
        {/* title={"مقاصد محبوب"} */}
        <Box className=" " sx={{ marginTop: { xs: 4, md: 12 } }}>
          <InViewComponents getListData={() => getListData({})}>
            <SwipperSliderPublick
              deafultSkeleton={"favorit"}
              title={"مقاصد محبوب"}
              // slidesPerView={7}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                330: {
                  slidesPerView: 2,
                },
                480: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
            >
              <FavoritCitiesCard />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>

        {/* اقامتگاه های ممتاز */}
        <Box className="" sx={{ marginTop: { xs: 4, md: 5 } }}>
          <InViewComponents
            getListData={() =>
              callApiForGetList({
                type: 1,
              })
            }
          >
            <SwipperSliderPublick
              // lists={cities}
              title={"اقامتگاه‌های ممتاز"}
            >
              <HomeCards />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>
        {/* اقامتگاه های اقتصادی */}
        <Box className=" " sx={{ marginTop: { xs: 4, md: 5 } }}>
          <InViewComponents getListData={() => callApiForGetList({})}>
            <SwipperSliderPublick
              // lists={cities}
              title={"اقامتگاه‌های اقتصادی"}
              slidesPerView={4}
            >
              <HomeCards />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>

        {/* تخفیفات لحظه اخری */}
        <Box
          className=" "
          sx={{
            // height: 2000,
            py: 4,
            marginTop: { xs: 4, md: 5 },
            background: "linear-gradient(180deg, #e0f7fa 0%, #b3e5fc 100%)", // Light blue gradient
          }}
        >
          <InViewComponents getListData={() => callApiForGetList({})}>
            <SwipperSliderPublick lists={cities} title={"تخفیفات لحظه آخری"}>
              <HomeCards />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>
        {/* کارتهای تبلیغاتی */}
        {/* <Box className=" " sx={{ marginTop: { xs: 2, md: 2 } }}>
          <InView triggerOnce>
            <ResponsiveFeatures />
          </InView>
        </Box> */}
        {/* اقامتگاه  های شمال */}
        <Box className=" " sx={{ marginTop: { xs: 4, md: 5 } }}>
          <InViewComponents getListData={() => callApiForGetList({})}>
            <SwipperSliderPublick lists={cities} title={"اقامتگاه‌های شمال"}>
              <HomeCards />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>
        {/* "اپارتمان‌های روزانه در تهران" */}
        <Box className=" " sx={{ marginTop: { xs: 4, md: 5 } }}>
          <InViewComponents getListData={() => callApiForGetList({})}>
            <SwipperSliderPublick
              lists={cities}
              title={"آپارتمان‌ روزانه در تهران"}
            >
              <HomeCards />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>

        {/* کارتهای تبلیغاتی */}
        <Box className=" " sx={{ marginTop: { xs: 2, md: 2 },  }}>
          <InView triggerOnce>
            <ResponsiveFeatures />
          </InView>
        </Box>
        {/* کارتهای تبلیغاتی */}
        {/* <Box
          className=" "
          sx={{ marginTop: { xs: 2, md: 1 }, mx: { xs: 2, md: 8 } }}
        >
          <InView>
            <ResponsiveCards />
          </InView>
        </Box> */}

        {/* اقامتگاه‌های جنوب */}
        <Box className=" " sx={{ marginTop: { xs: 2, md: 1 } }}>
          <InViewComponents getListData={() => callApiForGetList({})}>
            <SwipperSliderPublick lists={cities} title={" اقامتگاه‌های جنوب"}>
              <HomeCards />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>
        {/* رزرو‌های فوری */}
        <Box
          className=""
          sx={{
            py: 4,
            marginTop: { xs: 4, md: 5 },
            background: "linear-gradient(180deg, #FFF8E1 0%, #FFECB3 100%)", // Light yellow gradient
          }}
        >
          <InViewComponents getListData={() => callApiForGetList({})}>
            <SwipperSliderPublick lists={cities} title={" رزرو‌های فوری"}>
              <HomeCards />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>

        {/* === نظرات کاربران */}
        <Box className=" " sx={{ marginTop: { xs: 4, md: 5 } }}>
          <InViewComponents getListData={() => callApiForGetList({})}>
            <SwipperSliderPublick
              lists={cities}
              title={"نظرات کاربران"}
              deafultSkeleton={"comment"}
            >
              <CardComment />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>

        {/* اقامتگاه‌های بومگردی */}
        <Box className=" " sx={{ marginTop: { xs: 4, md: 5 } }}>
          <InViewComponents getListData={() => callApiForGetList({})}>
            <SwipperSliderPublick
              lists={cities}
              title={" اقامتگاه‌های بومگردی"}
            >
              <HomeCards />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>
        {/* ویلاهای اطراف تهران */}
        <Box className="mb-5 " sx={{ marginTop: { xs: 4, md: 5 } }}>
          <InViewComponents getListData={() => callApiForGetList({})}>
            <SwipperSliderPublick lists={cities} title={"ویلاهای اطراف تهران "}>
              <HomeCards />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>

        {/* میزبان شوید */}
        <Begust />
        {/* ========= */}
      </Box>
    </Box>
  );
};

export default Home;
