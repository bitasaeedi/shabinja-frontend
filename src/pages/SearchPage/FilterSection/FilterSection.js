import React from "react";
import { Box } from "@mui/material";

import CountPeopleButton from "./Buttons/CountPeopleButton/CountPeopleButton";
import DateFilterButton from "./Buttons/DateFilterButton/DateFilterButton";
import RentalRange from "./Buttons/RentalRange/RentalRange";
import AccommodationTypeButton from "./Buttons/AccommodationTypeButton/AccommodationTypeButton";
import AllFilterButton from "./Buttons/AllFilterButton/AllFilterButton";
import LocationFilterButton from "./Buttons/LocationFilterButton/LocationFilterButton";


const FilterSection = () => {
  const buttonComponents = [
    <AllFilterButton />,
    <DateFilterButton />,
    <CountPeopleButton />,
    <RentalRange />,
    <LocationFilterButton />,
    <AccommodationTypeButton />,
   
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
          <Box
            key={index}
            sx={{
              minWidth: "fit-content",
            }}
          >
            {item}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FilterSection;
