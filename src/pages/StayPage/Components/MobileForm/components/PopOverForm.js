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
import FormReserve from "../../FormReserve/FormReserve";

function PopOverForm({ callBackFunc, anchorEl, handleClosePopover }) {
  const theme = useTheme();

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={Boolean(anchorEl)}
      onClose={handleClosePopover}
      onOpen={() => {}} // Optional: Add logic if needed when opening
      PaperProps={{
        sx: {
          maxHeight: "100vh", // Full-screen height
          display: { xs: "flex", md: "none" },
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
          درخواست رزرو
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
      >
        <FormReserve />
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

export default PopOverForm;
