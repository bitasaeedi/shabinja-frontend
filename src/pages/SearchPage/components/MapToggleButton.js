import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const MapToggleButton = ({ isMapOpen, onClick }) =>
  !isMapOpen && (
    <Button
      variant="contained"
      sx={{
        position: "fixed",
        bottom: { xs: 80, md: 30 },
        left: { xs: "30px", md: "50%" },
        transform: { xs: "translateX(0%)", md: "translateX(-50%)" },
        zIndex: 100,
      }}
      size="small"
      onClick={onClick}
    >
      نمایش روی نقشه
    </Button>
  );

MapToggleButton.propTypes = {
  isMapOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MapToggleButton;
