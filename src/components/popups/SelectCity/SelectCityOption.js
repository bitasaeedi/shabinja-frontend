import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const SelectCityOption = ({ item, callBack }) => {
  return (
    <Box
      onClick={() => {
        callBack(item);
      }}
      className="cursor-pointer"
      sx={{
        padding: "8px 0",
        "&:hover": {
          backgroundColor: "#e0e0e0", // Hover effect for better UX
        },
      }}
    >
      <Typography className="m-2" sx={{ fontSize: "14px", color: "black" }}>
        {item?.title}
      </Typography>
    </Box>
  );
};

export default SelectCityOption;
