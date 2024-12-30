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
import SelectCity from "../AllFilterButton/Component/SelectCity";

const PopVerFilter = ({
  callBackFunc,
  defaultCount,
  anchorEl,
  handleClosePopover,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust for mobile

  const counterRef = useRef();

  return isMobile ? (
    <SwipeableDrawer
      anchor="bottom"
      open={Boolean(anchorEl)}
      onClose={handleClosePopover}
      onOpen={() => {}} // Optional: Add logic if needed when opening
      PaperProps={{
        sx: {
          maxHeight: "600px", // Full-screen height
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
          mt: 2,
          width: "460px",
          backgroundColor: "#ffff",
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          pt: 1,
          px: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: 16,
            fontWeight: 500,
            color: "#333",
            marginBottom: 1,
          }}
        >
          انتخاب شهر
        </Typography>
        <IconButton onClick={handleClosePopover}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        ref={counterRef}
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            px: 2,
          }}
        >
          <Box
            sx={{
              maxHeight: "450px",
              overflowY: "auto",
            }}
          >
            <SelectCity
              showAllInitially={true}
              title={"انتخاب شهر"}
              list={[
                {
                  id: 1,
                  title: "استان تهران",
                  subList: [
                    { id: 1, title: "تهران" },
                    { id: 2, title: "فیروزکوه" },
                    { id: 3, title: "شهر" },
                    { id: 1, title: "تهران" },
                    { id: 2, title: "فیروزکوه" },
                    { id: 3, title: "شهر" },
                    { id: 1, title: "تهران" },
                    { id: 2, title: "فیروزکوه" },
                    { id: 3, title: "شهر" },
                    { id: 1, title: "تهران" },
                    { id: 2, title: "فیروزکوه" },
                    { id: 3, title: "شهر" },
                  ],
                },
                {
                  id: 2,
                  title: "خراسان رضوی",
                  subList: [
                    { id: 1, title: "مشهد" },
                    { id: 2, title: "نیشابور" },
                    { id: 3, title: "قوچان" },
                    { id: 1, title: "مشهد" },
                    { id: 2, title: "نیشابور" },
                    { id: 3, title: "قوچان" },
                    { id: 1, title: "مشهد" },
                    { id: 2, title: "نیشابور" },
                    { id: 3, title: "قوچان" },
                    { id: 1, title: "مشهد" },
                    { id: 2, title: "نیشابور" },
                    { id: 3, title: "قوچان" },
                  ],
                },
                {
                  id: 3,
                  title: "مازندران",
                  subList: [
                    { id: 1, title: "ساری" },
                    { id: 2, title: "سوادکوه" },
                    { id: 2, title: "سوادکوه" },
                    { id: 1, title: "ساری" },
                    { id: 2, title: "سوادکوه" },
                    { id: 1, title: "ساری" },

                    { id: 1, title: "ساری" },
                    { id: 2, title: "سوادکوه" },
                    { id: 1, title: "ساری" },
                    { id: 2, title: "سوادکوه" },
                    { id: 2, title: "سوادکوه" },
                    { id: 1, title: "ساری" },
                    { id: 2, title: "سوادکوه" },
                    { id: 1, title: "ساری" },

                    { id: 1, title: "ساری" },
                    { id: 2, title: "سوادکوه" },
                  ],
                },
              ]}
            />
          </Box>
          {/* <hr /> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py:2
            }}
          >
            <Button
              sx={{
                color: "black",
              }}
              variant="text"
              size="small"
              // disabled={count < 1}
              // onClick={() => handleFinall(null)}
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
              // onClick={() => handleFinall(count)}
            >
              ثبت تغییرات
            </Button>
          </Box>
        </Box>
      </Box>
    </Popover>
  );
};

export default PopVerFilter;
