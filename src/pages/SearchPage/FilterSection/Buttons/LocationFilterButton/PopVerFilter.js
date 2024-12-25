import React, { useRef } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  IconButton,
  SwipeableDrawer,
  Popover,
  Divider,
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
        // backgroundColor: "#f5f5f5",
        // borderBottom: "1px solid #ddd",
      }}
    >
      <Typography variant="h6" sx={{ fontSize: "16px" }}>
        فیلتر
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
        padding: "16px",
      }}
    >
      {/* Add your filter content here */}
      <Typography variant="body1">به زودی تکمیل میشود</Typography>
      {[...Array(5)].map((_, index) => (
        <Typography key={index}>محتوای شماره {index + 1}</Typography>
      ))}
    </Box>

    <Divider />

    {/* Fixed Footer */}
    <Box
      sx={{
        padding: "8px 16px",
      }}
    >
      <Typography variant="body2" align="center">
        محتوای فوتر مانند بستن
      </Typography>
    </Box>
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
          mt: 1,
          width: "600px",
          minHeight: "500px",
          backgroundColor: "#ffff",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
        }}
      >
        <IconButton onClick={handleClosePopover}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        ref={counterRef}
        sx={{
          padding: "16px",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Add your filter content here */}
      </Box>
    </Popover>
  );
};

export default PopVerFilter;
