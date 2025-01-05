import {
  Box,
  Checkbox,
  fabClasses,
  FormControlLabel,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const CheckBoxSelect = ({
  item,
  subList,
  subCity,
  handleSelect,
  listSelected = [],
}) => {
  // Determine if the item is currently selected
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const myList = listSelected || [];
    const isChecked = myList?.some((selected) => selected === item.searchtitle);
    setChecked(isChecked);
  }, [listSelected]);

  const handleChange = (event) => {
    // Call the parent handler with the item and its new selection state
    handleSelect(item.searchtitle, event.target.checked);
  };
  return (
    <Box
      sx={{
        mt: subCity ? 0 : 1,
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
              py: subCity == true ? 0 : 1,
              px: 1,
            }}
          />
        }
        label={item?.title}
      />
    </Box>
  );
};

export default CheckBoxSelect;

{
  /* {subList && item?.subList && (
        <Box sx={{ marginLeft: 4, mt: 0, pt: 0 }}>
          <Grid container sx={{ mt: 0, pt: 0 }}>
            {item.subList.map((subItem, index) => (
              <Grid
                item
                xs={12} // This means 1 item per row on mobile
                sm={6} // This means 2 items per row on desktop
                key={index}
                sx={{ mt: 0, pt: 0 }}
              >
                <CheckBoxSelect item={subItem} subCity={true} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )} */
}
