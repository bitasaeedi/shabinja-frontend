import React, { useState } from "react";
import { Box, FormGroup, Collapse, Button } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import CheckBoxCity from "../../../../../../components/CheckBoxSelect/CheckBoxCity/CheckBoxCity";
import { useEffect } from "react";

const SelectCity = ({
  list = [],
  showAllInitially = false,
  handleChangeListSelected,
  listSelected,
}) => {
  const [isExpanded, setIsExpanded] = useState(showAllInitially);

  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };
  

  const handleSelect = (item, isSelected) => {
    if (isSelected) {
      // Add the item if it's selected
      handleChangeListSelected((prev) => [...prev, item]);
    } else {
      // Remove the item if it's unselected
      handleChangeListSelected((prev) =>
        prev.filter((selected) => selected !== item)
      );
    }
  };

  return (
    <Box sx={{ mx: 2, px: { xs: 0, md: 2 } }}>
      <FormGroup>
        <Collapse in={isExpanded} timeout="auto" collapsedSize={200}>
          {list.map((item, index) => (
            <CheckBoxCity
              key={index}
              index={index}
              item={item}
              subList
              handleSelect={handleSelect}
              listSelected={listSelected}
            />
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
