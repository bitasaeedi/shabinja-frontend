import React, { useRef } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import ListCheckBox from "../AllFilterButton/Component/ListCheckBox";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
const PopVerFilter = ({
  callBackFunc,
  defaultCount,
  anchorEl,
  handleClosePopover,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust for mobile

  const counterRef = useRef();

  const handleFinall = async () => {};
  
  return isMobile ? (
    <SwipeableDrawer
      anchor="bottom"
      open={Boolean(anchorEl)}
      onClose={handleClosePopover}
      onOpen={() => {}} // Optional: Add logic if needed when opening
      PaperProps={{
        sx: {
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px 12px 0 0", // Rounded top corners
          backgroundColor: "#ffff",
        },
      }}
    ></SwipeableDrawer>
  ) : (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        sx: {
          mt: 1,
          width: "300px",
          // minHeight: "500px",
          backgroundColor: "#ffff",
          py: 2,
        },
      }}
    >
      <Box sx={{}}>
        <ListCheckBox
          list={[{ id: 1, title: "ویلایی" }]}
          title="نوع اقامتگاه"
          iconTitle={
            <HomeOutlinedIcon
              sx={{
                fontSize: { xs: 17, md: 20 },
                mr: 2,
                // color: "gray",
              }}
            />
          }
        />
      </Box>
      <hr />
      <Box
        sx={{
          mt: 0,
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          px: 1,
        }}
      >
        <Button
          sx={{
            color: "black",
          }}
          variant="text"
          size="small"
          // disabled={count < 1}
          // onClick={() => handleFinall()}
        >
          حذف فیلتر
        </Button>
        <Button
          sx={{
            bgcolor: "black",
          }}
          variant="contained"
          size="small"
          // disabled={count < 1}
          onClick={() => handleFinall()}
        >
          ثبت تغییرات
        </Button>
      </Box>
    </Popover>
  );
};

export default PopVerFilter;
