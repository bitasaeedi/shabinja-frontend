import React, { useEffect, useState } from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

export default function StatusSwitch({
  item,
  handleSelect,
  listSelected = [],
  titleActive = "مجاز",
  titleDisActive = "ممنوع",
}) {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const myList = listSelected || [];
    const isChecked = myList.some((selected) => selected === item.id);
    setStatus(isChecked);
    // console.log(listSelected, "listSelected", isChecked, item);
  }, [listSelected, item.id]);

  const handleChange = (_, newStatus) => {
    if (newStatus !== null) {
      const newValue = newStatus === "allowed";
      setStatus(newValue);
      handleSelect(item.id, newValue);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // padding: "10px",
        my: 2,
      }}
    >
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: { xs: 12, md: 14 },
        }}
      >
        {item?.title}
      </Typography>
      <ToggleButtonGroup
        value={status ? "allowed" : "forbidden"}
        exclusive
        onChange={handleChange}
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: "20px",
          padding: "5px",
        }}
      >
        <ToggleButton
          value="allowed"
          sx={{
            backgroundColor: "inherit",
            color: "gray",
            fontSize: { xs: 12, md: 12 },
            border: "none",
            borderRadius: "20px",
            padding: "5px 15px",
            width: { xs: 50, md: 50 },
            "&.Mui-selected": {
              backgroundColor: "primary.main",
              color: "white",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
                borderRadius: "20px",
              },
            },
            "&:hover": {
              backgroundColor: "inherit",
              color: "inherit",
            },
          }}
        >
          {titleActive}
          {/* مجاز */}
        </ToggleButton>
        <ToggleButton
          value="forbidden"
          sx={{
            backgroundColor: "inherit",
            color: "gray",
            fontSize: { xs: 12, md: 12 },
            border: "none",
            borderRadius: "20px",
            padding: "5px 15px",
            width: { xs: 50, md: 50 },
            "&.Mui-selected": {
              backgroundColor: "primary.main",
              color: "white",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
                borderRadius: "20px",
              },
            },
            "&:hover": {
              backgroundColor: "inherit",
              color: "inherit",
            },
          }}
        >
          {titleDisActive}
          {/* ممنوع */}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
