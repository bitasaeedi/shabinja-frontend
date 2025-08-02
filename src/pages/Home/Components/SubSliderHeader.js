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
        <Box
          sx={{
            margin: "0 12px",
          }}
        >
          <Grid
            sx={{}}
            container
            spacing={0} // Adds spacing between items properly
            justifyContent="space-between"
            alignItems="center"
          >
            {listCategories.map((item, index) => (
              <FastSearchCardMobile key={index} myData={item} />
            ))}
          </Grid>

        </Box>
      ) : (
        <>
          <Grid  container justifyContent="space-around" alignItems="center">
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
