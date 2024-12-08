import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocation, useNavigate } from "react-router-dom"; // Updated for v6

const FilterButton = ({ filter, label, startIcon }) => {
  const [active, setActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate instead of useHistory

  // Function to get the current query parameters
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return Array.from(params.keys()); // Returns an array of active filters
  };

  // Update the active state based on the URL
  useEffect(() => {
    setActive(getQueryParams().includes(filter));
  }, [location.search, filter]);

  // Function to handle filter button click
  const handleButtonClick = () => {
    const params = new URLSearchParams(location.search);
    if (params.has(filter)) {
      // If filter is already in URL, remove it
      params.delete(filter);
    } else {
      // Otherwise, add it to the URL
      params.append(filter, filter);
    }

    // Update the URL
    navigate({ search: params.toString() }); // Use navigate instead of history.push
  };

  // Function to handle clearing the filter
  const handleClearFilter = (e) => {
    e.stopPropagation(); // Prevent the click from triggering the filter button click
    const params = new URLSearchParams(location.search);
    params.delete(filter); // Remove the filter from the URL
    navigate({ search: params.toString() }); // Use navigate instead of history.push
  };

  return (
    <Button
      variant="outlined"
      sx={{
        backgroundColor: active ? "#1976d2" : "white",
        color: active ? "white" : "black",
        borderColor: active ? "transparent" : "rgba(0, 0, 0, 0.12)",
      }}
      size="small"
      startIcon={startIcon}
      onClick={handleButtonClick}
      endIcon={active && (
        <ClearIcon
          fontSize="small"
          onClick={handleClearFilter} // Clicking this icon clears the filter
          sx={{ cursor: "pointer" }}
        />
      )}
    >
      {label}
    </Button>
  );
};

export default FilterButton;
