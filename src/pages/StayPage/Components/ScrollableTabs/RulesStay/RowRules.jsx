import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";

const RowRules = ({ item, ruleItemsList }) => {
  const [isIncluded, setIsIncluded] = useState(false);
  useEffect(() => {
    checkInclude();
  }, [ruleItemsList, item]);
  const checkInclude = () => {
    const isIncluded = ruleItemsList.includes(item?.title?.toString());
    setIsIncluded(isIncluded);
    return isIncluded;
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {isIncluded ? (
        <CheckCircleIcon
          sx={{ color: "green", fontSize: { xs: 16, md: 20 } }}
        />
      ) : (
        <RemoveCircleOutlineIcon
          sx={{ color: "red", fontSize: { xs: 16, md: 20 } }}
        />
      )}
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: 14, md: 16 },
          mt: 1,
          ml: 1,
        }}
      >
        {`${item?.title} ${isIncluded ? "مجاز است" : "مجاز نیست"}`}
      </Typography>
    </Box>
  );
};

export default RowRules;
