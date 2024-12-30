import React, { useEffect, useRef, useState } from "react";

import "./myCalendar.css";
import MyCalendarsWithprice from "../../../../components/MyCalendars/MyCalendarsWithprice";
import { Box } from "@mui/material";



const DesctopSelectDate = ({
  anchorEl,
  handleClosePopover,
  onChange,
  values,
}) => {
  const calendarRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        handleClosePopover(); // Close the popup if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClosePopover]);

  const CalendarComponent = (
    <MyCalendarsWithprice onChange={onChange} values={values} />
  );

  return (
    <Box
      sx={{
        position: "absolute",
        top: 60,
        right: 0,
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        zIndex: "9000 !important",
        // transform: "translate(90%, 0)",
      }}
      ref={calendarRef}
    >
      {CalendarComponent}
    </Box>
  );
};

export default DesctopSelectDate;
