import React, { useRef } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  IconButton,
  SwipeableDrawer,
  Popover,
  Divider,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import SelectRangePrice from "./SelectRangePrice";

const PopVerFilter = ({
  callBackFunc,
  anchorEl,
  handleClosePopover,
  listRangePrice,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust for mobile

  return isMobile ? (
    <SwipeableDrawer
      anchor="bottom"
      open={Boolean(anchorEl)}
      onClose={handleClosePopover}
      onOpen={() => {}} // Optional: Add logic if needed when opening
      PaperProps={{
        sx: {
          maxHeight: "90vh", // Full-screen height
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px 12px 0 0", // Rounded top corners
          backgroundColor: "#ffff",
          width: "100%",
        },
      }}
    >
      {/* <SelectRangePrice callBackValues={callBackFunc} /> */}
    </SwipeableDrawer>
  ) : (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        sx: {
          mt: 3,
          minWidth: "310px",
          maxWidth: "320px",
          // backgroundColor: "#ffff",
        },
      }}
    >
      <SelectRangePrice
        callBackValues={callBackFunc}
        listRangePrice={listRangePrice}
      />
    </Popover>
  );
};

export default PopVerFilter;
