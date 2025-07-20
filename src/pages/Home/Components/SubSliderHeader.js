import React, { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import FastSearchCard from "../../../components/Cards/FastSearchCard";
import ItemsFastSearch from "../../../myDatas/ItemsFastSearch";
import { useTheme } from "@emotion/react";
import FastSearchCardMobile from "../../../components/Cards/FastSearchCardMobile";

const SubSliderHeader = ({ listCategories = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  console.log("listCategories", listCategories);

  return (
    <>
      {isMobile ? (
        <Grid
          sx={{
            padding: "0 12px",  
          }}
          container
          justifyContent="space-around"
          alignItems="center"
        >
          {listCategories.map((item, index) => (
            <FastSearchCardMobile key={index} myData={item} />
          ))}
        </Grid>
      ) : (
        <>
          <Grid container justifyContent="space-around" alignItems="center">
            {listCategories.map((item, index) => (
              <FastSearchCard key={index} myData={item} />
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default SubSliderHeader;
