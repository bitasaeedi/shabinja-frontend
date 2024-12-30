import React, { useState } from "react";
import { Box, FormGroup, Collapse, Button } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import PropTypes from "prop-types";
import CheckBoxSelect from "./CheckBoxSelect"; // Adjust import path as necessary

const SelectCity = ({ list = [], showAllInitially = false }) => {
  const [isExpanded, setIsExpanded] = useState(showAllInitially);

  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <Box sx={{ mx: 2 , px: { xs: 0, md: 2 } }}>
      <FormGroup>
        <Collapse in={isExpanded} timeout="auto" collapsedSize={120}>
          {list.map((item, index) => (
            <CheckBoxSelect key={index} item={item} subList />
          ))}
        </Collapse>
      </FormGroup>

      {!showAllInitially && (
        <Button
          onClick={handleToggle}
          sx={{
            mt: 1,
            fontSize: 12,
            textTransform: "none",
            color: "blue",
          }}
        >
          {isExpanded ? "مشاهده کمتر" : "مشاهده همه"}
          {isExpanded ? (
            <KeyboardArrowUp sx={{ ml: 0.5, fontSize: 14 }} />
          ) : (
            <KeyboardArrowDown sx={{ ml: 0.5, fontSize: 14 }} />
          )}
        </Button>
      )}
    </Box>
  );
};

export default SelectCity;
