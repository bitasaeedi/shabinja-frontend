import React, { useState, useEffect, useContext } from "react";
import { Button, Popover, Box, Typography, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { SearchPageContext } from "../../../SearchPage";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import PopOverSelectDate from "./PopOverSelectDate";
import { ShamsiToMoreShamsiDetails } from "../../../../../components/DateFunctions/DateFunctions";

const filter = "start";
const label = "تاریخ رزرو";
const startIcon = <DateRangeOutlinedIcon />;
const DateFilterButton = ({}) => {
  const [active, setActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State to manage Popover
  const searchPageContext = useContext(SearchPageContext);
  const [valueOfFilter, setValueOfFilters] = useState(null);
  const [listDateSelected, setListDateSelected] = useState([]);
  const isFilterActive = () => {
    const params = new URLSearchParams(window.location.search);
    const valueOfFilter = params.get("start");
    const valueOfFilter2 = params.get("end");
    if (valueOfFilter && valueOfFilter2) {
      setActive(true);
      const startShamsiObj = ShamsiToMoreShamsiDetails(valueOfFilter);
      const endShamsiObj = ShamsiToMoreShamsiDetails(valueOfFilter2);
      const lable = `${startShamsiObj?.day}  ${
        startShamsiObj?.monthName === endShamsiObj?.monthName
          ? ""
          : startShamsiObj?.monthName
      }  تا  ${endShamsiObj?.day}  ${endShamsiObj?.monthName}`;
      setValueOfFilters(lable);
      setListDateSelected([valueOfFilter, valueOfFilter2]);
    } else {
      setActive(false);
      setValueOfFilters(null);
      setListDateSelected([]);
    }
  };

  // Update active state whenever location.search changes
  useEffect(() => {
    isFilterActive();
  }, []);

  // Function to handle filter button click
  const handleButtonClick = (event) => {
    // if (!active) {
    setAnchorEl(event.currentTarget); // Open popover only if not active
    // }
  };

  // Function to handle popover close
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleSetSearch = (listDate) => {
    // console.log("handleSetSearch", listDate);
    const params = new URLSearchParams(window.location.search);
    if (listDate.length === 2) {
      params.set("start", listDate[0]?.shamsiObj?.fullshamsi);
      params.set("end", listDate[1]?.shamsiObj?.fullshamsi);

      // // Update the URL with the new search parameters
      const newSearch = params.toString();
      window.history.replaceState(null, "", `?${newSearch}`);
      isFilterActive();
      handleClosePopover();
      searchPageContext.handleSearch();
    } else if (listDate.length === 1) {
    } else {
      params.delete("start");
      params.delete("end");
      const newSearch = params.toString();
      window.history.replaceState(null, "", `?${newSearch}`);
      isFilterActive();
      handleClosePopover();
      searchPageContext.handleSearch();
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          backgroundColor: active ? "#eeeeee" : "white",
          color: active ? "black" : "black",
          borderColor: active ? "black" : "rgba(0, 0, 0, 0.12)",
          minWidth: "fit-content",
        }}
        size="small"
        startIcon={startIcon}
        onClick={handleButtonClick}
        endIcon={
          active && (
            <ClearIcon
              fontSize="small"
              onClick={(e) => {
                e.stopPropagation();
                handleSetSearch([]);
              }}
              sx={{ cursor: "pointer" }}
            />
          )
        }
      >
        {valueOfFilter ? `${valueOfFilter} ` : label}
      </Button>

      {/* Popover */}
      {/* {!active  && ( */}
      {anchorEl && (
        <PopOverSelectDate
          callBackFunc={handleSetSearch}
          valueDefault={listDateSelected}
          anchorEl={anchorEl}
          handleClosePopover={handleClosePopover}
        />
      )}
    </>
  );
};

export default DateFilterButton;
