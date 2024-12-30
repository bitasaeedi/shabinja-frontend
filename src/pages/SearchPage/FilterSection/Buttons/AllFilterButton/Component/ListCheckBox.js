import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Button,
  Collapse,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import CheckBoxSelect from "./CheckBoxSelect";

const ListCheckBox = ({
  list,
  title,
  limit = 5,
  iconTitle,
  listSelected = [],
  handleChangeListSelected = () => {},
}) => {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => setShowAll((prev) => !prev);

  const handleSelect = (item, isSelected) => {
    if (isSelected) {
      // Add the item if it's selected
      handleChangeListSelected((prev) => [...prev, item]);
    } else {
      // Remove the item if it's unselected
      handleChangeListSelected((prev) =>
        prev.filter((selected) => selected.id !== item.id)
      );
    }
  };

  return (
    <Box sx={{ padding: "5px 0", width: "100%", px: { xs: 0, md: 2 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        {iconTitle}
        <Typography
          variant="h6"
          sx={{ fontSize: "16px", fontWeight: 500, color: "#333" }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ mx: 2 }}>
        <FormGroup>
          {list.slice(0, limit).map((item, index) => (
            <CheckBoxSelect
              item={item}
              key={index}
              handleSelect={handleSelect}
              listSelected={listSelected || []}
            />
          ))}
        </FormGroup>

        <Collapse in={showAll} timeout="auto" unmountOnExit>
          <FormGroup>
            {list.slice(limit).map((item, index) => (
              <CheckBoxSelect
                item={item}
                key={index}
                handleSelect={handleChangeListSelected}
                listSelected={listSelected || []}
              />
            ))}
          </FormGroup>
        </Collapse>

        {list.length > limit && (
          <Button
            onClick={handleToggle}
            sx={{
              mt: 0,
              fontSize: 12,
              textTransform: "none",
              color: "blue",
            }}
          >
            {showAll ? "مشاهده کمتر" : "مشاهده همه"}
            {showAll ? (
              <KeyboardArrowUp
                sx={{
                  ml: 0.5,
                  transition: "transform 0.3s",
                  fontSize: 14,
                }}
              />
            ) : (
              <KeyboardArrowDown
                sx={{
                  ml: 0.5,
                  transition: "transform 0.3s",
                  fontSize: 14,
                }}
              />
            )}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ListCheckBox;
