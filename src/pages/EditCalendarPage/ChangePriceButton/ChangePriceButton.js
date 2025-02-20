import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import PopOverHandle from "./PopOverHandle";

const ChangePriceButton = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget); // Open popover only if not active
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          backgroundColor: "white",
          color: "#757575",
          borderColor: "#9e9e9e",
          minWidth: 200,
        }}
        size="small"
        // startIcon={<PriceChangeIcon />}
        onClick={handleButtonClick}
        // endIcon={<ArrowBackIosNewIcon fontSize="small" />}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <PriceChangeIcon sx={{ mr: 1, color: "primary.light" }} />
            <Typography
              variant="h6"
              sx={{
                fontSize: 16,
              }}
            >
              {item?.title}
            </Typography>
          </Box>

          <ArrowBackIosNewIcon sx={{ color: "primary.light", fontSize: 16 }} />
        </Box>
      </Button>

      <PopOverHandle
        anchorEl={anchorEl}
        handleClosePopover={handleClosePopover}
      >
        {item?.component}
      </PopOverHandle>
    </>
  );
};

export default ChangePriceButton;
