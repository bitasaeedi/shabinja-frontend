import { Box, Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";

const SelectCheckBox = ({ item, handleSelect, listSelected = [] }) => {
  // Determine if the item is currently selected
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const myList = listSelected || [];
    const isChecked = myList?.some((selected) => selected === item.id);
    setChecked(isChecked);
  }, [listSelected]);

  const handleChange = () => {
    handleSelect(item.id, !checked);
  };
  return (
    <Box
      sx={{
        mt: 1,
        pt: 0,
        // borderTop: subCity ? "" : "1px dashed #eeeeee",
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange} // Handle selection changes
            sx={{
              color: "#eeeeee",
              "&.Mui-checked": {
                color: "black",
              },
              py: 1,
              px: 1,
            }}
          />
        }
        label={item?.title}
      />
    </Box>
  );
};

export default SelectCheckBox;
