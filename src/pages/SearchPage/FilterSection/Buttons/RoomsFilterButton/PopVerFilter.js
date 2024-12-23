import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Popover,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
const PopVerFilter = ({
  callBackFunc,
  defaultCount,
  anchorEl,
  handleClosePopover,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust for mobile

  const counterRef = useRef();

  return (
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
          width: "400px",
          minHeight: "400px",
          backgroundColor: "#ffff",
        },
      }}
    >
      <Box
        ref={counterRef}
        sx={{
          borderRadius: "8px",
          padding: "0",
          m: 0,
          p: 0,
          width: "100%",
          height: "100%",
        }}
      ></Box>
    </Popover>
  );
};

export default PopVerFilter;
