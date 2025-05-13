import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const SelectCityOption = ({ item, callBack, isHost = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    callBack(item);
    if (isHost) {
      navigate(`/stay/${item.id}`);
    }
  };
  return (
    <Box
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        padding: "8px 0",
        "&:hover": {
          backgroundColor: "#e0e0e0", // Hover effect for better UX
        },
      }}
    >
      <Typography
        className="mx-2 my-1"
        sx={{ fontSize: "14px", color: "black" }}
      >
        {item?.title}
      </Typography>
    </Box>
  );
};

export default SelectCityOption;
