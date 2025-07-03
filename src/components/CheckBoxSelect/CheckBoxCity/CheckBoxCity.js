import React, { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, Grid, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const CheckBoxCity = ({
  item,
  handleSelect,
  listSelected = [],
  isCity = false,
  index,
}) => {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [expanded, setExpanded] = useState(false); 

  useEffect(() => {
    if (isCity) {
      setChecked(listSelected.includes(item.searchtitle));
    } else {
      const cityTitles = item?.cities?.map((city) => city.searchtitle) || [];
      const selectedCities = cityTitles.filter((title) =>
        listSelected.includes(title)
      );

      if (selectedCities.length === cityTitles.length) {
        setChecked(true);
        setIndeterminate(false);
      } else if (selectedCities.length > 0) {
        setChecked(false);
        setIndeterminate(true);
      } else {
        setChecked(false);
        setIndeterminate(false);
      }
    }
  }, [listSelected, item, isCity]);

  
  const handleChange = (event) => {
    const isChecked = event.target.checked;

    if (isCity) {
      handleSelect(item.searchtitle, isChecked);
    } else {
      const cityTitles = item?.cities?.map((city) => city.searchtitle) || [];
      cityTitles.forEach((title) => handleSelect(title, isChecked));
    }
  };

  const handleToggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Box
      sx={{
        mt: isCity ? 0 : 1,
        borderTop: isCity || index === 0 ? "" : "2px dashed #eeeeee",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" , justifyContent:"space-between"}}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              indeterminate={indeterminate}
              onChange={handleChange}
              sx={{
                color: "#eeeeee",
                "&.Mui-checked": {
                  color: "black",
                },
              }}
            />
          }
          label={item?.title}
        />
        {!isCity && item?.cities?.length > 0 && (
          <IconButton onClick={handleToggleExpand} size="small">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        )}
      </Box>

      {!isCity && expanded && item?.cities && (
        <Box sx={{ marginLeft: 4 }}>
          <Grid container>
            {item?.cities.map((subItem, index2) => (
              <Grid item xs={12} sm={6} key={index2}>
                <CheckBoxCity
                  index={index2}
                  item={subItem}
                  isCity={true}
                  handleSelect={handleSelect}
                  listSelected={listSelected}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default CheckBoxCity;
