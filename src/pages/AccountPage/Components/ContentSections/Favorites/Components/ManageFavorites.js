import { Box, Typography } from "@mui/material";
import React from "react";
import { HostTourSearchApi } from "../../../../../../api/toureApis";
import HomeCardSkeleton from "../../../../../../components/Cards/HomeCards/HomeCardSkeleton";
import InViewComponents from "../../../../../../components/InViewComponents/InViewComponents";
import SwipperSliderPublick from "../../../../../../components/Sliders/SwipperSliderPublick";
import HomeCards from "../../../../../../components/Cards/HomeCards/HomeCards";

const ManageFavorites = () => {
  const callApiForGetList = async (dataToFilter) => {
    const resultGetTours = await HostTourSearchApi(dataToFilter);
    var list = resultGetTours?.data?.items;
     console.log("resultGetTours list",list);
    return list;
  };
  callApiForGetList()
  return (
    <Box>
      <Typography
        variant="h6"
        align="right"
        gutterBottom
        sx={{
          fontSize: "18px",
          display: { xs: "none", md: "flex" },
        }}
      >
        پسندها
      </Typography>
      {/* <Box
        sx={{
          // minHeight: 600,
          py: { xs: 1, md: 3 },
        }}
        className="shadow borde rounded"
      >
        <Box className=" " sx={{ marginTop: { xs: 1, md: 1 } }}>
          <InViewComponents getListData={() => callApiForGetList({})}>
            <SwipperSliderPublick
              widthSize={{ xs: "90%", md: "95%" }}
              title={
                <Typography
                  variant="h6"
                  sx={{
                    // mb: 1,
                    // display: "inline-block",
                    fontSize: { xs: 14, md: 18 },
                  }}
                >
                  لیست اول
                </Typography>
              }
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                600: {
                  slidesPerView: 1,
                },
                720: {
                  slidesPerView: 2,
                },
                1300: {
                  slidesPerView: 2,
                },
              }}
            >
              <HomeCards />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>

        <Box className=" " sx={{ marginTop: { xs: 2, md: 5 } }}>
          <InViewComponents getListData={() => callApiForGetList({})}>
            <SwipperSliderPublick
              widthSize={{ xs: "90%", md: "95%" }}
              title={
                <Typography
                  variant="h6"
                  sx={{
                    // mb: 1,
                    // display: "inline-block",
                    fontSize: { xs: 14, md: 18 },
                  }}
                >
                  لیست دوم
                </Typography>
              }
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                600: {
                  slidesPerView: 1,
                },
                720: {
                  slidesPerView: 2,
                },
                1300: {
                  slidesPerView: 2,
                },
              }}
            >
              <HomeCards />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>

        <Box className=" " sx={{ marginTop: { xs: 2, md: 5 } }}>
          <InViewComponents getListData={() => callApiForGetList({})}>
            <SwipperSliderPublick
              widthSize={{ xs: "90%", md: "95%" }}
              title={
                <Typography
                  variant="h6"
                  sx={{
                    // mb: 1,
                    // display: "inline-block",
                    fontSize: { xs: 14, md: 18 },
                  }}
                >
                  لیست سوم
                </Typography>
              }
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                600: {
                  slidesPerView: 1,
                },
                720: {
                  slidesPerView: 2,
                },
                1300: {
                  slidesPerView: 2,
                },
              }}
            >
              <HomeCards />
            </SwipperSliderPublick>
          </InViewComponents>
        </Box>
      </Box> */}

      <Box
        sx={{
          // minHeight: 600,
          py: { xs: 1, md: 3 },
        }}
        className="shadow borde rounded"
      >
        
      </Box>


    </Box>
  );
};

export default ManageFavorites;
