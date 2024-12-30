import React, { useState } from "react";
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


const list = [
  { id: 1, title: "حمام" },
  { id: 2, title: "بالکن" },
  { id: 3, title: "سرویس بهداشتی فرنگی" },
  { id: 4, title: "سرویس بهداشتی ایرانی" },
  { id: 5, title: "فضای سبز" },
  { id: 6, title: "پارکینگ" },
  { id: 7, title: "آسانسور" },
  { id: 8, title: "آب" },
  { id: 9, title: "برق" },
  { id: 10, title: "گاز" },
];

const EmkanatAvaliyeh = () => {
  const [showAll, setShowAll] = useState(false);
  const limit = 5;

  const handleToggle = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <Box
      sx={{
        padding: "5px 0px",
        width: "100%",
        px: { xs: 0, md: 2 },
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            color: "#333",
          }}
        >
          امکانات اولیه
        </Typography>
      </Box>
      <Box
        sx={{
          mx: 2,
        }}
      >
        <FormGroup>
          {list.slice(0, limit).map((item, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  sx={{
                    color: "gray",
                    "&.Mui-checked": {
                      color: "black",
                    },
                  }}
                />
              }
              label={item?.title}
            />
          ))}
        </FormGroup>
        <Collapse in={showAll} timeout="auto" unmountOnExit>
          <FormGroup>
            {list.slice(limit).map((item, index) => (
              <FormControlLabel
                key={index + limit}
                control={
                  <Checkbox
                    sx={{
                      color: "gray",
                      "&.Mui-checked": {
                        color: "black",
                      },
                    }}
                  />
                }
                label={item?.title}
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

export default EmkanatAvaliyeh;
