import React from "react";
import { Box, Typography } from "@mui/material";
import SideBarCard from "../CardSectins/SideBarCard";

const sideItems = [
  {
    title: "جنوبگردی",
    count: 10,
  },
  {
    title: "گردشگرانه",
    count: 14,
  },
  {
    title: "شمال‌گردی",
    count: 20,
  },
  {
    title: "ایرانگردی",
    count: 19,
  },
  {
    title: "مزه‌گردی",
    count: 5,
  },
  {
    title: "راه‌بلد",
    count: 22,
  },
];
export default function SidebarPart({ myWidth }) {
  return (
    <>
      <Box
        sx={{
          width: myWidth,
          minWidth: "310px",
        }}
      >
        {/* sidebar title */}
        <Typography
          variant="h6"
          sx={{
            bgcolor: "black",
            color: "white",
            textAlign: "center",
            padding: ".3rem",
            fontSize: "1.1rem",
          }}
        >
          دسته بندی ها
        </Typography>

        {/* items */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mx:2,
            mt:2
          }}
        >
          {sideItems.map((item, index) => (
            <SideBarCard key={index} title={item.title} count={item.count} />
          ))}
        </Box>
      </Box>
    </>
  );
}
