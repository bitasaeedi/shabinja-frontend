import { Box, Container, Grid, Typography } from "@mui/material";
import React, { createContext, useContext, useEffect } from "react";
import ImageSection from "./Components/ImageSection/ImageSection";
import { useParams } from "react-router-dom";
import ScrollableTabs from "./Components/ScrollableTabs/ScrollableTabs";
import InViewComponents from "../../components/InViewComponents/InViewComponents";
import SwipperSliderPublick from "../../components/Sliders/SwipperSliderPublick";
import {
  HostTourSearchApi,
  HostTourSearchOneApi,
  PriceHostTourListApi,
} from "../../api/toureApis";
import HomeCards from "../../components/Cards/HomeCards/HomeCards";
import FormReserve from "./Components/FormReserve/FormReserve";
import { useState } from "react";
import MobileForm from "./Components/MobileForm/MobileForm";
import { Button } from "bootstrap";

import TitleStay from "./Components/TitleStay/TitleStay";
import Header from "../../layout/header/Header";
import Commentswiper from "../../components/Sliders/Commentswiper";
import { AppContext } from "../../App";
import moment from "moment-jalaali";
export const StayPageContext = createContext();
const StayPage = () => {
  const { staycode } = useParams();
  const [listDateSelected, setListDateSelected] = useState([]);
  const [infoOfStay, setInfoOfStay] = useState({});
  const [loading, setLoading] = useState(true);
  const [listPrices, setListPrices] = useState([]);
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.setShowfooter(true);
    appContext.setSettingHeader({
      dontShowMobileHeader: true,
      removeShadow: false,
    });
  }, []);

  useEffect(() => {
    handleSearchStayInfo();
    handleGetListPrice();
    setListDateSelected([]);
    window.scroll(0, 0);
  }, [staycode]);

  // دریافت لیست اسلایدر
  const callApiForGetList = async (dataToFilter) => {
    const resultGetTours = await HostTourSearchApi(dataToFilter);
    var list = resultGetTours?.data?.items;
    return list;
  };

  const handleChangeDate = (listDate) => {
    // if (listDate.length === 2) {
    const valueOfFilter = listDate[0]?.shamsiObj?.fullshamsi || undefined;
    const valueOfFilter2 = listDate[1]?.shamsiObj?.fullshamsi || undefined;
    setListDateSelected([valueOfFilter, valueOfFilter2]);
    // }
  };

  // دریافت اطلاعات اقامتگاه
  const handleSearchStayInfo = async () => {
    setLoading(true);
    setInfoOfStay({});
    const resultGetTour = await HostTourSearchOneApi(staycode);
    var item = resultGetTour?.data;
    console.log(item, "item handleSearchStayInfo");
    setInfoOfStay(item);
    setLoading(false);
    return item;
  };

  const handleGetListPrice = async () => {
    const now = moment();
    const numMonth = now.jMonth() + 1; // jMonth() returns 0-11, so +1 to get 1-12

    // Calculate months with overflow
    const months = [
      numMonth,
      numMonth + 1 > 12 ? numMonth + 1 - 12 : numMonth + 1,
      numMonth + 2 > 12 ? numMonth + 2 - 12 : numMonth + 2,
    ];

    const result = await PriceHostTourListApi(staycode, months[0]);
    const result2 = await PriceHostTourListApi(staycode, months[1]);
    const result3 = await PriceHostTourListApi(staycode, months[2]);
    var month1 = result?.data || [];
    var month2 = result2?.data || [];
    var month3 = result3?.data || [];
    const myList = [...month1, ...month2, ...month3];
    setListPrices(myList);
  };
  return (
    <StayPageContext.Provider
      value={{
        handleChangeDate: handleChangeDate,
        listDateSelected: listDateSelected,
        setListDateSelected: setListDateSelected,
        infoOfStay,
        loading,
        listPrices,
      }}
    >
      {/* <Header showMobileHeader={false} /> */}
      <Box
        sx={{
          width: { xs: "100%", md: "80%" }, // 100% for xs and sm, 80% for md and above
          margin: "0 auto", // Center the container
          padding: { xs: 2, md: 0 }, // Adjust padding for smaller screens
        }}
      >
        <Box
          sx={{
            minHeight: 600,
          }}
        >
          {/* Empty space as header spacer */}
          <Box
            sx={{
              height: { xs: 9, md: 100 }, // Adjust header space for xs and md screens
            }}
          ></Box>

          {/* Image Section */}
          <Box>
            <TitleStay />
            <ImageSection />
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "column",
                // justifyContent: "space-between",
                alignItems: "start",
                // marginBottom: 2,
                mt: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {infoOfStay?.title || ""}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ marginBottom: 2 }}
              >
                {`${infoOfStay?.accerss || ""}، ${
                  infoOfStay?.room || ""
                } اتاق، ${infoOfStay?.minCapacity || ""}تا${
                  infoOfStay?.maxCapacity || ""
                } نفر`}
              </Typography>
            </Box>
          </Box>

          {/* Content Section */}
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7} lg={8} sx={{}}>
                <ScrollableTabs />
              </Grid>

              <Grid
                item
                xs={12}
                md={5}
                lg={4}
                sx={{
                  position: "relative",
                  display: { xs: "none", md: "block" }, // Hide on xs screens
                  // zIndex: "9000 !important",
                }}
              >
                <Box
                  sx={{
                    position: "sticky",
                    top: 70, // Sticky offset from the top
                    height: 500,
                    width: "100%",
                    zIndex: "200 !important",
                    // backgroundColor: "#eeeeee",
                  }}
                >
                  <FormReserve />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* اقامتگاه های مشابه */}
      <Box className="px-0 mx-0" sx={{ marginTop: { xs: 4, md: 5 } }}>
        <InViewComponents getListData={() => callApiForGetList({})}>
          <SwipperSliderPublick
            // lists={cities}
            title={"اقامتگاه‌های مشابه"}
            slidesPerView={4}
          >
            <HomeCards />
          </SwipperSliderPublick>
        </InViewComponents>
      </Box>

      <Box
        sx={{
          position: "sticky",
          bottom: 65,
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black
          backdropFilter: "blur(5px)", // Blur effect
          color: "white",
          alignItems: "center",
          zIndex: "200 !important",
          borderRadius: "5px",
          display: { md: "none" },
          mx: 1,
          height: "70px",
        }}
      >
        <MobileForm />
      </Box>
    </StayPageContext.Provider>
  );
};

export default StayPage;
