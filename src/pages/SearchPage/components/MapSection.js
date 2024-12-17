import React from "react";
import { Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MyMap from "../../../components/MyMap/MyMap";
import PropTypes from "prop-types";

const MapSection = ({ points, onClose }) => (
  <Grid
    item
    xs={6}
    sx={{
      position: "sticky",
      top: "150px",
      height: "calc(90vh - 65px)",
      overflow: "hidden",
      borderRadius: 3,
      zIndex: 2,
    }}
  >
    <MyMap points={points} centerInitial={[2.2728759, 75.6305622]} />
    <IconButton
      sx={{
        position: "absolute",
        top: "20px",
        left: "20px",
        backgroundColor: "white",
        zIndex: 1000,
        "&:hover": { backgroundColor: "white" },
      }}
      onClick={onClose}
    >
      <CloseIcon />
    </IconButton>
  </Grid>
);

MapSection.propTypes = {
  points: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MapSection;
