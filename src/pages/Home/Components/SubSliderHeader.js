import React from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import VillaIcon from "@mui/icons-material/Villa";
import HomeIcon from "@mui/icons-material/Home";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import PoolIcon from "@mui/icons-material/Pool";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import StarIcon from "@mui/icons-material/Star";

const SubSliderHeader = () => {
  const items = [
    { icon: <VillaIcon sx={{ fontSize: 35 }} />, label: "ویلا" }, // Villa
    { icon: <HomeIcon sx={{ fontSize: 35 }} />, label: "کلبه" }, // Cabin/Home
    { icon: <NaturePeopleIcon sx={{ fontSize: 35 }} />, label: "بوم گردی" }, // Eco-Tourism
    { icon: <PoolIcon sx={{ fontSize: 35 }} />, label: "استخردار" }, // Pool
    { icon: <BeachAccessIcon sx={{ fontSize: 35 }} />, label: "ساحلی" }, // Beach
    { icon: <AgricultureIcon sx={{ fontSize: 35 }} />, label: "روستایی" }, // Rural
    { icon: <StarIcon sx={{ fontSize: 35 }} />, label: "پیشنهاد ویژه" }, // Special Offer
  ];

  return (
    <Grid container justifyContent="space-around" alignItems="center">
      {items.map((item, index) => (
        <Grid item key={index}>
          <Button
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 100,
              height: 100,
              backgroundColor: "transparent",
              boxShadow: "none",
              //   "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
              color: "#37474f",
            }}
          >
            {item.icon}
            <Typography variant="h6" sx={{ marginTop: 1 }}>
              {item.label}
            </Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default SubSliderHeader;
