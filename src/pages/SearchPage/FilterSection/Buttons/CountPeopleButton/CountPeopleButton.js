import React, { useState, useEffect, useContext } from "react";
import { Button, Popover, Box, Typography, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { SearchPageContext } from "../../../SearchPage";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PeopleCounter from "../../../../../components/popups/PeopleCounter/PeopleCounter";
import PopOverCount from "./PopOverCount";
import { useNavigate } from "react-router-dom";

const filter = "count";
const label = "تعداد نفرات";
const startIcon = <PeopleOutlineOutlinedIcon />;
const CountPeopleButton = ({}) => {
  const navigate = useNavigate();
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

  const handleSetSearch = (value) => {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set(filter, value);  
    } else {
      params.delete(filter);
    }

    // Update the URL with the new search parameters
    const newSearch = params.toString();
    let path = window.location.pathname;

    if (!path.includes("/all")) {
      navigate(`/search/all${newSearch ? `?${newSearch}` : ""}`, { replace: true });
    } else {
      window.history.replaceState(null, "", `?${newSearch}`);
    }
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
        {valueOfFilter ? `${valueOfFilter}  نفر` : label}
      </Button>

      {/* Popover */}
      {
        // !active  &&

        <PopOverCount
          callBackFunc={handleSetSearch}
          defaultCount={parseFloat(valueOfFilter)}
          anchorEl={anchorEl}
          handleClosePopover={handleClosePopover}
        />
      }
    </>
  );
};

export default CountPeopleButton;
