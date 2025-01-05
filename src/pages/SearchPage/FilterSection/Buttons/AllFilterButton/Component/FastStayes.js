import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  IconButton,
  SwipeableDrawer,
  Popover,
  Divider,
  Button,
  Switch,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { PopVerFilterContext } from "../PopVerFilter";

const FastStayes = ({ callBackFunc, defaultCount }) => {
  const theme = useTheme();

  const popVerFilterContext = useContext(PopVerFilterContext);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  useEffect(() => {
    setIsSwitchOn(popVerFilterContext?.justGuarantees);
  }, [popVerFilterContext?.justGuarantees]);
  
  const handleSwitchChange = () => {
    // setIsSwitchOn((prev) => !prev);
    popVerFilterContext?.setJustGuarantees((prev) => !prev);
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
          <BoltOutlinedIcon
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
            اقامتگاه‌های آنی و قطعی
            <br />
            <Typography
              variant="body2"
              sx={{
                fontSize: "13px",
                fontWeight: 200,
                color: "#333",
              }}
            >
              برای رزرو نهایی این اقامتگاه نیازی به تایید از سمت میزبان نخواهید
              داشت و رزرو شما قطعی خواهد بود.
            </Typography>
          </Typography>
        </Box>
        {/* Counter Section */}
        <Box
          sx={{
            ml: 3,
          }}
        >
          <Switch
            checked={isSwitchOn}
            onChange={handleSwitchChange}
            sx={{
              // transform: "scale(1)", // Scale the entire switch
              "& .MuiSwitch-thumb": {
                //   width: 22, // Increase thumb width
                //   height: 22, // Increase thumb height
                backgroundColor: isSwitchOn ? "black" : "default", // Thumb color
              },
              "& .MuiSwitch-track": {
                //   height: 20, // Increase track height
                //   borderRadius: 10, // Keep track rounded
                backgroundColor: isSwitchOn ? "black" : "gray", // Track color
              },
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "black", // Base color when checked
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "black", // Ensure track stays black when checked
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FastStayes;
