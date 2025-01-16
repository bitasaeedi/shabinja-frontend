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
import DesctopSelectDate from "./DesctopSelectDate";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

function PopOverSelectDate({
  callBackFunc,
  valueDefault = [],
  anchorEl,
  handleClosePopover,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [values, setValues] = useState(valueDefault);
  const calendarRef = useRef();

  useEffect(() => {
    setValues(valueDefault);
  }, [valueDefault]);

  const onChange = (value) => {
    if (Array.isArray(value)) {
      const list = value.map((date) => {
        const miladi = GetMiladiStdFunc(new Date(date.toJSON()));
        return {
          miladi,
          shamsiObj: GetShamsiDateDetails(miladi),
        };
      });
      callBackFunc(list);
    } else {
      console.log(value.toObject(), "calendar normal");
    }
  };

  const DrawerContent = (
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
          تاریخ رزرو
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
          className="d-flex justify-content-center w-100 mx-0 px-0 shadow-none custom-calendar custom-calendar-week-day custom-calendar-month-day"
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
            var isDisabled =
              GetMiladiStdFunc(date.toJSON()) <
              GetMiladiStdFunc(today.toJSON());
            if (isWeekend) {
              return {
                disabled: isDisabled ? true : false,
                style: { color: isDisabled ? "rgba(255, 0, 0, 0.36)" : "red" },
              };
            }
            if (isDisabled) {
              return { disabled: true, style: { color: "#ccc" } };
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
        sx={{
          mt: 2,
        }}
      ></Box>
    </SwipeableDrawer>
  );

  return isMobile ? (
    DrawerContent
  ) : (
    <DesctopSelectDate
      anchorEl={anchorEl}
      handleClosePopover={handleClosePopover}
      onChange={onChange}
      values={values}
    />
  );
}

export default PopOverSelectDate;
