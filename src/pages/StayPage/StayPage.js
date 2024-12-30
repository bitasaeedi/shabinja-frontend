import { Box, Container, Grid } from "@mui/material";
import React, { createContext, useEffect } from "react";
import ImageSection from "./Components/ImageSection/ImageSection";
import { useParams } from "react-router-dom";
import ScrollableTabs from "./Components/ScrollableTabs/ScrollableTabs";
import InViewComponents from "../../components/InViewComponents/InViewComponents";
import SwipperSliderPublick from "../../components/Sliders/SwipperSliderPublick";
import { HostTourSearchApi } from "../../api/toureApis";
import HomeCards from "../../components/Cards/HomeCards/HomeCards";
import FormReserve from "./Components/FormReserve/FormReserve";
import { useState } from "react";

export const StayPageContext = createContext();
const StayPage = () => {
  const { staycode } = useParams();
  const [listDateSelected, setListDateSelected] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);
    console.log(staycode, "staycode");
  }, [staycode]);

  // دریافت لیست اسلایدر
  const callApiForGetList = async (dataToFilter) => {
    const resultGetTours = await HostTourSearchApi(dataToFilter);
    var list = resultGetTours?.data?.items;
    return list;
  };

  const handleChangeDate = (listDate) => {
    // if (listDate.length === 2) {
    const valueOfFilter = listDate[0].shamsiObj?.fullshamsi || undefined;
    const valueOfFilter2 = listDate[1]?.shamsiObj?.fullshamsi || undefined;
    setListDateSelected([valueOfFilter, valueOfFilter2]);
    // }
  };
  return (
    <StayPageContext.Provider
      value={{
        handleChangeDate: handleChangeDate,
        listDateSelected: listDateSelected,
        setListDateSelected: setListDateSelected,
      }}
    >
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
              height: { xs: 9, md: 65 }, // Adjust header space for xs and md screens
            }}
          ></Box>

          {/* Image Section */}
          <Box>
            <ImageSection />
          </Box>

          {/* Content Section */}
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {/* Main Content Section */}
              <Grid
                item
                xs={12}
                md={8}
                sx={{
                  
                }}
              >
                <ScrollableTabs />
              </Grid>

              {/* Sticky Sidebar */}
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  position: "relative",
                  display: { xs: "none", md: "block" }, // Hide on xs screens
                  // zIndex: "9000 !important",
                }}
              >
                <Box
                  sx={{
                    position: "sticky",
                    top: 65, // Sticky offset from the top
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

          {/* اقامتگاه های مشابه */}

          {/* === */}
        </Box>
      </Box>
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
    </StayPageContext.Provider>
  );
};

export default StayPage;
