import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { PopVerFilterContext } from "../PopVerFilter";
const filterOptions = [
  {
    value: "1-2",
    label: (
      <Box component={"span"}>
        پایین تر از
        <Box component={"span"} sx={{ ml: 1 }}>
          2
        </Box>
      </Box>
    ),
  },
  {
    value: "2-3",
    label: (
      <Box component={"span"}>
        2
        <Box component={"span"} sx={{ mx: 1 }}>
          تا
        </Box>
        3
      </Box>
    ),
  },
  {
    value: "3-4",
    label: (
      <Box component={"span"}>
        3
        <Box component={"span"} sx={{ mx: 1 }}>
          تا
        </Box>
        4
      </Box>
    ),
  },
  {
    value: "4-5",
    label: (
      <Box component={"span"}>
        4
        <Box component={"span"} sx={{ mx: 1 }}>
          تا
        </Box>
        5
      </Box>
    ),
  },
];

export default function RankFilter() {
  const popVerFilterContext = useContext(PopVerFilterContext);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    setSelectedFilters(popVerFilterContext.selectedListScore);
  }, [popVerFilterContext.selectedListScore]);

  const handleFilterSelect = (filterValue) => {
    if (selectedFilters.includes(filterValue)) {
      popVerFilterContext.setSelectedListScore(
        selectedFilters.filter((f) => f !== filterValue)
      );
    } else {
      popVerFilterContext.setSelectedListScore([
        ...selectedFilters,
        filterValue,
      ]);
    }
  };

  return (
    <Box sx={{ width: "100%", px: { xs: 0, md: 2 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <StarOutlineIcon
          sx={{
            fontSize: { xs: 17, md: 20 },
            mr: 2,
            // color: "gray",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontSize: 16,
            fontWeight: 500,
            color: "#333",
          }}
        >
          امتیاز
        </Typography>
      </Box>
      <Box>
        {filterOptions.map((option, index) => (
          <Button
            size="small"
            variant="outlined"
            color="#eeeeee"
            key={index}
            onClick={() => handleFilterSelect(option.value)}
            sx={{
              mx: 1,
              px: 2,
              mb: { xs: 1, md: 0 },
              backgroundColor:
                selectedFilters.includes(option.value) && "#eeeeee",
              borderRadius: "20px",
              borderColor: selectedFilters.includes(option.value)
                ? "black"
                : "#bdbdbd",
              "&:hover": {
                backgroundColor: "#eeeeee",
              },
              fontSize: 14,
            }}
            endIcon={
              selectedFilters.includes(option.value) && (
                <CloseIcon sx={{ fontSize: 12, color: "gray" }} />
              )
            }
          >
            {option.label}
            {/* {selectedFilters.includes(option.value) && (
              <Box component={"span"} sx={{ ml: "5px", color: "gray" }}>
                |<CloseIcon sx={{ fontSize: 14 }} />
              </Box>
            )} */}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
