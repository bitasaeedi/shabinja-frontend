import React, { useEffect, useRef, useState } from "react";
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
const PopOverHandle = ({ anchorEl, handleClosePopover, children }) => {
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
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography>عنوان</Typography>
        <Box
          sx={{
            backgroundColor: "#f1f1f1",
            width: "50px",
            height: "8px",
            borderRadius: "20%",
          }}
        ></Box>
      </Box>

      {children}
    </SwipeableDrawer>
  ) : (
    <Popover
      open={Boolean(anchorEl)}
      //   anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      PaperProps={{
        sx: {
          mt: 3,
        },
      }}
    >
      <Box
        sx={{
          borderRadius: "8px",
          padding: "18px 16px",
          width: "500px",
        }}
      >
        {children}
      </Box>
    </Popover>
  );
};

export default PopOverHandle;
