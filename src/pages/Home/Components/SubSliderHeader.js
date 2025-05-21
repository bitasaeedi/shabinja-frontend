import React, { useEffect, useState } from "react";
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

const SubSliderHeader = ({listCategories = []}) => {
 


  return (
    <Grid container justifyContent="space-around" alignItems="center">
      {listCategories.map((item, index) => (
        <FastSearchCard key={index} myData={item} />
      ))}
    </Grid>
  );
};

export default SubSliderHeader;
