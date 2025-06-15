import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import PopOverHandle from "./PopOverHandle";
import moment from "moment-jalaali";
import { EditCalendarPageContext } from "../EditCalendarPage";

const ChangePriceButton = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { staycode, selectedDays } = useContext(EditCalendarPageContext);
  const [miladiDate, setMiladiDate] = useState([]);

  // shamsi be miladi
  const handleDate = (shamsi) => {
    const miladiDate = moment(shamsi, "jYYYY/jMM/jDD").format("YYYY-MM-DD");
    return miladiDate;
  };

  useEffect(() => {
    if (selectedDays[0] && selectedDays[1]) {
      setMiladiDate([handleDate(selectedDays[0]), handleDate(selectedDays[1])]);
    }
  }, [selectedDays]);

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
        popWidth={500}
        vertical={"center"}
      >
        {item?.component}
        {item?.element({
          staycode: staycode,
          miladiDate: miladiDate,
          handleClosePopover: handleClosePopover,
        })}
      </PopOverHandle>
    </>
  );
};

export default ChangePriceButton;
