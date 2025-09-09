import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PopOverForm from "./components/PopOverForm";
import { StayPageContext } from "../../StayPage";
import ToRial from "../../../../components/ToRial/ToRial";
import moment from "moment-jalaali";
import { PriceHostTourListApi } from "../../../../api/toureApis";

const MobileForm = ({staycode}) => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage Popover
  const [minPrice , setMinPrice]=useState();
  
  // Function to handle popover close
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  // Function to handle filter button click
  const handleButtonClick = (event) => {
    // if (!active) {
    setAnchorEl(event.currentTarget); // Open popover only if not active
    // }
  };

  // get min price
  const handleGetMinPrice = async () => {
    const now = moment();
    const numMonth = now.jMonth() + 1; // jMonth() returns 0-11, so +1 to get 1-12

    // Calculate months with overflow
    const months = [
      numMonth,
      numMonth + 1 > 12 ? numMonth + 1 - 12 : numMonth + 1,
      numMonth + 2 > 12 ? numMonth + 2 - 12 : numMonth + 2,
    ];

    const result = await PriceHostTourListApi(staycode, months[0]);
    
    setMinPrice(result?.data?.minPrice)
  };
  useEffect(()=>{
    handleGetMinPrice()
  } , [])

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          width: "100%",
          
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            px: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Typography
              variant="span"
              sx={{
                fontSize: "14px",
              }}
            >
              شروع از:
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: "16px",
                padding: "0 5px",
              }}
            >
              {ToRial(minPrice)} تومان
            </Typography>
            <Typography
              variant="span"
              sx={{
                fontSize: "12px",
              }}
            >
              / هرشب
            </Typography>
          </Box>
          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              sx={{
                color: "white",
                fontSize: 14,
                "&:hover": {
                  // opacity: 0.8,
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
              onClick={handleButtonClick}
            >
              درخواست رزرو
            </Button>
          </Box>
        </Box>
      </Box>
      {anchorEl && (
        <PopOverForm
          callBackFunc={() => {}}
          anchorEl={anchorEl}
          handleClosePopover={handleClosePopover}
        />
      )}
    </>
  );
};

export default MobileForm;
