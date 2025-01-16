import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import transition from "react-element-popper/animations/transition";
import {
  GetMiladiStdFunc,
  GetShamsiDateDetails,
} from "../../../../../components/DateFunctions/DateFunctions";
import {
  Box,
  Divider,
  IconButton,
  Popover,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

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
    <Calendar
      className="d-flex justify-content-center w-100 mx-0 px-0 shadow-none custom-calendar "
      value={values}
      format="YYYY/MM/DD"
      fixMainPosition={true}
      fixRelativePosition={true}
      offsetY={5}
      calendarPosition="bottom-right"
      calendar={persian}
      locale={persian_fa}
      onChange={onChange}
      numberOfMonths={2}
      disableYearPicker
      disableMonthPicker
      range
      rangeHover
      plugins={[weekends()]}
      animations={[transition()]}
      weekDays={weekDays}
      mapDays={({ date, today, selectedDate, isSameDate }) => {
        let isWeekend = date.weekDay.index === 6;
        var isDisabled =
          GetMiladiStdFunc(date.toJSON()) < GetMiladiStdFunc(today.toJSON());
        if (isWeekend) {
          return {
            disabled: isDisabled ? true : false,
            style: { color: isDisabled ? "rgba(255, 0, 0, 0.36)" : "red" },
          };
        }
        if (isDisabled) {
          return { disabled: true, style: { color: "#ccc" } };
        }
        return isSameDate(date, selectedDate[0]) ||
          isSameDate(date, selectedDate[1])
          ? {}
          : { style: {} };
      }}
    />
  );

  return (
    <Box
      sx={{
        position: "absolute",
        top: anchorEl.getBoundingClientRect().bottom - 40,
        right: anchorEl.getBoundingClientRect().left,
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        zIndex: "300 !important",
        transform: "translate(90%, 0)",
      }}
      ref={calendarRef}
    >
      {CalendarComponent}
    </Box>
    // </Popover>
  );
};

export default DesctopSelectDate;
