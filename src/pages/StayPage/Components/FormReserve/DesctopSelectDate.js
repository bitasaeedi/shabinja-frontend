import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import MyCalendarsWithprice from "../../../../components/MyCalendars/MyCalendarsWithprice";
import "./myCalendar.css";

const DesctopSelectDate = ({
  anchorEl,
  handleClosePopover,
  onChange,
  values,
  listDayesWithPrice = [],
  centerPage = false,
  headerComponent = <></>,
}) => {
  const calendarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        handleClosePopover();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClosePopover]);

  return (
    <Box
      ref={calendarRef}
      sx={{
        position: centerPage ? "fixed" : "absolute",
        top: centerPage ? "50%" : "60px",
        left: centerPage ? "50%" : "unset",
        right: centerPage ? "unset" : 0,
        transform: centerPage ? "translate(-50%, -50%)" : "none",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        zIndex: 9000,
        p: 2,
      }}
    >
      {headerComponent}
      <MyCalendarsWithprice
        onChange={onChange}
        values={values}
        listDayesWithPrice={listDayesWithPrice}
      />
    </Box>
  );
};

export default DesctopSelectDate;
