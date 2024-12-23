import React, { useEffect, useRef, useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
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
import "./calenderDate.css";
const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

function PopOverSelectDate({
  callBackFunc,
  valueDefault = [],
  anchorEl,
  handleClosePopover,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust for mobile

  const [values, setValues] = useState(valueDefault);
  const calendarRef = useRef();

  useEffect(() => {
    setValues(valueDefault);
  }, [valueDefault]);
  const onChange = (value) => {
    // Log the formatted value of each selected date
    if (Array.isArray(value)) {
      var list = [];
      value.forEach((date) => {
        const day = date.day; // Day of the month
        const month = date.month.name; // Month name
        const year = date.year; // Year
        const miladi = GetMiladiStdFunc(new Date(date.toJSON()));
        const valueObj = {
          miladi,
          shamsiObj: GetShamsiDateDetails(miladi),
        };
        console.log(GetShamsiDateDetails(miladi), "miladi");
        list.push(valueObj);
      });
      callBackFunc(list);
    } else {
      console.log(value.toObject(), "calender normal"); // For single date selection
      // returnDate(value.format());
    }
  };

  return isMobile ? (
    <SwipeableDrawer
      anchor="bottom"
      open={Boolean(anchorEl)}
      onClose={handleClosePopover}
      onOpen={() => {}} // Optional: Add logic if needed when opening
      PaperProps={{
        sx: {
          maxHeight: "100vh", // Full-screen height
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px 12px 0 0", // Rounded top corners
          backgroundColor: "#ffff",
        },
      }}
    >
      {/* Fixed Header */}
      <Box
        sx={{
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "16px" }}>
          تاریخ شروع و پایان انتخاب کنید
        </Typography>
        <IconButton onClick={handleClosePopover}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Scrollable Content */}
      <Box
        sx={{
          flex: 1, // Fills available space
          overflowY: "auto", // Makes content scrollable
          justifyContent: "center",
        }}
        className=""
        ref={calendarRef}
      >
        <Calendar
          className="d-flex justify-content-center w-100 mx-0 px-0 shadow-none custom-calendar"
          arrowClassName="custom-arrow"
          containerStyle={{}}
          value={values}
          format="YYYY/MM/DD" // Set the desired format directly
          calendar={persian}
          locale={persian_fa}
          onChange={onChange}
          numberOfMonths={1}
          disableYearPicker
          disableMonthPicker
          range
          // rangeHover
          plugins={[weekends()]}
          animations={[transition()]}
          weekDays={weekDays}
          mapDays={({
            date,
            today,
            selectedDate,
            currentMonth,
            isSameDate,
          }) => {
            let isWeekend = date.weekDay.index === 6;
            if (isWeekend) {
              return {
                style: { color: "red" },
              };
            }
            if (
              GetMiladiStdFunc(date.toJSON()) < GetMiladiStdFunc(today.toJSON())
            ) {
              return {
                disabled: true,
                style: { color: "#ccc" },
              };
            } else if (
              isSameDate(date, selectedDate[0]) ||
              isSameDate(date, selectedDate[1])
            ) {
              return {
                // style: { backgroundColor: "black", color: "black" },
              };
            } else {
              return {
                style: {},
              };
            }
          }}
        />
      </Box>

      {/* Fixed Footer */}
      <Box
        sx={
          {
            // padding: "8px 16px",
            // backgroundColor: "#f5f5f5",
            // borderTop: "1px solid #ddd",
          }
        }
      ></Box>
    </SwipeableDrawer>
  ) : (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      PaperProps={{
        sx: {
          mt: 3,
        },
      }}
    >
      <Box
        ref={calendarRef}
        sx={{
          flex: 1, // Fills available space
          overflowY: "auto", // Makes content scrollable
          justifyContent: "center",
        }}
      >
        <Calendar
          inputClass="custom-input"
          className="d-flex justify-content-center w-100 mx-0 px-0 shadow-none custom-calendar"
          value={values}
          format="YYYY/MM/DD" // Set the desired format directly
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          onChange={onChange}
          numberOfMonths={2}
          disableYearPicker
          disableMonthPicker
          range
          rangeHover
          plugins={[weekends()]}
          animations={[transition()]}
          weekDays={weekDays}
          mapDays={({
            date,
            today,
            selectedDate,
            currentMonth,
            isSameDate,
          }) => {
            let isWeekend = date.weekDay.index === 6;
            if (isWeekend) {
              return {
                style: { color: "red" },
              };
            }
            if (
              GetMiladiStdFunc(date.toJSON()) < GetMiladiStdFunc(today.toJSON())
            ) {
              return {
                disabled: true,
                style: { color: "#ccc" },
              };
            } else if (
              isSameDate(date, selectedDate[0]) ||
              isSameDate(date, selectedDate[1])
            ) {
              return {
                // style: { backgroundColor: "black", color: "black" },
              };
            } else {
              return {
                style: {},
              };
            }
          }}
        />
      </Box>
    </Popover>
  );
}

export default PopOverSelectDate;
