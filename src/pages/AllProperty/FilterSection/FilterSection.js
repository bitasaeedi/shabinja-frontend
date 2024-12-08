import React from "react";
import { Box } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import FilterButton from "./FilterButton"; // Import the FilterButton component

const FilterSection = () => {
  // Filter button data array
  const filterButtons = [
    { filter: "filter", label: "فیلتر ها", icon: <FilterAltOutlinedIcon /> },
    { filter: "accommodationType", label: "نوع اقامتگاه", icon: <HomeWorkOutlinedIcon /> },
    { filter: "location", label: "منطقه اقامتگاه", icon: <LocationOnOutlinedIcon /> },
    { filter: "rentalType", label: "نوع اجاره", icon: <FilterAltOutlinedIcon /> },
    { filter: "rentalRange", label: "محدوده اجاره", icon: <PriceChangeOutlinedIcon /> },
    { filter: "dateSelection", label: "انتخاب تاریخ", icon: <DateRangeOutlinedIcon /> },
    { filter: "guestCount", label: "تعداد نفرات", icon: <PeopleOutlineOutlinedIcon /> },
  ];

  return (
    <Box
      className="w-100 m-0 border-bottom"
      sx={{
        position: "sticky",
        top: 65,
        zIndex: 1000,
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "scroll",
          padding: 2,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {filterButtons.map(({ filter, label, icon }) => (
          <FilterButton
            key={filter}
            filter={filter}
            label={label}
            startIcon={icon}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FilterSection;
