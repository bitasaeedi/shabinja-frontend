import React, { useState, useEffect, useContext } from "react";
import { Button, Popover, Box, Typography, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { SearchPageContext } from "../../../SearchPage";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import PopVerFilter from "./PopVerFilter";
import { useNavigate } from "react-router-dom";

const filter = "typeHost";
const label = "نوع اقامتگاه";
const startIcon = <HomeWorkOutlinedIcon />;
const AccommodationTypeButton = ({}) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State to manage Popover
  const searchPageContext = useContext(SearchPageContext);
  const [valueOfFilter, setValueOfFilters] = useState(null);

  const isFilterActive = () => {
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
  }, [filter, searchPageContext.listFiltersInUrl]);

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

  const handleSetSearch = (valueList) => {
    const params = new URLSearchParams(window.location.search);
    if (valueList) {
      const value = Array.isArray(valueList) ? valueList.join(",") : valueList;
      params.set(filter, value);
    } else {
      params.delete(filter);
    }
    // Update the URL with the new search parameters
    const newSearch = params.toString();
    let path = window.location.pathname;

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
        {valueOfFilter ? `${valueOfFilter} ` : label}
      </Button>

      {/* Popover */}
      {
        // !active  &&

        <PopVerFilter
          callBackFunc={handleSetSearch}
          defaultCount={parseFloat(valueOfFilter)}
          anchorEl={anchorEl}
          handleClosePopover={handleClosePopover}
          filter={filter}
        />
      }
    </>
  );
};

export default AccommodationTypeButton;
