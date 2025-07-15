import React from "react";
import { Box, Typography } from "@mui/material";
import SideBarCard from "../CardSectins/SideBarCard";

const sideItems = [
  {
    title: "P&O Ferries: Short Break Offer for Dover to Calais",
    date: "Jul 7, 2025",
  },
  {
    title: "P&O Ferries: Short Break Offer for Dover to Calais",
    date: "Jul 7, 2025",
  },
  {
    title: "P&O Ferries: Short Break Offer for Dover to Calais",
    date: "Jul 7, 2025",
  },
  {
    title: "P&O Ferries: Short Break Offer for Dover to Calais",
    date: "Jul 7, 2025",
  },
  {
    title: "P&O Ferries: Short Break Offer for Dover to Calais",
    date: "Jul 7, 2025",
  },
  {
    title: "P&O Ferries: Short Break Offer for Dover to Calais",
    date: "Jul 7, 2025",
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
          تبلیغات
        </Typography>

        {/* items */}
        {sideItems.map((item, index) => (
          <SideBarCard key={index} title={item.title} date={item.date} />
        ))}
      </Box>
    </>
  );
}
