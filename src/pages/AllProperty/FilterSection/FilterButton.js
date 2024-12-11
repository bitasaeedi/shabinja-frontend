import React, { useState, useEffect } from "react";
import { Button, Popover, Box, Typography, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocation, useNavigate } from "react-router-dom";

const FilterButton = ({ filter, label, startIcon, popoverContent }) => {
  const [active, setActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State to manage Popover
  const location = useLocation();
  const navigate = useNavigate();

  // Function to get the current query parameters
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return Array.from(params.keys());
  };

  // Update the active state based on the URL
  useEffect(() => {
    setActive(getQueryParams().includes(filter));
  }, [location.search, filter]);

  // Function to handle filter button click
  const handleButtonClick = (event) => {
    if (!active) {
      setAnchorEl(event.currentTarget); // Open popover only if not active
    }
  };

  // Function to handle clearing the filter
  const handleClearFilter = (e) => {
    e.stopPropagation(); // Prevent the click from triggering the filter button click
    const params = new URLSearchParams(location.search);
    params.delete(filter);
    navigate({ search: params.toString() });
    setActive(false);
  };

  // Function to handle popover close
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleSetSearch = (filter, value) => {
    const params = new URLSearchParams(window.location.search);

    // Update the filter with the new value
    if (value) {
      params.set(filter, value); // Add or update the filter
    } else {
      params.delete(filter); // Remove the filter if value is empty
    }

    // Update the URL with the new search parameters
    const newSearch = params.toString();
    window.history.replaceState(null, "", `?${newSearch}`);
    setActive(true);
    handleClosePopover();
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          backgroundColor: active ? "primary.main" : "white",
          color: active ? "white" : "black",
          borderColor: active ? "transparent" : "rgba(0, 0, 0, 0.12)",
          minWidth: "fit-content",
        }}
        size="small"
        startIcon={startIcon}
        onClick={handleButtonClick}
        endIcon={
          active && (
            <ClearIcon
              fontSize="small"
              onClick={handleClearFilter}
              sx={{ cursor: "pointer" }}
            />
          )
        }
      >
        {label}
      </Button>

      {/* Popover */}
      {!active && (
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            sx: {
              mt: 1, // Adds margin top of 8px (1 unit of spacing)
            },
          }}
        >
          <Box sx={{ padding: 2, minWidth: 200 }}>
            {popoverContent ? (
              popoverContent(handleClosePopover) // Dynamically render popover content
            ) : (
              <>
                <Typography variant="subtitle1">فرم تست </Typography>
                <TextField
                  fullWidth
                  label="Enter value"
                  size="small"
                  sx={{ mt: 2 }}
                  // onChange={(e) => handleSetSearch(e.target.value, filter)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => handleSetSearch(filter, "1234")}
                >
                  ارسال فیلتر
                </Button>
              </>
            )}
          </Box>
        </Popover>
      )}
    </>
  );
};

export default FilterButton;
