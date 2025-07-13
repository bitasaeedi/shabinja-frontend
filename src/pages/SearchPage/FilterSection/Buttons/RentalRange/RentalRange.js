import React, { useState, useEffect, useContext } from "react";
import { Button, Popover, Box, Typography, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { SearchPageContext } from "../../../SearchPage";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import PopVerFilter from "./PopVerFilter";
import { useNavigate } from "react-router-dom";

const filter = "rentalRange";
const label = "قیمت هر شب";
const startIcon = <PriceChangeOutlinedIcon />;
const RentalRange = ({}) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State to manage Popover
  const searchPageContext = useContext(SearchPageContext);
  const [valueOfFilter, setValueOfFilters] = useState(null);
  const [listRangePrice, setListRangePrice] = useState([]);

  const isFilterActive = () => {
    searchPageContext.isFilterActive();
    const params = new URLSearchParams(window.location.search);
    const valueOfFilter = params.get("min");
    const valueOfFilter2 = params.get("max");
    if (valueOfFilter && valueOfFilter2) {
      setActive(true);
      const lable = `از ${Number(
        valueOfFilter
      )?.toLocaleString()}  تا  ${Number(
        valueOfFilter2
      )?.toLocaleString()} تومان`;
      setValueOfFilters(lable);
      setListRangePrice([valueOfFilter, valueOfFilter2]);
    } else {
      setActive(false);
      setValueOfFilters(null);
      setListRangePrice([]);
    }
  };

  // Update active state whenever location.search changes
  useEffect(() => {
    isFilterActive();
  }, [searchPageContext.listFiltersInUrl]);

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

  const handleSetSearch = (list) => {
    const listDate = list || [];
    const params = new URLSearchParams(window.location.search);
    let path = window.location.pathname;

    if (listDate.length === 2) {
      params.set("min", listDate[0]);
      params.set("max", listDate[1]);

      // // Update the URL with the new search parameters
      const newSearch = params.toString();

      if (!path.includes("/all")) {
        navigate(`/search/all${newSearch ? `?${newSearch}` : ""}`, {
          replace: true,
        });
      } else {
        window.history.replaceState(null, "", `?${newSearch}`);
      }

      isFilterActive();
      handleClosePopover();
      searchPageContext.handleSearch();
    } else if (listDate.length === 1) {
    } else {
      params.delete("min");
      params.delete("max");
      const newSearch = params.toString();

      if (!path.includes("/all")) {
        navigate(`/search/all${newSearch ? `?${newSearch}` : ""}`, {
          replace: true,
        });
      } else {
        window.history.replaceState(null, "", `?${newSearch}`);
      }
      isFilterActive();
      handleClosePopover();
      searchPageContext.handleSearch();
    }
  };

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
      }}
    >
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
                handleSetSearch(null);
              }}
              sx={{ cursor: "pointer" }}
            />
          )
        }
      >
        {valueOfFilter ? `${valueOfFilter} ` : label}
      </Button>

      {/* Popover */}
      {/* {!active && ( */}
      <PopVerFilter
        callBackFunc={handleSetSearch}
        defaultCount={parseFloat(valueOfFilter)}
        anchorEl={anchorEl}
        handleClosePopover={handleClosePopover}
        listRangePrice={listRangePrice || []}
      />
      {/* )} */}
    </Box>
  );
};

export default RentalRange;
