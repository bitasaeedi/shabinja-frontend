import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  IconButton,
  SwipeableDrawer,
  Popover,
  Divider,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
const CountFilter = ({ callBackFunc, defaultCount }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust for mobile

  const [count, setCount] = useState(defaultCount || 0);
  const counterRef = useRef();

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    // onValueChange(newCount); // Send value to parent
  };
  const decrement = () => {
    const newCount = Math.max(0, count - 1);
    setCount(newCount);
    // onValueChange(newCount); // Send value to parent
  }; // Prevent going below 1

  const handleFinall = (value) => {
    callBackFunc(value);
  };

  return (
    <Box
      sx={{
        // backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        padding: "5px 0px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 0, md: 2 },
        }}
      >
        {/* Label */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <GroupOutlinedIcon
            sx={{
              fontSize: { xs: 17, md: 20 },
              mr: 2,
              // color: "gray",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              color: "#333",
            }}
          >
            تعداد نفرات
            <br />
            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                fontWeight: 200,
                color: "#333",
              }}
            >
              {count === 0 ? "مهم نیست" : `${count} نفر`}
            </Typography>
          </Typography>
        </Box>
        {/* Counter Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {/* Increment Button */}
          <Button
            variant="outlined"
            onClick={increment}
            sx={{
              fontSize: 16,
              minWidth: "20px",
              height: "20px",
              borderRadius: "10%",
              padding: 0,
              borderColor: "#000",
            }}
          >
            +
          </Button>
          {/* Count Display */}
          <Typography
            sx={{
              fontSize: "16px",
              minWidth: "30px",
              textAlign: "center",
            }}
          >
            {count}
          </Typography>

          {/* Decrement Button */}
          <Button
            variant="outlined"
            onClick={decrement}
            disabled={count <= 0 ? true : false}
            sx={{
              fontSize: 16,
              minWidth: "20px",
              height: "20px",
              borderRadius: "10%",
              padding: 0,
              borderColor: "#000",
            }}
          >
            -
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CountFilter;
