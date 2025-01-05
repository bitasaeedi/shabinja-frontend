import React, { useState, useEffect, useContext } from "react";
import { Button, Popover, Box, Typography, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { SearchPageContext } from "../../../SearchPage";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import PopVerFilter from "./PopVerFilter";

const label = "فیلتر";
const startIcon = <FilterAltOutlinedIcon />;
const AllFilterButton = ({}) => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage Popover
  const searchPageContext = useContext(SearchPageContext);
  const [valueOfFilter, setValueOfFilters] = useState(null);

  // Update active state whenever location.search changes
  useEffect(() => {
    searchPageContext.isFilterActive();
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

  // این تابع از داخل مودال فراخوانی میشود و لیتس یاز مقادیر فیلتر ارسال میشود تا در url ست شوند
  const handleSetSearch = (listValue = searchPageContext.filterList) => {
    console.log(listValue, "listValue handleSetSearch AllFilterButton");
    const params = new URLSearchParams(window.location.search);
    listValue.forEach((filter) => {
      if (filter.value) {
        // Check if the value is an array and join it with a comma
        const value = Array.isArray(filter.value)
          ? filter.value.join(",")
          : filter.value;
        console.log(filter.value, "filter.label");
        params.set(filter.label, value);
      } else {
        params.delete(filter.label);
      }
      // Update the URL with the new search parameters
      const newSearch = params.toString();
      window.history.replaceState(null, "", `?${newSearch}`);
    });

    searchPageContext.isFilterActive();
    handleClosePopover();
    searchPageContext.handleSearch();
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          backgroundColor: searchPageContext.active ? "#eeeeee" : "white",
          color: searchPageContext.active ? "black" : "black",
          borderColor: searchPageContext.active
            ? "black"
            : "rgba(0, 0, 0, 0.12)",
          minWidth: "fit-content",
        }}
        size="small"
        startIcon={startIcon}
        onClick={handleButtonClick}
        endIcon={
          searchPageContext.active && (
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
        {valueOfFilter ? `${valueOfFilter}  نفر` : label}
      </Button>

      {/* Popover */}
      {/* {Boolean(anchorEl) && ( */}
        <PopVerFilter
          callBackFunc={handleSetSearch}
          defaultCount={parseFloat(valueOfFilter)}
          anchorEl={anchorEl}
          handleClosePopover={handleClosePopover}
        />
      {/* )} */}
    </>
  );
};

export default AllFilterButton;
