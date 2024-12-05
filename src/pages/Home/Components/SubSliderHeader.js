import React from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import VillaIcon from "@mui/icons-material/Villa";
import HomeIcon from "@mui/icons-material/Home";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import PoolIcon from "@mui/icons-material/Pool";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import StarIcon from "@mui/icons-material/Star";
import FastSearchCard from "../../../components/Cards/FastSearchCard";
import ItemsFastSearch from "../../../myDatas/ItemsFastSearch";

const SubSliderHeader = () => {
  // const items = [
  //   { icon: <VillaIcon sx={{ fontSize: 35 }} />, label: "ویلا" }, // Villa
  //   { icon: <HomeIcon sx={{ fontSize: 35 }} />, label: "کلبه" }, // Cabin/Home
  //   { icon: <NaturePeopleIcon sx={{ fontSize: 35 }} />, label: "بوم گردی" }, // Eco-Tourism
  //   { icon: <PoolIcon sx={{ fontSize: 35 }} />, label: "استخردار" }, // Pool
  //   { icon: <BeachAccessIcon sx={{ fontSize: 35 }} />, label: "ساحلی" }, // Beach
  //   { icon: <AgricultureIcon sx={{ fontSize: 35 }} />, label: "روستایی" }, // Rural
  //   { icon: <StarIcon sx={{ fontSize: 35 }} />, label: "پیشنهاد ویژه" }, // Special Offer
  // ];

  return (
    <Grid container justifyContent="space-around" alignItems="center">
      {ItemsFastSearch.map((item, index) => (
        <FastSearchCard key={index} myData={item} />
      ))}
    </Grid>
  );
};

export default SubSliderHeader;
