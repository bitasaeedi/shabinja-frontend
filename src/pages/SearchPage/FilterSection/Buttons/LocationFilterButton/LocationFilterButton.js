import React, { useState, useEffect, useContext } from "react";
import { Button, Popover, Box, Typography, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { SearchPageContext } from "../../../SearchPage";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PopVerFilter from "./PopVerFilter";

const filter = "location";
const label = "انتخاب شهر";
const startIcon = <LocationOnOutlinedIcon />;
const LocationFilterButton = ({}) => {
  const [active, setActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State to manage Popover
  const searchPageContext = useContext(SearchPageContext);
  const [valueOfFilter, setValueOfFilters] = useState(null);

  const isFilterActive = () => {
    searchPageContext.isFilterActive();
    const params = new URLSearchParams(window.location.search);
    const valueOfFilter = params.get(filter);
    if (valueOfFilter) {
      setActive(true);
      setValueOfFilters(valueOfFilter);
    } else {
      setActive(false);
      setValueOfFilters(null);
    }
  };

  // Update active state whenever location.search changes
  useEffect(() => {
    isFilterActive();
  }, [filter]);

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

  const handleSetSearch = (value) => {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set(filter, value);
    } else {
      params.delete(filter);
    }

    // Update the URL with the new search parameters
    const newSearch = params.toString();
    window.history.replaceState(null, "", `?${newSearch}`);
    isFilterActive();
    handleClosePopover();
    searchPageContext.handleSearch();
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
          display: { xs: "none", md: "flex" },
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
                handleSetSearch();
              }}
              sx={{ cursor: "pointer" }}
            />
          )
        }
      >
        {valueOfFilter ? `${valueOfFilter}` : label}
      </Button>

      {/* Popover */}
      {
        // !active  &&
        <PopVerFilter
          callBackFunc={handleSetSearch}
          defaultCount={parseFloat(valueOfFilter)}
          anchorEl={anchorEl}
          handleClosePopover={handleClosePopover}
        />
      }
    </>
  );
};

export default LocationFilterButton;
