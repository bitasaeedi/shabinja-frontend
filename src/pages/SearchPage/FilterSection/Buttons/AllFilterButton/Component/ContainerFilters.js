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

import PowerOutlinedIcon from "@mui/icons-material/PowerOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
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
          list={[
            {
              id: 1,
              title: "استان تهران",
              subList: [
                { id: 1, title: "تهران" },
                { id: 2, title: "فیروزکوه" },
                { id: 3, title: "شهر" },
                { id: 1, title: "تهران" },
                { id: 2, title: "فیروزکوه" },
                { id: 3, title: "شهر" },
              ],
            },
            {
              id: 2,
              title: "خراسان رضوی",
              subList: [
                { id: 1, title: "مشهد" },
                { id: 2, title: "نیشابور" },
                { id: 3, title: "قوچان" },
                { id: 1, title: "مشهد" },
                { id: 2, title: "نیشابور" },
                { id: 3, title: "قوچان" },
              ],
            },
            {
              id: 3,
              title: "مازندران",
              subList: [
                { id: 1, title: "ساری" },
                { id: 2, title: "سوادکوه" },
                { id: 1, title: "ساری" },
                { id: 2, title: "سوادکوه" },
                { id: 1, title: "ساری" },
                { id: 2, title: "سوادکوه" },
                { id: 1, title: "ساری" },
                { id: 2, title: "سوادکوه" },
              ],
            },
          ]}
        />
      </Box>
      <hr />
      <Box sx={{}}>
        <RankFilter />
      </Box>
      <hr />
      <Box sx={{}}>
        <ListCheckBox
          list={[
            { id: 1, title: "روستایی" },
            { id: 2, title: "شهری" },
            { id: 3, title: "جنگلی" },
            { id: 4, title: "ساحلی" },
            { id: 5, title: "کوهستانی" },
            { id: 6, title: "کویری" },
          ]}
          title="نوع منطقه"
          limit={10}
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
      <Box sx={{}}>
        <ListCheckBox
          list={[{ id: 1, title: "ویلایی" }]}
          title="نوع اقامتگاه"
          limit={10}
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
          list={popVerFilterContext?.listRolles}
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
          list={popVerFilterContext?.listOtherItem}
          title="امکانات خاص"
          limit={10}
          iconTitle={
            <WifiOutlinedIcon
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
          list={[
            { id: 1, title: "سیستم سرمایشی" },
            { id: 2, title: "تلویزیون" },
            { id: 3, title: "یخچال" },
            { id: 4, title: "سیستم گرمایشی" },
            { id: 5, title: "مبلمان" },
            { id: 6, title: "لوازم سرو غذا" },
          ]}
          title="مجهز به"
          limit={10}
          iconTitle={
            <PowerOutlinedIcon
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
          list={[
            { id: 1, title: "حمام" },
            { id: 2, title: "بالکن" },
            { id: 3, title: "سرویس بهداشتی فرنگی" },
            { id: 4, title: "سرویس بهداشتی ایرانی" },
            { id: 5, title: "فضای سبز" },
            { id: 6, title: "پارکینگ" },
            { id: 7, title: "آسانسور" },
            { id: 8, title: "آب" },
            { id: 9, title: "برق" },
            { id: 10, title: "گاز" },
          ]}
          title="امکانات اولیه"
          limit={10}
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
