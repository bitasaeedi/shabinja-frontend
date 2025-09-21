import { Box, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState, useCallback } from "react";
import FavoritCitiesCard from "../../components/Cards/FavoritCitiesCard/FavoritCitiesCard";
import HomeCards from "../../components/Cards/HomeCards/HomeCards";
import ResponsiveFeatures from "../../components/Cards/ResponsiveFeatures";
import MobileMainSlider from "../../components/Sliders/MobileMainSlider";
import Section1 from "./Components/Section1";
import { InView } from "react-intersection-observer";
import InViewComponents from "../../components/InViewComponents/InViewComponents";
import {
  CategoryHostApi,
  FavoritDestinationApi,
  HostTourSearchApi,
} from "../../api/toureApis";
import SwipperSliderPublick from "../../components/Sliders/SwipperSliderPublick";
import Begust from "./Components/Begust/Begust";
import Commentswiper from "../../components/Sliders/Commentswiper";
import { AppContext } from "../../App";
import {
  GetCommentsAboutSiteApi,
  GetListTitleSlidersApi,
  handleCheckShowComments,
} from "../../api/PublicApis";
import SubSliderHeader from "./Components/SubSliderHeader";
import { useTheme } from "@emotion/react";
import AdsSection from "./Components/AdsSection/AdsSection";

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
  const appContext = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [listCategories, setListCategories] = useState([]);
  const [listTitleSliders, setListTitleSliders] = useState([]);
  const [selectedCity1, setSelectedCity1] = useState(); //selected city for inbooking
  const [selectedCity2, setSelectedCity2] = useState(); //selcted city for discount
  const [instantBookingKey, setInstantBookingKey] = useState(0); // Add this state for re-rendering
  const [lastMinuteKey, setLastMinuteKey] = useState(0); // Add this state for re-rendering last minute discounts
  const [showItems, setShowItems] = useState({});

  useEffect(() => {
    getListTitleSliders();
    getListFastSearch();
    checkShowItems();
    appContext.setShowfooter(true);
    window.scroll(0, 0);
    appContext.setSettingHeader({
      dontShowMobileHeader: false,
      removeShadow: false,
    });
  }, []);

  useEffect(() => {
    setInstantBookingKey((prev) => prev + 1);
  }, [selectedCity1]);

  useEffect(() => {
    setLastMinuteKey((prev) => prev + 1);
  }, [selectedCity2]);

  // مقاصد محبوب
  const getListData = async (dataToFilter) => {
    const resultGetFavorit = await FavoritDestinationApi(dataToFilter);
    var list = resultGetFavorit?.data;
    return list;
  };

  const getListFastSearch = async () => {
    const resultGetFavorit = await CategoryHostApi();
    var list = resultGetFavorit?.data || [];
    list = list.reverse();
    setListCategories(list);
    return list;
  };

  const callApiForGetList = async (dataToFilter) => {
   
    const resultGetTours = await HostTourSearchApi(dataToFilter);
    var list = resultGetTours?.data || [];
    // console.log("datafor fil", dataToFilter , "res" , list);
    return list;
  };

  // لست عنوان اسلایدر ها
  const getListTitleSliders = async () => {
    const result = await GetListTitleSlidersApi();
    let list = result?.data || [];
    list = list?.sort((a, b) => a.order - b.order);
    setListTitleSliders(list);
    return list;
  };

  const checkShowItems = async () => {
    const result = await handleCheckShowComments();
    setShowItems(result);
    return result;
  };

  const getCommentsAboutSite = async () => {
    const result = await GetCommentsAboutSiteApi();
    let list = result?.data;
    return list;
  };

  const setFilters = (url) => {
    let filters = {};
    if (url?.includes("?")) {
      const queryString = url.split("?")[1];
      const params = new URLSearchParams(queryString);

      params.forEach((value, key) => {
        filters[key] = isNaN(value) ? value : Number(value);
      });
    } else {
      return { title: url }; //like kurdestan
    }
    const filtersParams = {
      start: filters?.start,
      end: filters?.end,
      count: filters?.count,
      room: filters?.room,
      minprice: filters?.min,
      maxprice: filters?.max,
      skip: 0,
      take: 20,
      rolItemTour: filters?.rules?.split(",") || [],
      typeHost: filters?.typeHost?.split(",") || [],
      typeHostLoc: filters?.typeHostLoc?.split(",") || [],
      otherItemTour: filters?.features?.split(",") || [],
      rate: filters?.scores ? [filters?.scores] : [],
      province: filters?.province?.split(",") || [],
      city: filters?.cities?.split(",") || [],
      locations: [],
      // sort: filters?.sort,
    };
    // console.log("url : ", url, "pa", filtersParams);

    return filtersParams;
  };

  return (
    <Box component="main" className=" w-100" sx={{ minHeight: "100vh" }}>
      {/* <AdsPopover /> */}

      {/* بخش سرچ اصلی صفحه اصلی دسکتاپ */}
      <Box
        className=" "
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <Section1 listCategories={listCategories} />
        {/* fast search is in section1 too */}
      </Box>

      {/* اسلایدر اصلی در حالت موبایل */}
      <Box
        className=" "
        sx={{
          display: { xs: "flex", md: "none" },
          width: "100%",
        }}
      >
        <MobileMainSlider MySliderList={cities.slice(0, 4)} />
      </Box>

      {/* fast search in mobile */}
      {isMobile ? <SubSliderHeader listCategories={listCategories} /> : <></>}

      {/* ================================================== */}

      <Box className="px-0 mx-0">
        {/* title={"مقاصد محبوب"} */}
        <Box className=" " sx={{ marginTop: { xs: 2, md: 12 } }}>
          <InViewComponents getListData={() => getListData({})}>
            <SwipperSliderPublick
              deafultSkeleton={"favorit"}
              title={"مقاصد محبوب"}
              breakpoints={
                {
                  0: { slidesPerView: 2.3, spaceBetween: 8 },
                  340: { slidesPerView: 2.4, spaceBetween: 5 },
                  370: { slidesPerView: 2.6, spaceBetween: 5 },
                  400: { slidesPerView: 2.8, spaceBetween: 5 },
                  440: { slidesPerView: 3.2, spaceBetween: 5 },
                  520: { slidesPerView: 3.6, spaceBetween: 5 },
                  600: { slidesPerView: 3.9, spaceBetween: 10 },
                  700: { slidesPerView: 4.4, spaceBetween: 10 },
                  810: { slidesPerView: 5.1, spaceBetween: 10 },
                  900: { slidesPerView: 4.9, spaceBetween: 10 },
                  1024: { slidesPerView: 5.45, spaceBetween: 10 },
                  1300: { slidesPerView: 5.6, spaceBetween: 10 },
                  1450: { slidesPerView: 5.8, spaceBetween: 20 },
                }
              }
            >
              <FavoritCitiesCard />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>
        {/* ================================================== */}

        {/* اقامتگاه های ممتاز */}
        {listTitleSliders?.[0] && (
          <Box className="" sx={{ marginTop: { xs: 4, md: 5 } }}>
            <InViewComponents
              key={listTitleSliders[0]?.urlTour}
              getListData={() =>
                callApiForGetList(setFilters(listTitleSliders[0]?.urlTour))
              }
              stayList
            >
              <SwipperSliderPublick
                lists={cities}
                title={listTitleSliders[0]?.title}
                linkToSeeMore={`/search/${listTitleSliders[0]?.urlTour}`}
              >
                <HomeCards />
              </SwipperSliderPublick>
            </InViewComponents>
          </Box>
        )}

        {/* اقامتگاه های اقتصادی */}
        {listTitleSliders?.[1] && (
          <Box className="" sx={{ marginTop: { xs: 4, md: 5 } }}>
            <InViewComponents
              key={listTitleSliders[1]?.urlTour}
              getListData={() =>
                callApiForGetList(setFilters(listTitleSliders[1]?.urlTour))
              }
              stayList
            >
              <SwipperSliderPublick
                lists={cities}
                title={listTitleSliders[1]?.title}
                linkToSeeMore={`/search/${listTitleSliders[1]?.urlTour}`}
              >
                <HomeCards />
              </SwipperSliderPublick>
            </InViewComponents>
          </Box>
        )}

        {/* رزرو فوری */}
        <Box
          className=" "
          sx={{
            // height: 2000,
            //  py: { xs: 0, md: 2 },
            marginBottom: { xs: 5, md: 3 },
            marginTop: { xs: 3, md: 5 },
            background: "linear-gradient(180deg, #e0f7fa 0%, #b3e5fc 100%)", // Light blue gradient
          }}
        >
          <InViewComponents
            key={instantBookingKey}
            getListData={() =>
              callApiForGetList({
                InstantBooking: true,
                province: [selectedCity1],
              })
            }
            stayList
          >
            <SwipperSliderPublick
              showTimer={true}
              lists={cities}
              title={"رزرو آنی"}
              linkToSeeMore={`/search/all?justGuarantees=true`}
              handleChangeProvince={(value) => {
                setSelectedCity1(value);
              }}
              selectedCity={selectedCity1 || "تمامی شهرها"}
            >
              <HomeCards />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>

        {/* غرب */}
        {listTitleSliders?.[2] && (
          <InViewComponents
            key={listTitleSliders[2]?.urlTour}
            getListData={() =>
              callApiForGetList(setFilters(listTitleSliders[2]?.urlTour))
            }
            stayList
          >
            <SwipperSliderPublick
              lists={cities}
              title={listTitleSliders[2]?.title}
              linkToSeeMore={`/search/${listTitleSliders[2]?.urlTour}`}
              // showTimer={true}
            >
              <HomeCards />
            </SwipperSliderPublick>
          </InViewComponents>
        )}

        {listTitleSliders?.[3] && (
          <Box className="" sx={{ marginTop: { xs: 4, md: 5 } }}>
            <InViewComponents
              key={listTitleSliders[3]?.urlTour}
              getListData={() =>
                callApiForGetList(setFilters(listTitleSliders[3]?.urlTour))
              }
              stayList
            >
              <SwipperSliderPublick
                lists={cities}
                title={listTitleSliders[3]?.title}
                linkToSeeMore={`/search/${listTitleSliders[3]?.urlTour}`}
              >
                <HomeCards />
              </SwipperSliderPublick>
            </InViewComponents>
          </Box>
        )}

        {/* تخفیفات لحظه اخری */}
        <Box
          className=""
          sx={{
            // py: { xs: 0, md: 2 },
            marginBottom: { xs: 5, md: 3 },
            marginTop: { xs: 3, md: 5 },
            background: "linear-gradient(180deg, #FFF8E1 0%, #FFECB3 100%)", // Light yellow gradient
          }}
        >
          <InViewComponents
            key={lastMinuteKey}
            getListData={() =>
              callApiForGetList({
                LastMinuteDiscounts: true,
                province: [selectedCity2],
                IsOrderDiscountPercent:true
              })
            }
            stayList
          >
            <SwipperSliderPublick
              showTimer={true}
              lists={cities}
              title={"تخفیفات لحظه اخری"}
              linkToSeeMore={`/search/all?lastMinuteDiscounts=true`}
              handleChangeProvince={(value) => {
                setSelectedCity2(value);
              }}
              selectedCity={selectedCity2 || "تمامی شهرها"}
            >
              <HomeCards showOffer={true}/>
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>

        {/* "اپارتمان‌های روزانه در تهران" */}

        {listTitleSliders?.[4] && (
          <Box className=" " sx={{ marginTop: { xs: 4, md: 5 } }}>
            <InViewComponents
              key={listTitleSliders[4]?.urlTour}
              getListData={() =>
                callApiForGetList(setFilters(listTitleSliders[4]?.urlTour))
              }
              stayList
            >
              <SwipperSliderPublick
                lists={cities}
                title={listTitleSliders[4]?.title}
                linkToSeeMore={`/search/${listTitleSliders[4]?.urlTour}`}
              >
                <HomeCards />
              </SwipperSliderPublick>
            </InViewComponents>
          </Box>
        )}

        {/* کارتهای تبلیغاتی */}
        <Box className=" " sx={{ marginTop: { xs: 0, md: 2 } }}>
          <InView triggerOnce>
            <ResponsiveFeatures />
          </InView>
        </Box>

        {/* تبلیغات */}
        {showItems?.myAdsState && (
          <Box sx={{ marginTop: { xs: 0, md: 2 } }}>
            <AdsSection />
          </Box>
        )}

        {/* === نظرات کاربران */}
        {showItems?.commentsTourUserState ? (
          <Box className=" " sx={{ marginTop: { xs: 4, md: 5 } }}>
            <InViewComponents
              getListData={
                () => getCommentsAboutSite()
                // [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13]
              }
            >
              <Commentswiper
                title={"نظرات کاربران"}
                deafultSkeleton={"comment"}
              />
            </InViewComponents>
          </Box>
        ) : (
          ""
        )}

        {/* میزبان شوید */}
        <Begust />
        {/* ========= */}
      </Box>
    </Box>
  );
};

export default Home;
