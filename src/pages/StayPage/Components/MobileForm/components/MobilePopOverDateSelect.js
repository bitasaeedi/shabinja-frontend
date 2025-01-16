import React, { useContext, useEffect, useRef, useState } from "react";
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
import { StayPageContext } from "../../../StayPage";
import MyCalendarsWithPrice from "../../../../../components/MyCalendars/MyCalendarsWithprice";



function MobilePopOverDateSelect({ anchorEl, handleClosePopover }) {
  const stayPageContext = useContext(StayPageContext);
  const calendarRef = useRef();

  return (
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
          بازه رزرو را انتخاب کنید
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
        <MyCalendarsWithPrice
          numMonth={1}
          onChange={stayPageContext.handleChangeDate}
          values={stayPageContext.listDateSelected}
          listDayesWithPrice={stayPageContext?.infoOfStay?.priceHostTours}
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
}

export default MobilePopOverDateSelect;
