import React from "react";
import { Box } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import FilterButton from "./FilterButton"; // Import the FilterButton component
import CountPeopleButton from "./Buttons/CountPeopleButton/CountPeopleButton";
import DateFilterButton from "./Buttons/DateFilterButton/DateFilterButton";
import RentalRange from "./Buttons/RentalRange/RentalRange";

const FilterSection = () => {
  const filterButtons = [
    {
      id: 1,
      filter: "filter",
      label: "فیلتر ها",
      icon: <FilterAltOutlinedIcon />,
      popoverType: "allFilter",
    },
    {
      id: 2,
      filter: "accommodationType",
      label: "نوع اقامتگاه",
      icon: <HomeWorkOutlinedIcon />,
      popoverType: "allFilter",
    },
    {
      id: 3,
      filter: "location",
      label: "منطقه اقامتگاه",
      icon: <LocationOnOutlinedIcon />,
      popoverType: "allFilter",
    },
    {
      id: 4,
      filter: "rentalRange",
      label: "محدوده اجاره",
      icon: <PriceChangeOutlinedIcon />,
      popoverType: "allFilter",
    },
    {
      id: 5,
      filter: "dateSelection",
      label: "انتخاب تاریخ",
      icon: <DateRangeOutlinedIcon />,
      popoverType: "allFilter",
    },
    {
      id: 6,
      filter: "guestCount",
      label: "تعداد نفرات",
      icon: <PeopleOutlineOutlinedIcon />,
      popoverType: "allFilter",
    },
  ];

  const buttonComponents = [
    <CountPeopleButton />,
    <DateFilterButton />,
    <RentalRange />,
  ];
  return (
    <Box
      sx={{
        position: "sticky",
        top: 65, // چسباندن به هدر سایت
        zIndex: 200,
        backgroundColor: "white",
        borderBottom: "1px solid #ddd",
        padding: "8px 12px", // کاهش فاصله برای موبایل
        // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {buttonComponents.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
        {/* {filterButtons.map(({ filter, label, icon, id }, index) => (
          <FilterButton
            key={index}
            filter={filter}
            label={label}
            startIcon={icon}
          />
        ))} */}
      </Box>
    </Box>
  );
};

export default FilterSection;
