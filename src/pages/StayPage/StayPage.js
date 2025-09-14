import { Box, Grid, Typography } from "@mui/material";
import React, { createContext, useContext, useEffect } from "react";
import ImageSection from "./Components/ImageSection/ImageSection";
import { useNavigate, useParams } from "react-router-dom";
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
import TitleStay from "./Components/TitleStay/TitleStay";
import { AppContext } from "../../App";
import moment from "moment-jalaali";
import StarIcon from "@mui/icons-material/Star";

export const StayPageContext = createContext();

const StayPage = () => {
  const { staycode } = useParams();
  const [listDateSelected, setListDateSelected] = useState([]);
  const [infoOfStay, setInfoOfStay] = useState({});
  const [loading, setLoading] = useState(true);
  const [listPrices, setListPrices] = useState([]);
  const [mobileInfo, setMobileInfo] = useState({});
  const appContext = useContext(AppContext);
  const navigte = useNavigate();

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
    if (resultGetTour?.issuccess) {
      var item = resultGetTour?.data;
      console.log(item, "item handleSearchStayInfo");
      setInfoOfStay(item);
      setLoading(false);
      return item;
    }else{
      navigte("/404")
    }
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

    var month1 = result?.data?.prices || [];
    var month2 = result2?.data?.prices || [];
    var month3 = result3?.data?.prices || [];

    const myList = [...month1, ...month2, ...month3];
    console.log(myList, "prices");
    setListPrices(myList);
  };

  const getMobileInfo = (info) => {
    setMobileInfo(info);
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
        getMobileInfo,
      }}
    >
      {/* <Header showMobileHeader={false} /> */}
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          margin: "0 auto",
          padding: 0,
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
              height: { xs: 0, md: 100 },
            }}
          ></Box>

          {/* Image Section */}
          <Box
            sx={{
              width: "100%",
            }}
          >
            <TitleStay />
            <ImageSection />

            {/* mobile info under slider */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "column",
                // justifyContent: "space-between",
                alignItems: "center",
                // marginBottom: 2,
                mt: 2,
                px: { xs: 2, md: 0 },
              }}
            >
              <Typography
                sx={{ width: "100%", textAlign: "center" }}
                variant="h6"
                fontWeight="bold"
              >
                {infoOfStay?.title || ""}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ marginBottom: 2 }}
              >
                <StarIcon sx={{ fontSize: 16, color: "#ffd700" }} />
                {mobileInfo?.rate / 20 || 0}
                <Typography
                  display="inline"
                  variant="body1"
                  color="text.secondary"
                  px={1}
                >
                  ({mobileInfo?.countcomment || 0} نظر ثبت شده)
                </Typography>
              </Typography>
            </Box>
          </Box>

          {/* Content Section */}
          <Box sx={{ mt: 2, px: { xs: 2, md: 0 } }}>
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
                  display: { xs: "none", md: "block" },
                  // zIndex: "9000 !important",
                }}
              >
                <Box
                  sx={{
                    position: "sticky",
                    top: 70,
                    height: 500,
                    width: "100%",
                    zIndex: "200 !important",
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
        <InViewComponents
          getListData={() =>
            callApiForGetList({
              typeHost: [infoOfStay?.typeHostDbTitle],
              city: [infoOfStay?.cityTitle],
            })
          }
          id={infoOfStay?.id}
        >
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
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(5px)",
          color: "white",
          alignItems: "center",
          zIndex: "100 !important",
          borderRadius: "5px",
          display: { md: "none" },
          mx: 1,
          height: "70px",
          marginBottom: "2rem",
        }}
      >
        <MobileForm staycode={staycode} />
      </Box>
    </StayPageContext.Provider>
  );
};

export default StayPage;
