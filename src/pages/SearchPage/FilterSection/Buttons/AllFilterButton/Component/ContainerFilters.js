import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CounterRoom from "./CounterRoom";
import CountFilter from "./CountFilter";
import FastStayes from "./FastStayes";
import ListCheckBox from "./ListCheckBox";
import PriceRange from "./PriceRange";
import RankFilter from "./RankFilter";
import SelectCity from "./SelectCity";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import TerrainOutlinedIcon from "@mui/icons-material/TerrainOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";

import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";

import { PopVerFilterContext } from "../PopVerFilter";

const ContainerFilters = () => {
  const popVerFilterContext = useContext(PopVerFilterContext);

  return (
    <Box>
      <Box sx={{}}>
        <CountFilter />
      </Box>
      <hr />
      <Box sx={{}}>
        <CounterRoom />
      </Box>
      <hr />
      <Box sx={{}}>
        <FastStayes />
      </Box>
      <hr />
      <Box sx={{}}>
        <PriceRange />
      </Box>
      <hr />
      {/* /شهری */}
      <Box sx={{}}>
        <Typography
          variant="h6"
          sx={{
            fontSize: 16,
            fontWeight: 500,
            color: "#333",
            px: { xs: 0, md: 2 },
            mb: 0,
          }}
        >
          <LocationCityOutlinedIcon
            sx={{
              fontSize: { xs: 17, md: 20 },
              mr: 2,
              // color: "gray",
            }}
          />
          انتخاب شهر
        </Typography>
        <SelectCity
          title={"انتخاب شهر"}
          list={popVerFilterContext?.listProvince?.map((item) => ({
            id: item?.id,
            title: item?.title,
            searchtitle: item?.title,
            cities: item?.cities.map((city) => ({
              id: city?.id,
              title: city?.title,
              searchtitle: city?.title,
            })),
          }))}
          listSelected={popVerFilterContext?.selectedListCity}
          handleChangeListSelected={popVerFilterContext?.setSelectedListCity}
        />
      </Box>
      <hr />
      <Box sx={{}}>
        <RankFilter />
      </Box>
      <hr />
      {/* نوع منطقه */}
      <Box sx={{}}>
        <ListCheckBox
          list={popVerFilterContext?.listTypeHostLoc.map((item) => ({
            id: item?.id,
            title: item?.title,
            searchtitle: item?.titleEn,
          }))}
          listSelected={popVerFilterContext?.selectedListTypeHostLoc}
          handleChangeListSelected={
            popVerFilterContext?.setSelectedListTypeHostLoc
          }
          title="نوع منطقه"
          limit={10}
          twoColumn={true}
          iconTitle={
            <TerrainOutlinedIcon
              sx={{
                fontSize: { xs: 17, md: 20 },
                mr: 2,
                // color: "gray",
              }}
            />
          }
        />
      </Box>
      <hr />
      {/* نوع اقامتگاه */}
      <Box sx={{}}>
        <ListCheckBox
          title="نوع اقامتگاه"
          list={popVerFilterContext?.listTypeHost.map((item) => ({
            id: item?.id,
            title: item?.title,
            searchtitle: item?.title,
          }))}
          listSelected={popVerFilterContext?.selectedListTypeHost}
          handleChangeListSelected={
            popVerFilterContext?.setSelectedListTypeHost
          }
          limit={10}
          twoColumn={true}
          iconTitle={
            <HomeOutlinedIcon
              sx={{
                fontSize: { xs: 17, md: 20 },
                mr: 2,
                // color: "gray",
              }}
            />
          }
        />
      </Box>
      <hr />
      <Box sx={{}}>
        <ListCheckBox
          list={popVerFilterContext?.listRolles.map((item) => ({
            id: item?.id,
            title: item?.title,
            searchtitle: item?.titleEn,
          }))}
          listSelected={popVerFilterContext?.selectedListRolles}
          handleChangeListSelected={popVerFilterContext?.setSelectedListRolles}
          title="قوانین اقامتگاه"
          limit={10}
          iconTitle={
            <GavelOutlinedIcon
              sx={{
                fontSize: { xs: 17, md: 18 },
                mr: 2,
                // color: "gray",
              }}
            />
          }
        />
      </Box>
      <hr />
      <Box sx={{}}>
        <ListCheckBox
          list={popVerFilterContext?.listOtherItem.map((item) => ({
            id: item?.id,
            title: item?.title,
            searchtitle: item?.titleEn,
          }))}
          listSelected={popVerFilterContext?.selectedListOtherItem}
          handleChangeListSelected={
            popVerFilterContext?.setSelectedListOtherItem
          }
          title="امکانات "
          twoColumn={true}
          limit={4}
          iconTitle={
            <BathtubOutlinedIcon
              sx={{
                fontSize: { xs: 17, md: 20 },
                mr: 2,
                // color: "gray",
              }}
            />
          }
        />
      </Box>
    </Box>
  );
};

export default ContainerFilters;
